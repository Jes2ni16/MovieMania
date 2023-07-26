import moment from "moment";

const Credit = ({
  title,
  name,
  poster_path,
  profile_path,
  character,
  release_date,
  first_air_date,
  isCast = false,
  isMovie = false,
}) => {
  return (
    <div>
      <div className="h-[180px] sm:h-[190px] flex flex-col justify-center">
        <img
          src={`${
            poster_path || profile_path
              ? `https://image.tmdb.org/t/p/w300${poster_path || profile_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }`}
          alt={title || name}
          loading="lazy"
          className="w-full h-full md:min-h-[190px] object-cover rounded-md"
        />
        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </div>
      <p
        className={`text-xs sm:text-sm ${
          isCast && "text-center"
        } text-gray-300 max-w-[130px] truncate pt-2 mt-auto`}
      >
        {title || name}
      </p>
      {isCast && <span className="text-xs text-gray-400 text-center block mt-1">{character}</span>}
      {isMovie && (
        <span className="text-xs text-gray-400 block mt-1">
          {release_date
            ? moment(release_date).format("MMMM D YYYY")
            : moment(first_air_date).format("MMMM D YYYY")}
        </span>
      )}
    </div>
  );
};

export default Credit;
