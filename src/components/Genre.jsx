const Genre = ({ genres, handleGenre, genre }) => {
  const isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 px-4">
      {genres?.genres?.map((item) => (
        <button
          key={item.id}
          onClick={() => handleGenre(item.id)}
          className={`text-sm text-gray-400 ${
            !isTouchDevice ? "hover:bg-[#FFAE06]" : ""
          } hover:text-white ${
            genre.includes(item.id) ? "bg-[#FFAE06] text-white" : "bg-neutral-700"
          } transition duration-300 px-6 py-1.5 rounded-full`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Genre;
