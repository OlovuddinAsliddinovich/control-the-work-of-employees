import { FC, useEffect, useState } from "react";
import { AdminNavbar } from "../../components";
import { api, BASE_URL_API } from "../../services/api";
import { UserType } from "../../interfaces";
import { useNavigate } from "react-router-dom";

const AdminHomePage: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get("/auth/users");
        setUsers(data);
      } catch (error) {}
    };

    getUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 bg-white p-6 overflow-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Admin Bosh Sahifa</h1>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded shadow cursor-pointer">
              <h2 className="text-xl font-bold text-blue-600 mb-2">Xodimlar</h2>
              <p className="text-gray-600">Yangi xodimlarni qo'shing, o'chiring va boshqaring.</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow cursor-pointer">
              <h2 className="text-xl font-bold text-green-600 mb-2">Ma'lumotlar</h2>
              <p className="text-gray-600">Kerakli ma'lumotlarni kuzatib boring.</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow cursor-pointer">
              <h2 className="text-xl font-bold text-yellow-600 mb-2">Xodimlarni ro'yxatdan o'tkazish</h2>
              <p className="text-gray-600">Platformadagi ma'lumotlarni ko'rish.</p>
            </div>
          </section>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Xodimlar ro'yxati</h2>
            {users.slice(0, 5).map((user) => (
              <div
                key={user?._id}
                onClick={() => navigate(`/admin-employees/${user?._id}`)}
                className="bg-white cursor-default p-4 rounded shadow mb-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img src={`${BASE_URL_API}/${user.image}`} alt="userImage" className="w-12 h-12 object-cover rounded-full mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {user.firstname} {user.lastname}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
