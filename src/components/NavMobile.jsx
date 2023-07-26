import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LuMonitor } from "react-icons/lu";
import { BiMovie } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const NavMobile = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed md:hidden bottom-0 z-40 w-full px-3 bg-black/80 backdrop-blur shadow-sm">
      <div className="flex items-center justify-between gap-5">
        <Link
          to="/"
          className={`flex flex-col items-center transition-colors duration-300 text-gray-400 hover:bg-action-dark hover:text-white py-2 px-4 ${
            pathname === "/" && "bg-action-dark text-white"
          }`}
        >
          <AiOutlineHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/movies"
          className={`flex flex-col items-center text-gray-400 py-2 px-3 transition-colors duration-300 hover:bg-action-dark hover:text-white ${
            pathname === "/movies" && "bg-action-dark text-white"
          }`}
        >
          <BiMovie className="text-2xl" />
          <span className="text-xs">Movies</span>
        </Link>
        <Link
          to="/tv-shows"
          className={`flex flex-col items-center text-gray-400 py-2 px-3 transition-colors duration-300 hover:bg-action-dark hover:text-white ${
            pathname === "/tv-shows" && "bg-action-dark text-white"
          }`}
        >
          <LuMonitor className="text-2xl" />
          <span className="text-xs">TV Shows</span>
        </Link>
        <Link
          to="/popular-people"
          className={`flex flex-col items-center text-gray-400 py-2 px-3 transition-colors duration-300 hover:bg-action-dark hover:text-white ${
            pathname === "/popular-people" && "bg-action-dark text-white"
          }`}
        >
          <BsPeople className="text-2xl" />
          <span className="text-xs">People</span>
        </Link>
      </div>
    </div>
  );
};

export default NavMobile;
