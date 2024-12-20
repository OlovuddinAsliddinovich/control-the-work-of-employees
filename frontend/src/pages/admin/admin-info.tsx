import { useEffect, useState } from "react";
import { api, BASE_URL_API } from "../../services/api";
import { AdminLayout } from "../../components";
import { UserType } from "../../interfaces";
import { toast } from "react-toastify"; // Xatoliklarni ko'rsatish uchun

const AdminInfo = () => {
  const [employees, setEmployees] = useState<UserType[]>([]);

  const getEmployees = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setEmployees(data);
    } catch (error) {
      console.error("Xodimlar ro'yxatini olishda xatolik:", error);
      toast.error("Xodimlar ro'yxatini olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Sanalarni dinamik hisoblash
  const getDateRange = () => {
    const endDate = new Date(); // Hozirgi sana
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1); // Bir oy oldingi sana

    // YYYY-MM-DD formatida sanalarni olish
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy raqami
      const day = String(date.getDate()).padStart(2, "0"); // Kun raqami
      return `${year}-${month}-${day}`;
    };

    return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
  };

  // Hisobotni yuklab olish
  const handleDownloadReport = async (userId: string) => {
    try {
      const { startDate, endDate } = getDateRange(); // Dinamik sanalar

      const response = await api.get(`/report/generate`, {
        params: { startDate, endDate, userId }, // Foydalanuvchi ID va sanalar
        responseType: "blob", // Excel faylini olish
      });
      // Excel faylini saqlash
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = `hisobot_${userId}.xlsx`; // Foydalanuvchi ID bilan nomlash
      link.click();
    } catch (error) {
      toast.error("Siz ishlamagansiz!");
    }
  };

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
                    <button
                      onClick={() => employee._id && handleDownloadReport(employee._id)} // Foydalanuvchi ID yuboriladi
                      className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded w-[200px]"
                    >
                      Hisobotni yuklash
                    </button>
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
