import { FC, useEffect, useState } from "react";
import { AdminAddModal, AdminLayout } from "../../components";
import { UserType } from "../../interfaces";
import { api, BASE_URL_API } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminEmployees: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
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
    <AdminLayout>
      <div className="mt-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Xodimlar ro'yxati</h2>
          <button onClick={() => setShowAddModal(true)} className="button py-1 bg-green-600">
            Qo'shish+
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/admin-employees/${user?._id}`)}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
            >
              <div className="relative">
                <img
                  src={`${BASE_URL_API}/${user?.image}`}
                  alt="Employee"
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md"
                />
                <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></span>
              </div>

              <h3 className="text-lg font-medium text-gray-800">
                {user.firstname} {user.lastname}
              </h3>

              <p className="text-sm text-gray-600">{user.email}</p>

              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Ko'rish</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddModal && <AdminAddModal setShowEditModal={setShowAddModal} setUsers={setUsers} />}
    </AdminLayout>
  );
};

export default AdminEmployees;
