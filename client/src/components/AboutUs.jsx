import { FcAbout } from "react-icons/fc";

const AboutUs = () => {
  return (
    <div className="py-5 px-32 mt-10">
      <h1 className="text-4xl font-bold text-green-800 ">About Us</h1>
      <div className="flex">
        <div className="flex-1 mt-10 gap-5 flex flex-col">
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our Mission</h1>
              <p className="mt-2 ">
                We provide the best health care services we provide the best
                health care services we provide the best health care services we
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our Mission</h1>
              <p className="mt-2 ">
                We provide the best health care services we provide the best
                health care services we provide the best health care services we
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our Mission</h1>
              <p className="mt-2 ">
                We provide the best health care services we provide the best
                health care services we provide the best health care services we
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center ml-20">
          <img
            src="https://i.ytimg.com/vi/B2YCMkTLLNk/maxresdefault.jpg"
            alt="doctor"
            className="w-[500px] h-[400px] object-cover rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
