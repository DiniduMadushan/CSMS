const ContactUs = () => {
  return (
    <div className="bg-green-700">
      <div className="py-5 px-32 flex">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-2 font-bold text-white">
            We provide the best health care services
          </p>
          <div className="flex">
            <div className="flex flex-1 flex-col flex-wrap justify-center">
              <input
                type="text"
                placeholder="Name"
                className="w-[400px] h-[40px] mt-5 rounded-md p-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-[400px] h-[40px] mt-5 rounded-md p-2"
              />
              <textarea
                placeholder="Message"
                className="w-[400px] h-[100px] mt-5 rounded-md p-2"
              ></textarea>
              <button className="w-[200px] bg-white text-green-500 mt-5 px-5 py-2 rounded-md">
                Send Message
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://richfieldmedicalgroup.com/wp-content/uploads/2022/08/meeting-doc-1024x683-1024x585.jpg"
            alt="contact"
            className="w-full h-[400px] object-cover rounded-lg mt-10"
          />
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
