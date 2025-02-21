const DB_NAME = "MedicineReminderDB";
const DB_VERSION = 1;

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
  const db = (event.target as IDBOpenDBRequest).result;

  // Users Table
  const usersStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });
  usersStore.createIndex("email", "email", { unique: true });
  usersStore.createIndex("role", "role", { unique: false });
  usersStore.createIndex("created_at", "created_at", { unique: false });
  usersStore.createIndex("update_at", "update_at", { unique: false });
  usersStore.createIndex("timezone", "timezone", { unique: false });
  usersStore.createIndex("language", "language", { unique: false });
  usersStore.createIndex("synced_at", "synced_at", { unique: false });

  // Auth Table
  const authStore = db.createObjectStore("auth", { keyPath: "user_id" });
  authStore.createIndex("password", "password", { unique: false });
  authStore.createIndex("failed_attempts", "failed_attempts", {
    unique: false,
  });
  authStore.createIndex("last_login", "last_login", { unique: false });
  authStore.createIndex("synced_at", "synced_at", { unique: false });

  // Medications Table
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
  medicationsStore.createIndex("created_at", "created_at", { unique: false });
  medicationsStore.createIndex("update_at", "update_at", { unique: false });
  medicationsStore.createIndex("synced_at", "synced_at", { unique: false });

  // Reminders Table
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

  // Taken Medications Table
  const takenMedicationsStore = db.createObjectStore("taken_medications", {
    keyPath: "id",
    autoIncrement: true,
  });
  takenMedicationsStore.createIndex("reminder_id", "reminder_id", {
    unique: false,
  });
  takenMedicationsStore.createIndex("date_time", "date_time", {
    unique: false,
  });
  takenMedicationsStore.createIndex("synced_at", "synced_at", {
    unique: false,
  });
};

request.onsuccess = (event: Event) => {
  console.log("IndexedDB initialized successfully");
};

request.onerror = (event: Event) => {
  console.error(
    "IndexedDB initialization failed",
    (event.target as IDBOpenDBRequest).error
  );
};
