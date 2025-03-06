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
import { RegistrationProvider } from "./components/registration/RegistrationContext.tsx";
import { LoginProvider } from "./components/login/LoginContext.tsx";
import { UserInfo } from "./components/userInfo/userInfo.tsx";
import { GetStart } from "./components/getStarted/GetStart";
import { ChangePWD } from "./components/changePassword/changePassword.tsx";
import { Home } from "./components/home/home.tsx";
import { SetReminder } from "./components/home/SetReminder/SetReminder.tsx";
import { Root } from "./routes/Root";
import { UserProfile } from "./components/profile/UserProfile";
import { SettingsPage } from "./components/profile/settings/SettingsPage.tsx";
import { PatientList } from "./components/patientList/PatientList.tsx";
import { PatientQrcode } from "./components/profile/patientQrcode/PatientQrcode.tsx";
function App() {
  useEffect(() => {
    // Open the database and create tables if they don't exist
    openDB().catch((error) => {
      console.error("Failed to open database:", error);
    });
  }, []);

  return (
    <LanguageProvider>
      <LoginProvider>
        <BrowserRouter basename={config.APP_BASENAME}>
          <Routes>
            <Route path="/">
              <Route path="userinfo" element={<UserInfo />}></Route>
              <Route index element={<Root />}></Route>
              <Route path="start" element={<GetStart />}></Route>
              <Route path="changePWD" element={<ChangePWD />}></Route>

              <Route path="login">
                <Route index element={<Login />}></Route>
                <Route path="choose" element={<ChoseLoginOrSignup />}></Route>
                <Route path="scan-qrcode" element={<ScanQR />}></Route>
              </Route>

              <Route path="register">
                <Route
                  index
                  element={
                    <RegistrationProvider>
                      <Registration />
                    </RegistrationProvider>
                  }
                ></Route>
                <Route
                  path="choose-role"
                  element={
                    <RegistrationProvider>
                      <ChooseRole />
                    </RegistrationProvider>
                  }
                ></Route>
              </Route>

              <Route path="home" element={<Home />}></Route>
              <Route path="reminder" element={<SetReminder />}></Route>

              <Route path="profile">
                <Route index element={<UserProfile />}></Route>
                <Route
                  path="patient-qr-code"
                  element={<PatientQrcode />}
                ></Route>
                <Route path="settings" element={<SettingsPage />}></Route>
                <Route path="change-password" element={<ChangePWD />}></Route>
                <Route path="patient-list" element={<PatientList />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </LanguageProvider>
  );
}

export default App;
