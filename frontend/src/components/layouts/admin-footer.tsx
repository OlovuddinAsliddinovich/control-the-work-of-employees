import { FC } from "react";
import { Link } from "react-router-dom";

const AdminFooter: FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Admin Panel</h2>
            <p className="text-sm">Bu admin panel orqali xodimlar, ma'lumotlar va boshqa tizim boshqaruvi amalga oshiriladi.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Foydali havolalar</h3>
            <ul>
              <li className="mb-1">
                <Link to="/admin" className="hover:text-white hover:underline">
                  Bosh sahifa
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/admin-employees" className="hover:text-white hover:underline">
                  Xodimlar
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/admin-info" className="hover:text-white hover:underline">
                  Ma'lumotlar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Bog'lanish</h3>
            <ul>
              <li className="mb-1">
                <span>Email: </span>
                <a href="mailto:olovuddinramiddinov26@gmail.com" className="hover:text-white hover:underline">
                  olovuddinramiddinov26@gmail.com
                </a>
              </li>
              <li className="mb-1">
                <span>Telefon: </span>
                <a href="tel:+998990781619" className="hover:text-white hover:underline">
                  +998 99 078 16 19
                </a>
              </li>
              <li>
                <span>Manzil: </span> Buxoro viloyati, Buxoro davlat universiteti
              </li>
            </ul>
          </div>
        </div>

        {/* Copywrite qisimi */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Admin Panel. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
