import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Calendar />
      <FilterButton />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
    </>
  );
};
