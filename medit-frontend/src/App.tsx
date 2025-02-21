import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { Login } from "./components/login/Login.tsx";
import { ChoseLoginOrSignup } from "./components/login/ChoseLoginOrSignup.tsx";
import { Start } from "./components/login/Start.tsx";

function App() {
  return (
    <>
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
              {/* all login route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
