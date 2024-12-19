import { FC, useEffect, useState } from "react";
import { useLoading } from "../hooks/use-loading";
import { TbLoader3 } from "react-icons/tb";
import { EmployeeCard } from "../components";
import UserLayout from "../components/layouts/user-layout";
import { api } from "../services/api";
import { UserType } from "../interfaces";

const Employees: FC = () => {
  const [employees, setEmployees] = useState<UserType[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading();
      try {
        const { data } = await api.get("/auth/users");
        if (!data) return console.log("Hech qanday ma'lumot mavjud emas!");
        console.log(data);

        setEmployees(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading();
      }
    };
    fetchEmployees();
  }, []);

  return (
    <UserLayout>
      <div className="w-full min-h-screen px-1 sm:px-4">
        <h1 className="text-2xl font-bold text-center mt-4">Xodimlar</h1>
        {isLoading ? (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <TbLoader3 className="w-8 h-8 animate-spin ease-out duration-300" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 py-4 flex-1">
            {employees.map((item) => (
              <EmployeeCard key={item._id} {...item} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Employees;
