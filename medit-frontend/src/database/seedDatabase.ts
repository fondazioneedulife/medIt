import tachipirinaImage from "../assets/medicins/tachipirina.png";
import momentImage from "../assets/medicins/moment.png";
import brufenImage from "../assets/medicins/brufen.png";
import aspirinaImage from "../assets/medicins/aspirina.png";
import imodiumImage from "../assets/medicins/imodium.png";

export const seedDatabase = async (transaction: IDBTransaction) => {
  const usersStore = transaction.objectStore("users");
  const medicationsStore = transaction.objectStore("medications");

  const demoUser = {
    id: 1,
    firstName: "Medit",
    lastName: "User",
    email: "medit@example.com",
    role: "Patient",
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

  const medications = [
    {
      name: "Tachipirina",
      type: "Tablet",
      dose: "500mg",
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
      dose: "200mg",
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
      dose: "400mg",
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
      dose: "500mg",
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
      dose: "2mg",
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

  transaction.oncomplete = () => {
    console.log("Database seeded successfully");
  };

  transaction.onerror = (event) => {
    console.error("Error seeding database:", event);
  };
};
