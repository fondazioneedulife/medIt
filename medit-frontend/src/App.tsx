import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { ChooseRole } from "./components/chooseRole/chooseRole.tsx";
import { Login } from "./components/login/Login.tsx";
import { ChoseLoginOrSignup } from "./components/login/ChoseLoginOrSignup.tsx";
import { openDB } from "./database/indexdb";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GetStart } from "./components/getStarted/GetStart";
import { ChangePWD } from "./components/changePassword/changePassword.tsx";
import { MedicineComponent } from "./components/home/MedicineComponent/MedicineComponent.tsx";
import { Home } from "./components/home/home.tsx";
import { PatientList } from "./components/patientList/patientList.tsx";

function App() {
  useEffect(() => {
    // Open the database and create tables if they don't exist
    openDB().catch((error) => {
      console.error("Failed to open database:", error);
    });
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter basename={config.APP_BASENAME}>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/">
            <Route path="start" element={<GetStart />}></Route>
            <Route path="changePWD" element={<ChangePWD />}></Route>

            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>

              {/* all login route */}
              <Route path="choose" element={<ChoseLoginOrSignup />}></Route>
              <Route path="home" element={<Home />}></Route>

              <Route path="navbar" element={<Navbar />}></Route>
              <Route
                path="medicinecomponent"
                element={<MedicineComponent />}
              ></Route>
              
            </Route>
            <Route path="register">
              <Route index element={<Registration />}></Route>
              <Route path="choose-role" element={<ChooseRole />}></Route>
              <Route path="patientList" element={<PatientList />}></Route>
            </Route>
          </Route>
        </Routes>
       
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
