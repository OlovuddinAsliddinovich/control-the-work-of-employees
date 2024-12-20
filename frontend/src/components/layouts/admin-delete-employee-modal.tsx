import { FC } from "react";

interface AdminDeleteModalProps {
  employeeName: string;
  id: string;
  onClose: () => void;
  onDelete: () => void;
}

const AdminDeleteModal: FC<AdminDeleteModalProps> = ({ employeeName, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">O'chirishni tasdiqlang</h2>
        <p className="text-gray-600 mb-4">
          Siz <strong className="text-red-600">{employeeName}</strong> xodimini o'chirishni xohlaysizmi?
        </p>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition">
            Bekor qilish
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
            Ha, o'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;
