import { FormEvent, useState } from "react";
import { UserType } from "../../interfaces";
import { api, BASE_URL_API } from "../../services/api";

interface AdminEditModalProps {
  employee: UserType | null;
  setShowEditModal: (status: boolean) => void;
  setEmployee: (employee: UserType | null) => void;
}

const AdminEditModal = ({ setShowEditModal, employee, setEmployee }: AdminEditModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<Partial<UserType | null>>(employee);
  const [imagePreview, setImagePreview] = useState<string | null>(employee?.image ? `${BASE_URL_API}/${employee.image}` : null);

  const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstname", employeeData?.firstname || "");
    formData.append("lastname", employeeData?.lastname || "");
    formData.append("email", employeeData?.email || "");
    formData.append("level", employeeData?.level || "");
    formData.append("image", employeeData?.image || "");
    const { data } = await api.patch(`/auth/update/${employee?._id}`, formData);
    setEmployee(data);
    setShowEditModal(false);
    window.location.reload();
    try {
    } catch (error) {
      console.error("Xodim ma'lumotlarini o'zgartirishda xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEmployeeData({ ...employeeData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      onClick={() => setShowEditModal(false)}
      className="fixed overflow-y-scroll w-full min-h-full pt-6 sm:pt-2 flex items-center justify-center inset-0 bg-black bg-opacity-80"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded w-full sm:w-[500px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Xodim ma'lumotlarini o'zgartirish</h1>
        <form onSubmit={updateHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ism</label>
            <input
              value={employeeData?.firstname}
              onChange={(e) => setEmployeeData({ ...employeeData, firstname: e.target.value })}
              type="text"
              className="w-full border-[2px] h-[40px] rounded px-3 outline-cyan-500 border-gray hover:border-cyan-600 transition"
              placeholder="Ism"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Familiya</label>
            <input
              value={employeeData?.lastname}
              onChange={(e) => setEmployeeData({ ...employeeData, lastname: e.target.value })}
              type="text"
              className="w-full border-[2px] h-[40px] rounded px-3 outline-cyan-500 border-gray hover:border-cyan-600 transition"
              placeholder="Familiya"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="text"
              value={employeeData?.email}
              onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
              className="w-full border-[2px] h-[40px] rounded px-3 outline-cyan-500 border-gray hover:border-cyan-600 transition"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <div className="w-[100px] h-[100px] border rounded overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">No Image</div>
              )}
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border-[2px] py-1 h-[40px] rounded px-3 outline-cyan-500 border-gray hover:border-cyan-600 transition"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Kasbi</label>
            <input
              type="text"
              value={employeeData?.level}
              onChange={(e) => setEmployeeData({ ...employeeData, level: e.target.value })}
              className="w-full border-[2px] h-[40px] rounded px-3 outline-cyan-500 border-gray hover:border-cyan-600 transition"
              placeholder="Kasbi"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowEditModal(false)} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition">
              Bekor qilish
            </button>
            <button disabled={loading} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded transition">
              {loading ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditModal;
