import { Route, Routes } from "react-router";
import LayOut from "./layout";
import AppRoute from "./routes/route";

function App() {
  return (
    <>
      <LayOut>
        <Routes>
          {AppRoute.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </LayOut>
    </>
  );
}

export default App;
