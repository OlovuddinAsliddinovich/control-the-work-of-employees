import { ReactNode, useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useAuthStore } from "../../hooks/use-auth-store";
import { useLoading } from "../../hooks/use-loading";
import { api } from "../../services/api";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { setLoggedIn, setUser } = useAuthStore();
  const { setIsLoading } = useLoading();

  const getUser = async () => {
    setIsLoading();
    try {
      const { data } = await api.get("/auth/get-user");
      setLoggedIn(true);
      setUser(data);
    } catch (error) {
      // @ts-ignore
      console.log(error.response.data.message);
    } finally {
      setIsLoading();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUser();
    }
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      <main className="max-w-screen-xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
