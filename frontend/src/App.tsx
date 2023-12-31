import { Route, Routes } from "react-router";
import LayOut from "./layout";
import AppRoute from "./routes/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./auth/auth";
// import AddClient from "./admin/pages/client/AddClient";



function App() {
 
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Auth />
      <LayOut>
        <Routes>
          {AppRoute.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
          {/* <Route path={"/employee/client/:_id"} element={<AddClient/>} /> */}
        </Routes>
      </LayOut>
    </>
  );
}

export default App;
