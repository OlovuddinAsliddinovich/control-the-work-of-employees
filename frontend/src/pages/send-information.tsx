import React, { FC, useEffect, useState } from "react";
import { EmployeeType } from "../interfaces";

const SendInformation: FC = () => {
  const [user, setUser] = useState<EmployeeType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isWork, setIsWork] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const companyLocation = { lat: 39.762118, lng: 64.422589 };
  // const companyLocation = { lat: 39.754542, lng: 64.4266896 };

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, []);

  const calculateDistance = (userLatitude: number, userLongitude: number, targetLatitude: number, targetLongitude: number): number => {
    const earthRadius = 6371000; // Yerning radiusi (metrda)

    // Geografik koordinatalarni radianlarga aylantirish
    const userLatitudeInRadians = (userLatitude * Math.PI) / 180;
    const targetLatitudeInRadians = (targetLatitude * Math.PI) / 180;
    const deltaLatitude = ((targetLatitude - userLatitude) * Math.PI) / 180;
    const deltaLongitude = ((targetLongitude - userLongitude) * Math.PI) / 180;

    // Haversine formulasi
    const a =
      Math.sin(deltaLatitude / 2) ** 2 + Math.cos(userLatitudeInRadians) * Math.cos(targetLatitudeInRadians) * Math.sin(deltaLongitude / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Masofani hisoblash (metrda)
    return earthRadius * c; // Masofa metrda
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          console.log(`Joylashuv Olindi: `, position.coords);

          // Foydalanuvchi va kompaniyaning joylashuvi orasidagi masofani hisoblash
          const calculatedDistance = calculateDistance(position.coords.latitude, position.coords.longitude, companyLocation.lat, companyLocation.lng);
          setDistance(calculatedDistance);
          console.log(`Masofa: ${calculatedDistance.toFixed(2)} metr`);

          // Agar masofa 200 metrdan kam yoki teng bo'lsa, ishni tasdiqlash
          if (calculatedDistance <= 200) {
            setIsWork(true); // Masofa 200 metrdan kam bo'lsa ishni tasdiqlash
          } else {
            setIsWork(false); // Aks holda, ishni tasdiqlashni o'chirish
          }
        },
        (error: GeolocationPositionError) => {
          console.error(`Joylashuv Olinmadi: ${error.message}`);
        }
      );
    } else {
      console.error("Browser joylashuvni qo'llab-quvvatlamaydi!");
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!image) return alert("Siz rasm tanlamagansiz!");
    const formData = new FormData();
    formData.append("image", image);
  };
  return (
    <div className="mx-auto my-4 min-h-screen w-full px-2 sm:px-4 border border-black">
      <h1 className="text-center text-2xl font-bold py-4">Joylashuvni yuborish</h1>
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <div className="w-full sm:w-[50%] border-border rounded">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.2386295566066!2d64.41949952579327!3d39.76231547155231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f50060d1c5c0027%3A0xf76b636757c475a5!2sBukhara%20State%20University!5e1!3m2!1sen!2s!4v1734354823698!5m2!1sen!2s"
            style={{ border: 0 }}
            className="w-full h-[300px] sm:h-[500px]"
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full sm:w-[50%]">
          <div className="font-semibold text-[20px] my-3">Ishda eknligingizni tasdiqlash uchun joylashuvni yuboring</div>
          <button className="button w-full" onClick={handleLocation}>
            Joylashuvni yuborish
          </button>
          {location && (
            <div className="mt-4">
              <p>
                {user?.name} - {distance <= 200 ? "Siz ish joyiga kelgansiz!" : "Siz ish joyida emassiz!"}
              </p>
              <p>Masofa: {distance.toFixed(2)} metr</p>
            </div>
          )}
        </div>
      </div>
      {isWork ? (
        <>
          <h1 className="w-full text-2xl font-bold text-center cursor-default my-3">Rasmni yuborish</h1>
          <div className="w-full flex flex-col sm:flex-row gap-6">
            <div className="flex flex-1 w-full sm:w-[50%] flex-col">
              <span className="flex items-center gap-1">
                FIO:
                <h2 className="font-semibold text-[20px]">{user?.name}</h2>
              </span>
              <p>
                Foydalanuvchi nomi <span className="underline font-semibold">@{user?.username}</span>
              </p>
              <span>
                Telefon raqam:
                <span className="ml-2 font-semibold">{user?.phone}</span>
              </span>
              <span>
                Email address:
                <span className="ml-2 font-semibold">{user?.email}</span>
              </span>
              <span>
                Tug'ilgan shahar:
                <span className="ml-2 font-semibold">{user?.address.city}</span>
              </span>
            </div>
            <form className="w-full sm:w-[50%]">
              <h1 className="font-semibold text-center sm:text-start">Yuzni aniqlash uchun rasm yuborish</h1>
              <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="img">Rasm tanlang</label>
                <input
                  type="file"
                  placeholder="Rasm tanlanmagan"
                  onChange={(e) => handleChange(e)}
                  id="img"
                  className="h-[40px] p-1 rounded cursor-pointer hover:outline outline-blue-500 outline-[2px] bg-white border border-blue-600"
                />
              </div>
              <button onClick={(e) => handleSubmit(e)} className="button my-3">
                Rasmni yuborish
              </button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SendInformation;
