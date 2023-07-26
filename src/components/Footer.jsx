import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-action-dark w-full h-full mt-5 sm:mt-28">
      <div className="custom-container grid md:grid-cols-2  lg:grid-cols-3 items-start gap-10 px-5  sm:px-8 py-20">
        <div>
          <h3 className="text-lg text-gray-300">About Us</h3>
          <p className="text-xs text-gray-300 leading-5 pt-1">
            Discover the world of cinema at your fingertips with MovieMania! From Hollywood blockbusters to independent
            gems, our web app offers a vast collection of films for every taste. Dive into a user-friendly interface,
            explore curated lists, and stay up to date with the latest releases. MovieMania is your go-to destination
            for an immersive movie-watching experience.
          </p>
          <div className="flex gap-2 mt-4">
            <div className="bg-background-dark shadow-md rounded-md p-2.5">
              <BsFacebook className="text-lg" />
            </div>
            <div className="bg-background-dark shadow-md rounded-md p-2.5">
              <BsInstagram className="text-lg" />
            </div>
            <div className="bg-background-dark shadow-md rounded-md p-2.5">
              <FiYoutube className="text-lg" />
            </div>
          </div>
        </div>
        <div className="lg:pl-20">
          <Link to="/" className="flex items-center gap-1">
            <div className="text-white text-lg font-extrabold flex items-center">
              Mo
              <img src="/cinema.png" className="w-7 object-contain" alt="" />
              ie
              <span className="text-yellow-500">Mania</span>
            </div>
          </Link>
          <ul className="text-xs text-gray-300 space-y-2 mt-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/popular-movies">Movies</Link>
            </li>
            <li>
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li>
              <Link to="/popular-people">Popular people</Link>
            </li>
          </ul>
        </div>
        <div className="lg:pl-10">
          <h3>Powered By</h3>
          <div className="w-28 pt-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/768px-Tmdb.new.logo.svg.png?20200406190906"
              alt="tmdb"
              loading="lazy"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
