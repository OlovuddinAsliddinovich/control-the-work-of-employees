import { ReactNode, useEffect } from "react";
import AdminNavbar from "./admin-navbar";
import { api } from "../../services/api";
import { useAdminStore } from "../../hooks/use-admin.store";
import { useNavigate } from "react-router-dom";
import AdminFooter from "./admin-footer";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isAdmin, setIsAdmin, setAdmin } = useAdminStore();
  const navigate = useNavigate();
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const { data } = await api.get("/admin/get-admin");
        setAdmin(data);
        setIsAdmin(true);
      } catch (error) {
        console.log(error);
        if (!isAdmin) return navigate("/admin-sign");
      }
    };
    getAdmin();
  }, []);
  return (
    <div className="w-full">
      <AdminNavbar />
      <main className="max-w-screen-xl px-2 sm:px-6 min-h-[70vh] mx-auto">{children}</main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
