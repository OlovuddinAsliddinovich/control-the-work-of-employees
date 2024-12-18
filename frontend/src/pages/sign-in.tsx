import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../interfaces";
import { FC, FormEvent, useState } from "react";
import { api } from "../services/api";
import { useLoading } from "../hooks/use-loading";
import { toast } from "react-toastify";

const SignIn: FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading();
    try {
      const { data } = await api.post("/auth/login", user);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Tizimga muvaffaqqiyatli kirdingiz!");
      navigate("/");
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data?.message);
      // @ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading();
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-slate-200">
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-full h-full sm:h-auto sm:w-[500px] rounded-none sm:rounded-lg shadow bg-gray-900">
          <div className="flex items-center justify-center pt-6">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-[200px] h-[80px] mr-2" src="./buxdu_logo.png" alt="logo" />
            </Link>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Tizimga emailingiz orqali kiring
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={loginHandler}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Parol
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button disabled={isLoading} type="submit" className="w-full button h-[45px]">
                {isLoading ? "Loading..." : "Kirish"}
              </button>
              <div className="text-center text-white">{format(new Date(), "yyyy")} &copy; Barcha huquqlar himoyalangan</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
