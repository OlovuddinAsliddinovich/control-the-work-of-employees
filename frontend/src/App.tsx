import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Employees, HomePage, Profile, SendInformation, SignIn, SignUp } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-auto w-full bg-slate-200 min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/info" element={<SendInformation />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </div>
      <ToastContainer autoClose={1000} aria-label={"Toast"} />
      <Footer />
    </div>
  );
};

export default App;
