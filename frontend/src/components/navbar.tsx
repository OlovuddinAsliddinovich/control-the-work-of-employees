import { IoCloseCircle } from "react-icons/io5";
import { useNavbarModal } from "../hooks/use-navbar-modal";
import { FC, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "../services/api";
import { useAuthStore } from "../hooks/use-auth-store";

const Navbar: FC = () => {
  const { isOpen, onOpen, onClose } = useNavbarModal();
  const { loggedIn, user } = useAuthStore();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <nav className="bg-gray-800 h-[80px]">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-6">
        <div className="relative flex h-[80px] items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" onClick={onOpen}>
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center cursor-pointer">
              <img className="w-[150px] h-[50px]" src="/buxdu_logo.png" alt="Your Company" onClick={() => navigate("/")} />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                  aria-current="page"
                >
                  Bosh sahifa
                </NavLink>
                <NavLink
                  to="/employees"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Xodimlar
                </NavLink>
                <NavLink
                  to="/info"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Ma'lumotlar
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              {loggedIn ? (
                <div className="flex items-center gap-2" onClick={() => navigate("/profile")}>
                  <img src={`${BASE_URL_API}/${user?.image}`} alt="Img" className="w-[50px] h-[50px] object-cover rounded-full cursor-pointer" />
                </div>
              ) : (
                <Link to={"/sign-in"}>
                  <button className="button">Kirish</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="sm:hidden w-full h-full fixed top-0 left-0 bg-gray-800" id="mobile-menu">
          <div onClick={onClose}>
            <IoCloseCircle className="text-white cursor-pointer ml-auto mt-3 mr-4 text-[20px] w-[20px] h-[20px] hover:text-red-500 transition hover:bg-white rounded-full" />
          </div>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={onClose}
              aria-current="page"
            >
              Bosh sahifa
            </NavLink>
            <NavLink
              onClick={onClose}
              to="/employees"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Xodimlar
            </NavLink>
            <NavLink
              onClick={onClose}
              to="/info"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Ma'lumotlar
            </NavLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
