import { BrowserRouter, Route, Routes } from "react-router-dom";
import { config } from "./config";

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
              {/* all login route */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
