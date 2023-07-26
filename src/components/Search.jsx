import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useGetSearchQuery } from "../services/api";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Search = ({ isSearch, query, setQuery, onClose }) => {
  const { data: searchResults, isFetching } = useGetSearchQuery({ query }, { skip: !isSearch });

  return (
    <div
      className={`fixed top-5 sm:top-10 left-0 right-0 z-50 sm:left-1/2 sm:-translate-x-1/2 ${
        isSearch ? "translate-y-0" : "-translate-y-96"
      } transition-transform duration-700 ease-in-out md:w-[640px]`}
    >
      <div className="flex flex-col items-center w-full px-2">
        <div className="flex items-center bg-black/80 backdrop-blur w-full sm:w-[530px] md:w-[640px] py-2 px-5 rounded-md shadow-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movies, tv shows, person"
            className="w-full bg-transparent p-2 font-normal outline-none text-sm sm:text-base"
          />
          <HiOutlineMagnifyingGlass className="text-xl" />
        </div>
        <div className="absolute top-16 flex flex-col items-center w-full px-2">
          {query !== "" && (
            <div className="bg-black/80 backdrop-blur w-full sm:w-[530px] md:w-[640px] rounded-md h-auto max-h-[340px] overflow-y-auto overflow-x-hidden scrollbar-none">
              {isFetching ? (
                <div className="flex justify-center py-4">
                  <Oval
                    height={30}
                    width={30}
                    color="#404144"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#404144"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : (
                <>
                  {searchResults?.results?.map((item) => (
                    <Link
                      onClick={onClose}
                      to={`/${item.media_type}${item.media_type === "person" ? "" : "/details"}/${
                        item.id
                      }`}
                      key={item.id}
                      className="block hover:bg-gray-500/10 transition-none duration-300 sm:px-6 py-1.5 sm:py-1"
                    >
                      <div className="flex gap-2">
                        <img
                          src={`${
                            item?.poster_path !== null && item?.profile_path !== null
                              ? `https://image.tmdb.org/t/p/w300${
                                  item?.poster_path || item?.profile_path
                                }`
                              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                          } `}
                          alt=""
                          className="w-20"
                        />
                        <div className="w-[510px]">
                          <h3 className="text-sm">{item.title || item.original_name}</h3>
                          <p className="text-xs pt-1 text-gray-400 capitalize">
                            <span>{item.media_type}</span>
                          </p>
                          <p className="text-xs pt-2 text-gray-400 w-[250px] md:w-full truncate overflow-hidden">
                            {item.overview}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {searchResults?.results?.length === 0 && (
                    <div className="py-20 text-center">
                      <h4 className="text-sm text-gray-300">No results found</h4>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
