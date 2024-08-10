import { IoChatboxEllipsesOutline } from "react-icons/io5";
import AboutUs from "../components/AboutUs";
import CardView from "../components/CardView";
import ContactUs from "../components/ContactUs";
import Review from "../components/Feedback";
import NavBar from "../components/NavBar";
import OurJur from "../components/OurJur";
import { useState } from "react";

const Home = () => {
  const [chatIconClick, setChatIconClick] = useState(false);

  const chatClick = () => {
    setChatIconClick(!chatIconClick);
  };

  return (
    <div className="w-full relative">
      <div
        className=" fixed  bottom-10 right-10 bg-green-500 p-2 rounded-full hover:bg-green-800 cursor-pointer "
        onClick={() => {
          chatClick();
        }}
      >
        <IoChatboxEllipsesOutline size={32} className="text-white" />
      </div>
      {chatIconClick && (
        <div className="fixed bottom-24 right-10 flex justify-between flex-col bg-white  rounded-lg border  shadow-lg h-[400px]   w-[300px] z-10">
          <div className="flex flex-col gap-2">
          <div className="bg-indigo-700 p-2 rounded-t-lg">
            <h1 className="text-white text-lg text-center font-semibold">
              Chat Bot
            </h1>
            </div>
            <div className="p-2 gap-2 flex flex-col">
              <p className="bg-gray-300 p-2 rounded-lg w-36">
                How can I help you?
              </p>
            </div>
          </div>

          <div>
            {" "}
            <div className="p-2 flex">
              <input className="w-full  h-10 border-2 border-gray-300 rounded-lg p-2 mt-2" />
              <button className="ml-2 bg-green-500 text-white rounded-lg p-2 mt-2">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <NavBar />
      <div className="relative">
        <img
          src="https://cpsnb.org/images/slideshow/cpsnb_slide3.jpg"
          alt="main"
          className="h-[600px] min-w-[100%] opacity-95"
        />
        <div className="absolute top-[35%] left-[10%] flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-gray-500 w-[400px]">
            Welcome to Kolonna Base Hospital
          </h1>
          <p className="  text-gray-500">
            We provide the best health care services
          </p>
          <button className="w-[200px] bg-transparent border border-gray-500 text-gray-500  px-5 py-2 rounded-md">
            <a href="/services">Our Services</a>
          </button>
        </div>
      </div>
      <OurJur />
      <CardView />
      <AboutUs />
      <div className="py-1 px-32 mt-10">
        <h1 className="text-4xl font-bold text-green-800 text-center ">
          Feedback
        </h1>
      </div>
      <div className="flex w-full items-center justify-center p-4">
        <div className="container ">
          <Review />
        </div>
      </div>
      <ContactUs />
    </div>
  );
};
export default Home;
