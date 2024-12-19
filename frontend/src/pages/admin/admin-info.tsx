import { useEffect, useState } from "react";
import { api, BASE_URL_API } from "../../services/api";
import { AdminLayout } from "../../components";
import { UserType } from "../../interfaces";

const AdminInfo = () => {
  const [employees, setEmployees] = useState<UserType[]>([]);

  const getEmployees = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Barcha Xodimlar hisobotlari</h1>
        <div className="overflow-x-scroll w-full">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-1 py-2 border border-gray-300">№</th>
                <th className="px-4 py-2 border border-gray-300">Ism</th>
                <th className="px-4 py-2 border border-gray-300">Familiya</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Lavozim</th>
                <th className="px-4 py-2 border border-gray-300">Rasm</th>
                <th className="px-4 py-2 border border-gray-300">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, idx) => (
                <tr key={employee._id}>
                  <td className="px-2 py-2 border border-gray-300 font-bold">{idx + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.firstname}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.lastname}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{employee.level}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {employee.image && <img src={`${BASE_URL_API}/${employee.image}`} alt="img" className="w-10 h-10 object-cover rounded-full" />}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded w-[200px]">Hisobotni yuklash</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInfo;
