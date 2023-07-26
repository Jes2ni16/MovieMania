import langToLang from "language-name-to-language-name";
import moment from "moment";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import BackdropBlur from "./Backdrop/BackdropBlur";

const MovieCard = ({ media, isVideo }) => {
  const navigate = useNavigate();
  const language = langToLang(media.original_language);
  const [openModal, setModalOpen] = useState(false);

  const handleRouteChange = (mediaId) => {
    navigate(`/${isVideo}/details/${mediaId}`);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <BackdropBlur onClose={onClose} isOpen={openModal} />
      <Modal media={media} setModalOpen={setModalOpen} openModal={openModal} isVideo={isVideo} />
      <div className="relative group w-72 sm:w-96 h-[270px] rounded-md overflow-hidden cursor-default">
        <div className="rounded-md overflow-hidden">
          <img
            src={`${
              media?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${media?.backdrop_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
            }`}
            alt=""
            className="h-[270px] object-cover"
          />
        </div>
        <div className="absolute bottom-10 z-20 px-5 group-hover:-translate-y-32 transition-transform duration-300 ">
          <h2 className="text-lg sm:text-2xl group-hover:text-base transition duration-300 font-bold">
            {media?.title || media?.name}
          </h2>
          <span className="text-gray-300 capitalize text-sm">
            {language?.en.name ? language?.en.name : "English"}
          </span>{" "}
          •{" "}
          <span
            className={`${
              media?.vote_average < 5
                ? "bg-red-600"
                : media?.vote_average < 7
                ? "bg-orange-400"
                : "bg-green-600"
            } rounded-full px-2.5 text-black text-xs font-semibold`}
          >
            {media?.vote_average.toFixed(1)}
          </span>{" "}
          •{" "}
          <span className="text-sm text-gray-300">
            {moment(media?.release_date).format("MMMM D YYYY")}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 group-hover:h-full h-0 transition-all duration-300 bg-black/30 backdrop-blur rounded-md overflow-hidden">
          <div className="translate-y-28 px-5 py-1">
            <h4 className="font-bold text-sm">Overview</h4>
          </div>
          <div className="h-[60px] overflow-y-auto scrollbar-none px-5 translate-y-28">
            <p className="text-xs sm:text-sm">{media?.overview}</p>
          </div>
          <div className="px-5 translate-y-28 flex gap-3 mt-4">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 text-sm hover:bg-[#FFAE06] bg-[#FFC54E] transition duration-300 rounded-full px-5 py-1"
            >
              <FaPlay size="15px" />
              <span>Trailler</span>
            </button>
            <button
              onClick={() => handleRouteChange(media.id)}
              className="flex items-center gap-1 text-sm hover:bg-[#FFC54E] bg-[#FFAE06] transition duration-300 rounded-full px-5 py-1"
            >
              <LuClipboardList size="20px" />
              <span>Details</span>
            </button>
          </div>
        </div>
        <div className="absolute top-0 w-full h-full bg-black/30 rounded-md overflow-hidden" />
      </div>
    </>
  );
};

export default MovieCard;
