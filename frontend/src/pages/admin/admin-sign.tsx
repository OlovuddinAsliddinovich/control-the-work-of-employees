import { FC, useState } from "react";
import { AdminLayout } from "../../components";
import { api } from "../../services/api";
import { useAdminStore } from "../../hooks/use-admin.store";
import { useNavigate } from "react-router-dom";
import { AdminType } from "../../interfaces";
import { toast } from "react-toastify";

const AdminSign: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminType>({
    username: "",
    password: "",
  });
  const { setAdmin, setIsAdmin } = useAdminStore();
  const navigate = useNavigate();

  const adminLoginHandler = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", adminData);
      setAdmin(data.admin);
      setIsAdmin(true);
      toast.success("Xush kelibsiz Admin!");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      // @ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-screen fixed top-0 left-0">
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Admin panelga kirish</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        value={adminData?.username}
                        onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Username
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        value={adminData?.password}
                        onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Parol
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button onClick={adminLoginHandler} className="bg-cyan-500 w-full text-white rounded-md px-2 py-1" disabled={loading}>
                  {loading ? "Loading..." : "Kirish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSign;
