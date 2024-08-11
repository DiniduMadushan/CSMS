import { FcAbout } from "react-icons/fc";

const AboutUs = () => {
  return (
    <div id="about" className="py-5 px-32 mt-10">
      <h1 className="text-4xl font-bold text-green-800 ">About Us</h1>
      <div className="flex">
        <div className="flex-1 mt-10 gap-5 flex flex-col">
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our Mission</h1>
              <p className="mt-2 ">
              Our mission is to provide exceptional ear, nose, and throat care to our patients with
               compassion and dedication. 
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our Vision</h1>
              <p className="mt-2 ">
              Our vision is to be a leading ENT clinic known for excellence in patient care,
               cutting-edge treatments, and a holistic approach to health.
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center ">
            <FcAbout className="w-16 h-16 " />
            <div className="">
              <h1 className="text-xl font-bold mt-2 text-black">Our aim</h1>
              <p className="mt-2 ">
              We aim to continuously
                advance the field of otolaryngology through research, education, and a commitment 
                to quality healthcare.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center ml-20">
          <img
            src="https://www.ninewellshospital.lk/wp-content/uploads/2018/06/icu-thumb.jpg"
            alt="doctor"
            className="w-[500px] h-[400px] object-cover rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
