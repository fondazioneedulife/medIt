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
import { Start } from "./components/login/Start.tsx";
import { MedicineComponent } from "./components/home/MedicineComponent/medicineComponent.tsx";
import { Home } from "./components/home/home.tsx";

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
            <Route path="start" element={<Start />}></Route>
            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>
              <Route path="chose" element={<ChoseLoginOrSignup />}></Route>
              <Route path="register" element={<Registration />}></Route>
              <Route path="chooserole" element={<ChooseRole />}></Route>
              <Route path="home" element={<Home />}></Route>

              <Route path="navbar" element={<Navbar />}></Route>
              <Route path="choose-role" element={<ChooseRole />}></Route>
              <Route
                path="medicinecomponent"
                element={<MedicineComponent />}
              ></Route>
              {/* all login route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
