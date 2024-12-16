import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { format } from "date-fns";

const Footer: FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Logo and Links */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img className="w-[150px] h-[50px] mb-4" src="/buxdu_logo.png" alt="Buxoro davlat universiteti" />
            <p className="text-gray-400">Buxoro davlat universiteti, yuqori sifatli ta'lim va ilmiy faoliyatni qo'llab-quvvatlashga sodiq.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Tezkor havolalar</h2>
            <ul>
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-white text-base">
                  Bosh sahifa
                </NavLink>
              </li>
              <li>
                <NavLink to="/employees" className="text-gray-300 hover:text-white text-base">
                  Xodimlar
                </NavLink>
              </li>
              <li>
                <NavLink to="/info" className="text-gray-300 hover:text-white text-base">
                  Ma'lumotlar
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Aloqa ma'lumotlari</h2>
            <ul>
              <li className="cursor-pointer">
                <p className="text-gray-300 text-base">Telefon: +998 91 123 45 67</p>
              </li>
              <li className="cursor-pointer">
                <p className="text-gray-300 text-base">Email: info@buxdu.uz</p>
              </li>
              <li className="cursor-pointer">
                <p className="text-gray-300 text-base">Manzil: Buxoro, O'zbekiston</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Ijtimoiy tarmoqlar</h2>
            <ul className="flex space-x-6">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-2xl">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>© {format(new Date(), "yyyy")} Buxoro Davlat Universiteti. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
