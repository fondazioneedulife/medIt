import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";
import { Registration } from "./components/registration/RegistrationForm.tsx";
import { ChooseRole } from "./components/chooseRole/chooseRole.tsx";

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
              <Route path="register" element={<Registration />}></Route>
              <Route path="chooserole" element={<ChooseRole />}></Route>
              {/* all login route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
