import tachipirinaImage from "../assets/medicins/tachipirina.png";
import momentImage from "../assets/medicins/moment.png";
import brufenImage from "../assets/medicins/brufen.png";
import aspirinaImage from "../assets/medicins/aspirina.png";
import imodiumImage from "../assets/medicins/imodium.png";
import demoUserImageBase64 from "../assets/profile/demo_user_image.txt?raw";

export const seedDatabase = async (transaction: IDBTransaction) => {
  const usersStore = transaction.objectStore("users");
  const medicationsStore = transaction.objectStore("medications");
  const remindersStore = transaction.objectStore("reminders");
  const authStore = transaction.objectStore("auth");

  const demoUser = {
    firstName: "Medit",
    lastName: "User",
    email: "medit@example.com",
    role: "Patient",
    profileImage: demoUserImageBase64,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
    created_at: new Date(),
    updated_at: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = usersStore.add(demoUser);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const demoAuth = {
    user_id: 1,
    password: "$2b$10$pmgsO5wOyudhbKcUQAO82ey5Ne4n4mCrVN0MiQOppUm41o7r7cUJS",
    failed_attempts: 0,
    last_login: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = authStore.add(demoAuth);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const medications = [
    {
      name: "Tachipirina",
      type: "Tablet",
      dose: "500",
      unit: "mg",
      quantity: 20,
      note: "",
      image: tachipirinaImage,
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      synced_at: new Date(),
    },
    {
      name: "Moment",
      type: "Tablet",
      dose: "200",
      unit: "mg",
      quantity: 15,
      note: "",
      image: momentImage,
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      synced_at: new Date(),
    },
    {
      name: "Brufen",
      type: "Tablet",
      dose: "400",
      unit: "mg",
      quantity: 10,
      note: "",
      image: brufenImage,
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      synced_at: new Date(),
    },
    {
      name: "Aspirina",
      type: "Tablet",
      dose: "500",
      unit: "mg",
      quantity: 20,
      note: "",
      image: aspirinaImage,
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      synced_at: new Date(),
    },
    {
      name: "Imodium",
      type: "Tablet",
      dose: "2",
      unit: "mg",
      quantity: 10,
      note: "",
      image: imodiumImage,
      userId: 1,
      created_at: new Date(),
      updated_at: new Date(),
      synced_at: new Date(),
    },
  ];

  for (const medication of medications) {
    await new Promise((resolve, reject) => {
      const request = medicationsStore.add(medication);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  const reminders = [
    {
      medication_id: 1,
      reminder_date_time: new Date().toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date().toISOString(),
      id_group: "group2",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 3,
      reminder_date_time: new Date().toISOString(),
      id_group: "group3",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 4,
      reminder_date_time: new Date().toISOString(),
      id_group: "group4",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 5,
      reminder_date_time: new Date().toISOString(),
      id_group: "group5",
      frequency: "daily",
      synced_at: new Date(),
    },
  ];

  for (const reminder of reminders) {
    await new Promise((resolve, reject) => {
      const request = remindersStore.add(reminder);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  transaction.oncomplete = () => {
    console.log("Database seeded successfully");
  };

  transaction.onerror = (event) => {
    console.error("Error seeding database:", event);
  };
};
