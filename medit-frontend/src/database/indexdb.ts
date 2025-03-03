import bcrypt from "bcryptjs";
import { RegisterRequest } from "../../api-types/RegisterRequest";
import { User } from "../generated/models/User";
import { Auth } from "../../api-types/Auth";

const DB_NAME = "Medit";
const DB_VERSION = 1;
const USER_STORE = "users";

// Open the database
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
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
        medicationsStore.createIndex("program", "program", { unique: false });
        medicationsStore.createIndex("quantity", "quantity", { unique: false });
        medicationsStore.createIndex("note", "note", { unique: false });
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
        remindersStore.createIndex("id_group", "id_group", { unique: true });
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

// export const registerUser = async (
//   user: RegisterRequest
// ): Promise<IDBValidKey> => {
//   const db = await openDB();
//   return new Promise(async (resolve, reject) => {
//     try {
//       const transaction = db.transaction([USER_STORE, "auth"], "readwrite");
//       const userStore = transaction.objectStore(USER_STORE);
//       const authStore = transaction.objectStore("auth");

//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(user.password, 10);

//       const { password, ...userToSave } = user;
//       console.log("User to save:", userToSave);
//       const userId = await addRecord(USER_STORE, userToSave);

//       const authRequest = authStore.add({
//         user_id: userId,
//         password: hashedPassword,
//         failed_attempts: 0,
//         last_login: new Date(),
//         synced_at: new Date(),
//       } as Auth);

//       authRequest.onsuccess = () => resolve(userId);
//       authRequest.onerror = () => reject(authRequest.error);

//       // Ensure the transaction is not closed prematurely
//       transaction.oncomplete = () =>
//         console.log("Transaction completed successfully.");
//       transaction.onerror = () => reject(transaction.error);
//       transaction.onabort = () => reject(transaction.error);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const registerUser = async (
  user: RegisterRequest
): Promise<IDBValidKey> => {
  return await addRecord("users", user);
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
