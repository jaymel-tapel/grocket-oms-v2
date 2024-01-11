import { ReactNode } from "react";
import background from "../../assets/background.png";

interface isProps {
  children: ReactNode;
  headLabel?: String;
  pictureLabel?: String;
  downLabel?: String;
}

const LoginPage: React.FC<isProps> = ({
  children,
  headLabel,
  pictureLabel,
  downLabel,
}) => {
  return (
    <section className="rounded-sm  border border-stroke bg-white shadow-default  ">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <span className="mt-15 inline-block">
              <p className="absolute py-24 px-64 text-4xl font-bold text-black sm:text-title-xl2">
                {pictureLabel}
              </p>
              <img className="h-auto" src={background} alt="background" />
            </span>
          </div>
        </div>

        <div className=" py-32 px-32  border-stroke h-[99vh] bg-[#F1F5F9]  max-sm:h-full max-lg:py-10 max-lg:w-screen max-lg:h-full xl:w-1/2 max-xl:w-screen xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <div className="mb-9">
              <h2 className=" text-4xl font-bold text-black sm:text-title-xl2 ">
                {headLabel}
              </h2>
              <p className="text-xl text-grText-gray font-medium leading-6">
                {downLabel}
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
