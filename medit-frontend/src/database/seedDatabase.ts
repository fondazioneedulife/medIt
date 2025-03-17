import tachipirinaImage from "../assets/medicins/tachipirina.png";
import momentImage from "../assets/medicins/moment.png";
import brufenImage from "../assets/medicins/brufen.png";
import aspirinaImage from "../assets/medicins/aspirina.png";
import imodiumImage from "../assets/medicins/imodium.png";
import demoUserImageBase64 from "../assets/profile/demo_user_image.txt?raw";
import demoUserQrcodeImageBase64 from "../assets/profile/demo_user_qrcode_image.txt?raw";

export const seedDatabase = async (transaction: IDBTransaction) => {
  const usersStore = transaction.objectStore("users");
  const medicationsStore = transaction.objectStore("medications");
  const remindersStore = transaction.objectStore("reminders");
  const authStore = transaction.objectStore("auth");

  const caregiverUser = {
    firstName: "Caregiver",
    lastName: "User",
    email: "caregiver@example.com",
    role: "caregiver",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
    created_at: new Date(),
    updated_at: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = usersStore.add(caregiverUser);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const caregiverAuth = {
    user_id: 1,
    password: "$2b$10$pmgsO5wOyudhbKcUQAO82ey5Ne4n4mCrVN0MiQOppUm41o7r7cUJS",
    failed_attempts: 0,
    last_login: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = authStore.add(caregiverAuth);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const patientUser = {
    firstName: "Medit",
    lastName: "User",
    email: "medit@example.com",
    role: "patient",
    profileImage: demoUserImageBase64,
    qrcode: demoUserQrcodeImageBase64,
    caregiverId: 1,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: "en",
    created_at: new Date(),
    updated_at: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = usersStore.add(patientUser);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  const patientAuth = {
    user_id: 2,
    password: "$2b$10$pmgsO5wOyudhbKcUQAO82ey5Ne4n4mCrVN0MiQOppUm41o7r7cUJS",
    failed_attempts: 0,
    last_login: new Date(),
    synced_at: new Date(),
  };

  await new Promise((resolve, reject) => {
    const request = authStore.add(patientAuth);
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
      userId: 2,
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
      userId: 2,
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
      userId: 2,
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
      userId: 2,
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
      userId: 2,
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
      reminder_date_time: new Date(Date.now() + msInDay(0)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(1)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(2)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(3)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(0)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(1)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(2)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 3,
      reminder_date_time: new Date(Date.now() + msInDay(0)).toISOString(),
      id_group: "group3",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 4,
      reminder_date_time: new Date(Date.now() + msInDay(0)).toISOString(),
      id_group: "group4",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 5,
      reminder_date_time: new Date(Date.now() + msInDay(1)).toISOString(),
      id_group: "group5",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(4)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(5)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(6)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(7)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(3)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(4)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(5)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 3,
      reminder_date_time: new Date(Date.now() + msInDay(1)).toISOString(),
      id_group: "group3",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 4,
      reminder_date_time: new Date(Date.now() + msInDay(1)).toISOString(),
      id_group: "group4",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 5,
      reminder_date_time: new Date(Date.now() + msInDay(2)).toISOString(),
      id_group: "group5",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(10)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(11)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(12)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(13)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(10)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(11)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(12)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 3,
      reminder_date_time: new Date(Date.now() + msInDay(14)).toISOString(),
      id_group: "group3",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 4,
      reminder_date_time: new Date(Date.now() + msInDay(15)).toISOString(),
      id_group: "group4",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 5,
      reminder_date_time: new Date(Date.now() + msInDay(16)).toISOString(),
      id_group: "group5",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(17)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(18)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(19)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 1,
      reminder_date_time: new Date(Date.now() + msInDay(20)).toISOString(),
      id_group: "group1",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(13)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(14)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 2,
      reminder_date_time: new Date(Date.now() + msInWeek(15)).toISOString(),
      id_group: "group2",
      frequency: "weekly",
      synced_at: new Date(),
    },
    {
      medication_id: 3,
      reminder_date_time: new Date(Date.now() + msInDay(21)).toISOString(),
      id_group: "group3",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 4,
      reminder_date_time: new Date(Date.now() + msInDay(22)).toISOString(),
      id_group: "group4",
      frequency: "daily",
      synced_at: new Date(),
    },
    {
      medication_id: 5,
      reminder_date_time: new Date(Date.now() + msInDay(23)).toISOString(),
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

const msInDay = (days: number) => 86400000 * days;
const msInWeek = (weeks: number) => msInDay(7) * weeks;