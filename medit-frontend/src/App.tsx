import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { Login } from "./components/login/Login.tsx";

function App() {
  return (
    <>
      <BrowserRouter basename={config.APP_BASENAME}>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/">
            {/* TODO: set default route to redirect user first */}
            {/* <Route index element={<Root />} /> */}

            {/* TODO: set login guard */}
            {/* <Route path="login" element={<LoginMainContext />}> */}
            <Route path="login">
              <Route index element={<Login />}></Route>
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
