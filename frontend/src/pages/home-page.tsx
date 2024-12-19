import { FC, useEffect } from "react";
import { useAuthStore } from "../hooks/use-auth-store";
import { useLoading } from "../hooks/use-loading";
import { api } from "../services/api";
import UserLayout from "../components/layouts/user-layout";

const HomePage: FC = () => {
  const { setLoggedIn, setUser } = useAuthStore();
  const { setIsLoading } = useLoading();

  const getUser = async () => {
    setIsLoading();
    try {
      const { data } = await api.get("/auth/get-user");
      setLoggedIn(true);
      setUser(data);
    } catch (error) {
      // @ts-ignore
      console.log(error.response.data.message);
    } finally {
      setIsLoading();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUser();
    }
  }, []);

  return (
    <UserLayout>
      <div className="flex gap-4 items-start justify-between flex-col sm:flex-row p-4 w-full">
        <div className="w-full sm:w-[50%] border-border rounded">
          <img src="/buxdu.webp" alt="img" className="w-full object-cover" />
        </div>
        <div className="w-full sm:w-[50%]">
          <h1 className="text-2xl font-bold text-center w-full text-blue-700">Buxoro davlat universiteti tarixi</h1>
          <p className="line-clamp-[14] text-justify indent-4">
            Buxoro davlat universiteti O'zbekistonning eng qadimiy oliy ta'lim muassasalaridan biri bo'lib, 1992-yilda tashkil etilgan. Universitet
            Buxoro shahrida joylashgan va turli ixtisosliklar bo'yicha ta'lim beradi. Uning tarixi 1930-yillarga borib taqaladi, universitetda yuqori
            malakali professor-o'qituvchilar ilmiy-tadqiqot ishlari olib boradi. Hozirda universitet O'zbekistonning ilm-fan va ta'lim sohasida
            yetakchi o'rinlardan birini egallaydi, talabalar nafaqat bilim, balki amaliy tajriba ham oladi. Buxoro davlat universiteti shahar va
            mamlakat ilmiy hayotida muhim ahamiyatga ega.
          </p>
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold">Buxoro davlat universiteti</h1>
      <div className="flex gap-4 items-start justify-between flex-col sm:flex-row-reverse p-4 w-full">
        <div className="w-full sm:w-[50%] border-border rounded">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d754.5135576378442!2d64.42194219498838!3d39.762086566656066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f50060d1c5c0027%3A0xf76b636757c475a5!2sBukhara%20State%20University!5e1!3m2!1sen!2s!4v1734337726492!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full sm:w-[50%]">
          <h1 className="text-2xl font-bold text-center w-full text-blue-700">Buxoro davlat universiteti</h1>
          <p className="line-clamp-[14] text-justify indent-4">
            Buxoro davlat universitetida xodimlarni boshqarish tizimi universitetning muvaffaqiyatli rivojlanishida asosiy omillardan biri
            hisoblanadi. Bu tizim universitetning turli bo'limlarida ishlovchi xodimlarni boshqarish, ularga ta'lim berish, malakasini oshirish va
            samarali ish faoliyatini ta'minlash uchun mo'ljallangan. Xodimlar yollash jarayoni, ularning malaka va tajribasini hisobga olgan holda
            amalga oshiriladi. Universitetda ishga qabul qilishdan tortib, xodimlarning karyera rivojlanishiga qadar barcha jarayonlar tartibga
            solingan. Xodimlarni motivatsiya qilish, ularning kasbiy o'sishini ta'minlash uchun turli treninglar, seminarlarga qatnashish
            imkoniyatlari yaratiladi. Shuningdek, xodimlarning ishlash ko'rsatkichlari muntazam ravishda baholanadi va ular uchun motivatsion tizimlar
            ishlab chiqiladi. Bu esa nafaqat universitetning ichki samaradorligini oshiradi, balki ilmiy va ta'lim sohasidagi yuksalishlarga ham olib
            keladi. Xodimlarni boshqarish tizimi Buxoro davlat universitetining ilg'or maqsadlariga erishishga xizmat qiladi va universitetning umumiy
            muvaffaqiyatiga sezilarli hissa qo'shadi.
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomePage;
