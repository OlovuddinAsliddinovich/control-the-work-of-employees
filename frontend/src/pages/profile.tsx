import { FC } from "react";
import { useAuthStore } from "../hooks/use-auth-store";
import { useLoading } from "../hooks/use-loading";
import { BASE_URL_API } from "../services/api";
import moment from "moment";

const Profile: FC = () => {
  const { user } = useAuthStore();
  const { isLoading } = useLoading();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-screen">
      {isLoading ? (
        <div>Loading....</div>
      ) : user ? (
        <div className="overflow-hidden shadow-[0px_0px_30px_rgba(0,0,0,0.25)] rounded-lg border">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-center">
            <img src={`${BASE_URL_API}/${user?.image}`} className="w-[150px] h-[150px] rounded-full" alt="userImage" />
          </div>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Xodim profili</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Quyida siz o'zingiz haqingizdagi ma'lumotlarni ko'rishingiz mumkin</p>
          </div>
          <div className="border-t border-gray-600 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 bg-slate-300 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ism va familiya</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.firstname} {user?.lastname}
                </dd>
              </div>
              <div className="py-3 sm:py-5 bg-slate-300 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
              </div>
              <div className="py-3 sm:py-5 bg-slate-300 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Lavozimi</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.level}</dd>
              </div>
              <div className="py-3 sm:py-5 bg-slate-300 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ro'yxatdan o'tgan sana</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(user?.createdAt).format("YYYY, DD-MMM")}</dd>
              </div>
              <div className="py-3 sm:py-5 bg-slate-300 sm:px-5 w-full flex items-center justify-start">
                <button onClick={logoutHandler} className="button bg-red-600 w-full xs:w-auto hover:bg-red-700">
                  Chiqish
                </button>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-2xl font-bold">Siz tizimga kirmagansiz!</h1>
      )}
    </div>
  );
};

export default Profile;
