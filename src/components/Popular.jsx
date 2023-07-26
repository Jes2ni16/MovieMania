import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IoImageOutline } from "react-icons/io5";

const Popular = ({ movie, media_type }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/${media_type}/details/${movie?.id}`} className="mt-4">
      {movie?.poster_path !== null ? (
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`${
              !imageLoaded && "filter blur-sm"
            } w-full md:max-w-[200px] h-[260px] md:max-h-[250px] rounded-md overflow-hidden`}
          />
          <div className="absolute top-2 right-2">
            <span
              className={`${
                movie?.vote_average < 5
                  ? "bg-red-600"
                  : movie?.vote_average < 7
                  ? "bg-orange-400"
                  : "bg-green-600"
              } rounded-full p-1 text-gray-300 text-xs font-bold`}
            >
              {movie?.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-full md:max-w-[200px] h-[260px] md:max-h-[250px] bg-gray-300 rounded-md flex items-center justify-center">
          <IoImageOutline className="text-gray-400 text-2xl" />
          <div className="absolute top-2 right-2">
            <span
              className={`${
                movie?.vote_average < 5
                  ? "bg-red-600"
                  : movie?.vote_average < 7
                  ? "bg-orange-400"
                  : "bg-green-600"
              } rounded-full p-1 text-gray-300 text-xs font-bold`}
            >
              {movie?.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      )}
      <div>
        <h4 className="text-sm mt-2 font-semibold truncate overflow-hidden">
          {movie?.title ? movie?.title : movie?.name}
        </h4>
        <p className="text-sm text-gray-400 mt-1">
          {movie?.release_date
            ? moment(movie?.release_date).format("MMMM D YYYY")
            : moment(movie?.first_air_date).format("MMMM D YYYY")}
        </p>
      </div>
    </Link>
  );
};

export default Popular;
