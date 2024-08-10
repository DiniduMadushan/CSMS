import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-around h-16 shadow-lg">
      <div className="flex gap-5 justify-center items-center font-bold text-gray-700 cursor-pointer">
        Kolonna Base Hospital
      </div>
      <div className="flex gap-5 justify-center items-center ">
        <Link
          to="/"
          className="p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm"
        >
          Contact
        </Link>
        <div className="p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm">
          Services
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <Link to="/login" className="flex items-center gap-2 text-gray-700 text-sm">
          <BiUser />
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;
