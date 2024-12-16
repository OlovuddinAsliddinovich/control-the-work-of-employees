import { FC, useEffect, useState } from "react";
import { EmployeeType } from "../interfaces";
import { useLoading } from "../hooks/use-loading";
import { TbLoader3 } from "react-icons/tb";
import { EmployeeCard } from "../components";

const Employees: FC = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading();
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const employe = await response.json();
        if (!employe) return console.log("Hech qanday ma'lumot mavjud emas!");
        setEmployees(employe);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading();
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="w-full min-h-screen px-1 sm:px-4">
      <h1 className="text-2xl font-bold text-center mt-4">Xodimlar</h1>
      {isLoading ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <TbLoader3 className="w-8 h-8 animate-spin ease-out duration-300" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 py-4 flex-1">
          {employees.map((item) => (
            <EmployeeCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;
