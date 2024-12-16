import { FC } from "react";
import { EmployeeType } from "../interfaces";

interface EmployeCardProps extends EmployeeType {}
const EmployeCard: FC<EmployeCardProps> = ({ address, compnay, email, id, name, phone, username, website }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition">
      <div className="bg-blue-600 text-white mx-auto my-5 flex rounded-full w-[80px] h-[80px] items-center justify-center text-[50px]">
        {name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase()}
      </div>
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-500">@{username}</p>
      <p className="text-gray-700">Email: {email}</p>
      <p className="text-gray-700">Phone: {phone}</p>
      <p className="text-blue-500">
        <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      </p>
    </div>
  );
};

export default EmployeCard;
