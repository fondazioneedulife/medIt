import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { ChooseRole } from "./components/chooseRole/chooseRole.tsx";
import { Login } from "./components/login/Login.tsx";
import { ChoseLoginOrSignup } from "./components/login/ChoseLoginOrSignup.tsx";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GetStart } from "./components/getStarted/GetStart";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={config.APP_BASENAME}>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/">
            <Route path="start" element={<GetStart />}></Route>
            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>
              <Route path="choose" element={<ChoseLoginOrSignup />}></Route>
              
              {/* all login route */}
            </Route>
            <Route path="register">
              <Route index element={<Registration />}></Route>
              <Route path="choose-role" element={<ChooseRole />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
