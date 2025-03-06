import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";
import { useLogin } from "../login/LoginContext.tsx";

export const Home: React.FC = () => {
  const { user } = useLogin();

  return (
    <>
      {console.log(user)}
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
    </>
  );
};
