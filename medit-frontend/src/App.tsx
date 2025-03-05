import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { ChooseRole } from "./components/chooseRole/chooseRole.tsx";
import { Login } from "./components/login/Login.tsx";
import { ChoseLoginOrSignup } from "./components/login/ChoseLoginOrSignup.tsx";

import { ScanQR } from "./components/QRCode/ScanQR.tsx";

import { openDB } from "./database/indexdb";
import { LanguageProvider } from "./contexts/LanguageContext";

import { Start } from "./components/login/Start.tsx";

import { GetStart } from "./components/getStarted/GetStart";

import { ChangePWD } from "./components/changePassword/changePassword.tsx";
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
            <Route path="start" element={<GetStart />}></Route>
            <Route path="changePWD" element={<ChangePWD />}></Route>

            
            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>
              
              <Route path="scanqr" element={<ScanQR />}></Route>


              <Route path="navbar" element={<Navbar />}></Route>
              <Route path="choose-role" element={<ChooseRole />}></Route>
              <Route path="medicinecomponent"></Route>

              {/* all login route */}
              <Route path="choose" element={<ChoseLoginOrSignup />}></Route>
              
            </Route>
            <Route path="register">
              <Route index element={<Registration />}></Route>
              <Route path="choose-role" element={<ChooseRole />}></Route>
            </Route>

            <Route path="home" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
