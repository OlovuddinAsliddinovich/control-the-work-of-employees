import { ReactNode } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="max-w-screen-xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
