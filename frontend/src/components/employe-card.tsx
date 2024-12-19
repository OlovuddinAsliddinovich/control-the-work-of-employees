import { FC } from "react";
import { UserType } from "../interfaces";
import { BASE_URL_API } from "../services/api";
import moment from "moment";

interface EmployeCardProps extends UserType {}
const EmployeCard: FC<EmployeCardProps> = ({ firstname, lastname, email, level, image, createdAt }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition">
      <h2 className="text-lg font-semibold mb-2">
        {firstname} {lastname}
      </h2>
      <p className="text-gray-600 mb-2">Email: {email}</p>
      <p className="text-gray-600 mb-2">Kasbi: {level}</p>
      <div className="mb-2 w-full h-[200px]">
        <img src={`${BASE_URL_API}/${image}`} alt="Img" className="w-full h-full object-cover" />
      </div>
      <p className="text-gray-600 mb-2">Ishga qabul qilingan vaqti: {moment(createdAt).format("YYYY, DD-MMMM")}</p>
    </div>
  );
};

export default EmployeCard;
