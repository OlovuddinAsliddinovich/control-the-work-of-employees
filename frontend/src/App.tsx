import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Employees, HomePage, SendInformation } from "./pages";

const App = () => {
  return (
    <div className="mx-auto w-full bg-slate-200 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/info" element={<SendInformation />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
