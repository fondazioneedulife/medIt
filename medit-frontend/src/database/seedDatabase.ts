export const seedDatabase = async (transaction: IDBTransaction) => {
  const usersStore = transaction.objectStore("users");

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

  transaction.oncomplete = () => {
    console.log("Database seeded successfully");
  };

  transaction.onerror = (event) => {
    console.error("Error seeding database:", event);
  };
};
