import { RegisterRequest } from "../../api-types/RegisterRequest";
import { User } from "../generated/models/User";
import { seedDatabase } from "./seedDatabase";
import jsQR from "jsqr";

const DB_NAME = "Medit";
const DB_VERSION = 1;
const USER_STORE = "users";

// Open the database
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = async (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create the Users table
      if (!db.objectStoreNames.contains("users")) {
        const usersStore = db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
        usersStore.createIndex("email", "email", { unique: true });
        usersStore.createIndex("first_name", "first_name", { unique: false });
        usersStore.createIndex("last_name", "last_name", { unique: false });
        usersStore.createIndex("role", "role", { unique: false });
        usersStore.createIndex("profileImage", "profileImage", {
          unique: false,
        });
        usersStore.createIndex("caregiverId", "caregiverId", { unique: false }); // aggiunta caregiverId
        usersStore.createIndex("created_at", "created_at", { unique: false });
        usersStore.createIndex("updated_at", "updated_at", { unique: false });
        usersStore.createIndex("timezone", "timezone", { unique: false });
        usersStore.createIndex("language", "language", { unique: false });
        usersStore.createIndex("synced_at", "synced_at", { unique: false });
      }

      // Create the Auth table
      if (!db.objectStoreNames.contains("auth")) {
        const authStore = db.createObjectStore("auth", { keyPath: "user_id" });
        authStore.createIndex("password", "password", { unique: false });
        authStore.createIndex("failed_attempts", "failed_attempts", {
          unique: false,
        });
        authStore.createIndex("last_login", "last_login", { unique: false });
        authStore.createIndex("synced_at", "synced_at", { unique: false });
      }

      // Create the Medications table
      if (!db.objectStoreNames.contains("medications")) {
        const medicationsStore = db.createObjectStore("medications", {
          keyPath: "id",
          autoIncrement: true,
        });
        medicationsStore.createIndex("userId", "userId", { unique: false });
        medicationsStore.createIndex("name", "name", { unique: false });
        medicationsStore.createIndex("type", "type", { unique: false });
        medicationsStore.createIndex("dose", "dose", { unique: false });
        medicationsStore.createIndex("unit", "unit", { unique: false });
        medicationsStore.createIndex("quantity", "quantity", { unique: false });
        medicationsStore.createIndex("note", "note", { unique: false });
        medicationsStore.createIndex("image", "image", { unique: false });
        medicationsStore.createIndex("created_at", "created_at", {
          unique: false,
        });
        medicationsStore.createIndex("updated_at", "updated_at", {
          unique: false,
        });
        medicationsStore.createIndex("synced_at", "synced_at", {
          unique: false,
        });
      }

      // Create the Reminders table
      if (!db.objectStoreNames.contains("reminders")) {
        const remindersStore = db.createObjectStore("reminders", {
          keyPath: "id",
          autoIncrement: true,
        });
        remindersStore.createIndex("medication_id", "medication_id", {
          unique: false,
        });
        remindersStore.createIndex("reminder_date_time", "reminder_date_time", {
          unique: false,
        });
        remindersStore.createIndex("id_group", "id_group", { unique: false });
        remindersStore.createIndex("frequency", "frequency", { unique: false });
        remindersStore.createIndex("synced_at", "synced_at", { unique: false });
      }

      // Create the Taken Medications table
      if (!db.objectStoreNames.contains("taken_medications")) {
        const takenMedicationsStore = db.createObjectStore(
          "taken_medications",
          { keyPath: "id", autoIncrement: true }
        );
        takenMedicationsStore.createIndex("reminder_id", "reminder_id", {
          unique: false,
        });
        takenMedicationsStore.createIndex("date_time", "date_time", {
          unique: false,
        });
        takenMedicationsStore.createIndex("synced_at", "synced_at", {
          unique: false,
        });
      }

      if (request.transaction) {
        await seedDatabase(request.transaction);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Add a record to a table
export const addRecord = async (
  storeName: string,
  record: any
): Promise<IDBValidKey> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get all records from a table
export const getAllRecords = async (storeName: string): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get a record by ID
export const getRecordById = async (
  storeName: string,
  id: number
): Promise<any> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Update a record
export const updateRecord = async (
  storeName: string,
  record: any
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(record);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Delete a record
export const deleteRecord = async (
  storeName: string,
  id: number
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const registerUser = async (
  registerRequest: RegisterRequest
): Promise<IDBValidKey> => {
  const { password, ...userToSave } = registerRequest;
  console.log("registerUser called with user:", userToSave);
  return await addRecord("users", userToSave);
};

export const updateUserInDatabase = async (
  user: User,
  profileImageFile: File | null
): Promise<User> => {
  const db = await openDB();

  if (profileImageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(profileImageFile);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        user.profileImage = reader.result as string;

        const transaction = db.transaction(USER_STORE, "readwrite");
        const store = transaction.objectStore(USER_STORE);
        const updateUserRequest = store.put(user);

        updateUserRequest.onsuccess = () => resolve(user);
        updateUserRequest.onerror = () => reject(updateUserRequest.error);
      };
      reader.onerror = () => reject(reader.error);
    });
  } else {
    const transaction = db.transaction(USER_STORE, "readwrite");
    const store = transaction.objectStore(USER_STORE);
    const updateUserRequest = store.put(user);

    return new Promise((resolve, reject) => {
      updateUserRequest.onsuccess = () => resolve(user);
      updateUserRequest.onerror = () => reject(updateUserRequest.error);
    });
  }
};

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await openDB();
  const tx = db.transaction(USER_STORE, "readonly");
  const store = tx.objectStore(USER_STORE);
  const index = store.index("email");
  const request = index.get(email);
  return new Promise<User | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const getAuthByUserId = async (userId: number) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("auth", "readonly");
    const store = transaction.objectStore("auth");
    const request = store.get(userId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addMedication = async (medication: any): Promise<IDBValidKey> => {
  return await addRecord("medications", medication);
};

export const getAllMedications = async (): Promise<any[]> => {
  return await getAllRecords("medications");
};

export const addReminder = async (reminder: any): Promise<IDBValidKey> => {
  return await addRecord("reminders", reminder);
};

export const getRemindersByMedicationId = async (
  medicationId: number
): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("reminders", "readonly");
    const store = transaction.objectStore("reminders");
    const index = store.index("medication_id");
    const request = index.getAll(medicationId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getRemindersForDate = async (date: Date): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("reminders", "readonly");
    const store = transaction.objectStore("reminders");
    const index = store.index("reminder_date_time");

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const range = IDBKeyRange.bound(
      start.toISOString(),
      end.toISOString(),
      false,
      false
    );
    const request = index.getAll(range);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getMedicationById = async (id: number) => {
  const db = await openDB();
  const transaction = db.transaction(["medications", "reminders"], "readonly");
  const medicationsStore = transaction.objectStore("medications");
  const remindersStore = transaction.objectStore("reminders");

  const medicationRequest = medicationsStore.get(id);

  const medication = await new Promise<any>((resolve, reject) => {
    medicationRequest.onsuccess = () => resolve(medicationRequest.result);
    medicationRequest.onerror = () => reject(medicationRequest.error);
  });

  const remindersRequest = remindersStore.index("medication_id").getAll(id);
  const reminders = await new Promise<any[]>((resolve, reject) => {
    remindersRequest.onsuccess = () => {
      resolve(remindersRequest.result);
    };
    remindersRequest.onerror = () => reject(remindersRequest.error);
  });

  return { ...medication, reminders };
};

export const getMedicationsByUserId = async (
  userId: number
): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("medications", "readonly");
    const store = transaction.objectStore("medications");
    const index = store.index("userId");
    const request = index.getAll(userId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getUserById = async (
  userId: number
): Promise<User | undefined> => {
  const db = await openDB();
  return new Promise<User | undefined>((resolve, reject) => {
    const transaction = db.transaction(USER_STORE, "readonly");
    const store = transaction.objectStore(USER_STORE);
    const request = store.get(userId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// get all patients of a caregiver
export const getAllPatientsByCaregiverId = async (caregiverId: number) => {
  const db = await openDB();
  return new Promise<User[]>((resolve, reject) => {
    const transaction = db.transaction(USER_STORE, "readonly");
    const store = transaction.objectStore(USER_STORE);
    const index = store.index("caregiverId");
    const request = index.getAll(caregiverId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const isMedicationTaken = async (
  reminderId: number
): Promise<boolean> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("taken_medications", "readonly");
    const store = transaction.objectStore("taken_medications");
    const index = store.index("reminder_id");
    const request = index.get(reminderId);

    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addTakenMedication = async (
  takenMedication: any
): Promise<IDBValidKey> => {
  return await addRecord("taken_medications", takenMedication);
};

export const deleteTakenMedication = async (
  reminderId: number
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("taken_medications", "readwrite");
    const store = transaction.objectStore("taken_medications");
    const index = store.index("reminder_id");
    const request = index.openCursor(IDBKeyRange.only(reminderId));

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        resolve();
      }
    };

    request.onerror = () => reject(request.error);
  });
};

export const getTakenMedicationsByPatientId = async (
  userId: number
): Promise<any[]> => {
  const medications = await getMedicationsByUserId(userId);
  const reminders = await Promise.all(
    medications.map((med) => getRemindersByMedicationId(med.id))
  );

  const reminderIds = reminders.flat().map((reminder) => reminder.id);

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("taken_medications", "readonly");
    const store = transaction.objectStore("taken_medications");
    const index = store.index("reminder_id");
    const request = index.getAll();

    request.onsuccess = () => {
      const takenMedications = request.result.filter((takenMed) =>
        reminderIds.includes(takenMed.reminder_id)
      );
      const enrichedTakenMedications = takenMedications.map((takenMed) => {
        const reminder = reminders
          .flat()
          .find((reminder) => reminder.id === takenMed.reminder_id);
        const medication = medications.find(
          (med) => med.id === reminder.medication_id
        );
        const takenMedicationDate = new Date(takenMed.date_time);

        return {
          name: medication?.name,
          image: medication?.image,
          month: takenMedicationDate.getMonth() + 1, // getMonth() returns 0-11, so we add 1
          day: takenMedicationDate.getDate(),
          year: takenMedicationDate.getFullYear(),
          hour: `${
            takenMedicationDate.getHours() % 12 || 12
          }:${takenMedicationDate.getMinutes().toString().padStart(2, "0")} ${
            takenMedicationDate.getHours() >= 12 ? "PM" : "AM"
          }`,
        };
      });
      resolve(enrichedTakenMedications);
    };
    request.onerror = () => reject(request.error);
  });
};

export const updateMedicationQuantity = async (
  medicationId: number,
  quantity: number
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("medications", "readwrite");
    const store = transaction.objectStore("medications");
    const request = store.get(medicationId);

    request.onsuccess = () => {
      const medication = request.result;
      medication.quantity = quantity;
      const updateRequest = store.put(medication);

      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
};

export const getUserByUUID = async (
  uuid: string
): Promise<User | undefined> => {
  const db = await openDB();
  const tx = db.transaction(USER_STORE, "readonly");
  const store = tx.objectStore(USER_STORE);
  const request = store.getAll();

  return new Promise<User | undefined>((resolve, reject) => {
    request.onsuccess = async () => {
      const users = request.result;
      for (const user of users) {
        if (user.role === "patient") {
          if (user.qrcode) {
            const decodedQRCode = await decodeQRCode(user.qrcode);
            if (decodedQRCode === uuid) {
              resolve(user);
              return;
            }
          }
        }
      }
      resolve(undefined);
    };
    request.onerror = () => reject(request.error);
  });
};

const decodeQRCode = async (base64Image: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      resolve(qrCode?.data || null);
    };
    img.onerror = () => reject("Errore nel caricamento dell'immagine.");
  });
};
