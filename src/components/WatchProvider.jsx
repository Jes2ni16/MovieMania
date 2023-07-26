import React from "react";
import { Oval } from "react-loader-spinner";

const WatchProvider = ({ data, selectedWatchProviders, handleWatchProvider, loading }) => {
  const isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Oval
            height={40}
            width={40}
            color="#58595b"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#58595b"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {data?.map((provider) => (
            <div key={provider.provider_id} className="relative rounded-md overflow-hidden">
              <button
                onClick={() => handleWatchProvider(provider.provider_id)}
                className="rounded-md overflow-hidden bg-[#FFAE06]"
              >
                <img
                  src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                  alt=""
                  className={`${!isTouchDevice ? "hover:opacity-30" : ""} ${
                    selectedWatchProviders.includes(provider.provider_id) ? "opacity-30" : ""
                  } transition duration-300`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WatchProvider;
