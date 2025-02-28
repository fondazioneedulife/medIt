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
import { UserInfo } from "./components/userInfo/userInfo.tsx";

import { GetStart } from "./components/getStarted/GetStart";
import { ChangePWD } from "./components/changePassword/changePassword.tsx";
import { Home } from "./components/home/home.tsx";
import { Root } from "./routes/Root";



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
            <Route path="userinfo" element={<UserInfo />}></Route>
            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            <Route index element={<Root />}></Route>
            <Route path="start" element={<GetStart />}></Route>
            <Route path="changePWD" element={<ChangePWD />}></Route>


            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>
              
              {/* all login route */}
              <Route path="choose" element={<ChoseLoginOrSignup />}></Route>
              <Route path="scan-qrcode" element={<ScanQR />}></Route>
              
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
