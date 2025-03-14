import {
  Auth,
  Medication,
  Reminder,
  TakenMedication,
  User,
} from "../generated/models";
import { SyncDataRequest } from "../generated/models/SyncDataRequest";
import { openDB } from "./indexdb";

export const uploadData = async (token: string) => {
  const db = await openDB();
  const transaction = db.transaction(
    ["users", "auth", "medications", "reminders", "taken_medications"],
    "readonly"
  );

  const users: User[] = await new Promise((resolve, reject) => {
    const request = transaction.objectStore("users").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const auths: Auth[] = await new Promise((resolve, reject) => {
    const request = transaction.objectStore("auth").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const medications: Medication[] = await new Promise((resolve, reject) => {
    const request = transaction.objectStore("medications").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const reminders: Reminder[] = await new Promise((resolve, reject) => {
    const request = transaction.objectStore("reminders").getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const takenMedications: TakenMedication[] = await new Promise(
    (resolve, reject) => {
      const request = transaction.objectStore("taken_medications").getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }
  );

  const payload: SyncDataRequest = {
    users,
    auths,
    medications,
    reminders,
    takenMedications,
  };

  try {
    const response = await fetch("https://api.medit.com/sync/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Errore nell'upload");

    console.log("Dati sincronizzati con successo!");
  } catch (error) {
    console.error("Errore durante la sincronizzazione:", error);
  }
};

export const downloadData = async (token: string) => {
  try {
    const response = await fetch("https://api.medit.com/sync/download", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Errore nel download");

    const data: SyncDataRequest = await response.json();
    const db = await openDB();
    const transaction = db.transaction(
      ["users", "auth", "medications", "reminders", "taken_medications"],
      "readwrite"
    );

    const saveData = async (storeName: string, records: any[]) => {
      const store = transaction.objectStore(storeName);
      for (const record of records) {
        await store.put(record);
      }
    };

    if (data.users) await saveData("users", data.users);
    if (data.auths) await saveData("auth", data.auths);
    if (data.medications) await saveData("medications", data.medications);
    if (data.reminders) await saveData("reminders", data.reminders);
    if (data.takenMedications)
      await saveData("taken_medications", data.takenMedications);

    console.log("Dati scaricati e salvati in IndexedDB!");
  } catch (error) {
    console.error("Errore nel download:", error);
  }
};
