import { Route, Routes } from "react-router-dom";
import { AdminEmployees, AdminHome, AdminInfo, AdminSign, Employees, HomePage, Profile, SendInformation, SignIn } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminEmployeePage from "./pages/admin/admin-employee";

const App = () => {
  return (
    <div className="mx-auto w-full bg-slate-200 min-h-screen">
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/info" element={<SendInformation />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-sign" element={<AdminSign />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin-employees" element={<AdminEmployees />} />
          <Route path="/admin-info" element={<AdminInfo />} />
          <Route path="/admin-employees/:id" element={<AdminEmployeePage />} />
        </Routes>
      </div>
      <ToastContainer autoClose={1000} aria-label={"Toast"} />
    </div>
  );
};

export default App;
