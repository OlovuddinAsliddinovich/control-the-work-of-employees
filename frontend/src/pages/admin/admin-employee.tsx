import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, BASE_URL_API } from "../../services/api";
import { UserType } from "../../interfaces";
import { AdminLayout } from "../../components";
import moment from "moment";
import AdminEditModal from "../../components/layouts/admin-edit-employee-modal";
import AdminDeleteModal from "../../components/layouts/admin-delete-employee-modal";
import { toast } from "react-toastify";

const AdminEmployeePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEmployee = async () => {
      try {
        const { data } = await api.get(`/auth/users/${id}`);
        setEmployee(data);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi!");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log(id);
      await api.delete(`/auth/delete/${id}`);
      toast.success("Xodim muvaffaqiyatli o'chirildi.");
      window.location.href = "/admin-employees";
    } catch (error) {
      toast.error("Xodimni o'chirishda xatolik yuz berdi.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <p className="text-center mt-10">Yuklanmoqda...</p>
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <p className="text-center text-red-600 mt-10">{error}</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="bg-white shadow-lg rounded-lg p-6 my-6 max-w-3xl mx-auto transition-transform">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-full sm:w-[50%]">
            <img src={`${BASE_URL_API}/${employee?.image}`} alt="Employee" className="w-full border-4 border-blue-500 shadow-md" />
            <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1 w-full sm:w-[50%]  text-center flex flex-col gap-4 items-start justify-between sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              {employee?.firstname} {employee?.lastname}
            </h2>
            <p className="text-gray-600 mb-1 text-lg">
              <strong className="text-gray-700">Email:</strong> {employee?.email}
            </p>
            <p className="text-gray-600 mb-1 text-lg">
              <strong className="text-gray-700">Lavozim:</strong> <span className="capitalize text-blue-500 font-medium">{employee?.level}</span>
            </p>
            <p className="text-gray-600 mb-1 text-lg">
              <strong className="text-gray-700">Yaratilgan:</strong> {moment(employee?.createdAt).format("YYYY-MM-DD, HH:mm")}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:justify-end gap-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-transform transform hover:scale-110"
          >
            Tahrirlash
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-transform transform hover:scale-110"
          >
            O'chirish
          </button>
        </div>
      </div>
      {showEditModal && <AdminEditModal setShowEditModal={setShowEditModal} employee={employee} setEmployee={setEmployee} />}

      {showDeleteModal && (
        <AdminDeleteModal
          id={employee?._id || ""}
          employeeName={`${employee?.firstname} ${employee?.lastname}`}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
};

export default AdminEmployeePage;
