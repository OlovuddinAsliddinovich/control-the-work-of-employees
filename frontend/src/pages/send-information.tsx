import React, { FC, useEffect, useState } from "react";
import { UserType } from "../interfaces";
import UserLayout from "../components/layouts/user-layout";
import { api, BASE_URL_API } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import { MdNoteAdd } from "react-icons/md";
import { LuLoader } from "react-icons/lu";

const SendInformation: FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isWork, setIsWork] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [startWork, setStartWork] = useState<boolean>(false);
  const companyLocation = { lat: 39.754542, lng: 64.4266896 };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!accessToken) {
      navigate("/sign-in");
      toast.info("Tizimga kiring!");
      return;
    }
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/auth/get-user`);
        setUser(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const calculateDistance = (userLatitude: number, userLongitude: number, targetLatitude: number, targetLongitude: number): number => {
    const earthRadius = 6371000; // Yerning radiusi (metrda)
    const userLatitudeInRadians = (userLatitude * Math.PI) / 180;
    const targetLatitudeInRadians = (targetLatitude * Math.PI) / 180;
    const deltaLatitude = ((targetLatitude - userLatitude) * Math.PI) / 180;
    const deltaLongitude = ((targetLongitude - userLongitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLatitude / 2) ** 2 + Math.cos(userLatitudeInRadians) * Math.cos(targetLatitudeInRadians) * Math.sin(deltaLongitude / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Masofa metrda
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          const calculatedDistance = calculateDistance(position.coords.latitude, position.coords.longitude, companyLocation.lat, companyLocation.lng);
          setDistance(calculatedDistance);

          if (calculatedDistance <= 200) {
            setIsWork(true);
          } else {
            setIsWork(false);
          }
        },
        (error: GeolocationPositionError) => {
          console.error(`Joylashuv Olinmadi: ${error.message}`);
        }
      );
    } else {
      console.error("Browser joylashuvni qo'llab-quvvatlamaydi!");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImgLoading(true);
    try {
      if (!image) return alert("Siz rasm tanlamagansiz!");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", user?.id || "");
      const { data } = await api.post("/face/verify", formData);
      toast.success(data?.message);
      setStartWork(true);
    } catch (error) {
      setStartWork(false);
      setImage(null);
      // @ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setImgLoading(false);
    }
  };

  const handleWorkStart = async () => {
    try {
      // Ishni boshlash uchun so'rov yuborish
      const { data } = await api.post(`/work/start`, { userId: user?.id });
      toast.success(data?.message);
      setIsWork(true); // Ishni boshlashni tasdiqlaymiz
    } catch (error) {
      toast.error("Ishni boshlashda xatolik yuz berdi.");
    }
  };

  const handleWorkEnd = async () => {
    try {
      // Ishni yakunlash uchun so'rov yuborish
      const { data } = await api.post(`/work/end`, { userId: user?.id });
      toast.success(data?.message);
      setIsWork(false); // Ish tugadi, shuning uchun holatni o'zgartiramiz
    } catch (error) {
      toast.error("Ishni yakunlashda xatolik yuz berdi.");
    }
  };

  return (
    <UserLayout>
      <div className="mx-auto my-4 min-h-screen w-full px-2 sm:px-4">
        <h1 className="text-center text-2xl font-bold py-4">Joylashuvni yuborish</h1>
        {isLoading ? (
          <LuLoader className="animate-spin mx-auto my-5" />
        ) : (
          <>
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
                <div className="font-semibold text-[20px] my-3">Ishda ekanligingizni tasdiqlash uchun joylashuvni yuboring</div>
                <button className="button w-full" onClick={handleLocation}>
                  {loading ? "Joylashuvni yuklanmoqda..." : "Joylashuvni yuborish"}
                </button>
                {location && (
                  <div className="mt-4">
                    <p>
                      {`${user?.firstname} ${user?.lastname}`} - {distance <= 200 ? "Siz ish joyiga kelgansiz!" : "Siz ish joyida emassiz!"}
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
                  <div className="flex flex-1 w-full sm:w-[50%] flex-col bg-white py-8">
                    <img
                      src={`${BASE_URL_API}/${user?.image}`}
                      className="w-[200px] h-[200px] object-cover border-[4px] border-blue-700 rounded-full mx-auto"
                      alt="img"
                    />
                    <p className="text-center font-semibold text-xl">{`${user?.firstname} ${user?.lastname}`}</p>
                    <p className="text-center text-gray-700">
                      Kasbi: <span className="font-bold">{user?.level}</span>
                    </p>
                  </div>

                  <form className="w-full sm:w-[50%]">
                    <h1 className="font-semibold text-center sm:text-start">Yuzni aniqlash uchun rasm yuborish</h1>
                    <label
                      htmlFor="img"
                      className="my-3 cursor-pointer border-dashed border-2 border-gray-400 w-[150px] h-[200px] flex items-center justify-center"
                    >
                      {image ? (
                        <img src={URL.createObjectURL(image)} alt="image" className="w-full h-full object-cover" />
                      ) : (
                        <MdNoteAdd className="w-[50%] h-[50%] text-gray-500 object-cover" />
                      )}
                    </label>
                    <div className="flex flex-col gap-1 mt-4">
                      <input
                        type="file"
                        placeholder="Rasm tanlanmagan"
                        onChange={(e) => handleChange(e)}
                        id="img"
                        className="h-[40px] hidden p-1 rounded cursor-pointer hover:outline outline-blue-500 outline-[2px] bg-white border border-blue-600"
                      />
                    </div>
                    <button disabled={imgLoading} onClick={(e) => handleSubmit(e)} className="button my-3 w-[200px] flex items-center justify-center">
                      {imgLoading ? <VscLoading className="animate-spin" /> : "Rasmni yuborish"}
                    </button>
                  </form>
                </div>
                {startWork ? (
                  <div className="flex justify-between py-3 w-full gap-4">
                    <button className="button w-full sm:w-[50%] bg-green-700" onClick={handleWorkStart}>
                      Ishni boshlash
                    </button>
                    <button className="button w-full sm:w-[50%] bg-red-600 hover:bg-red-700" onClick={handleWorkEnd}>
                      Ishni yakunlash
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default SendInformation;
