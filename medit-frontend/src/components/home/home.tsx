import { Navbar } from "../Navbar/Navbar";
import { MedicineComponent } from "../MedicineComponent/medicineComponent.tsx";
import { Calendar } from "../calendar/calendar";
import "../../index.css";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Calendar />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
    </>
  );
};
