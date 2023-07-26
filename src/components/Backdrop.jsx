import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";

const Backdrop = ({ src, isAlwaysDisplayed, setIsVideoPlayed }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      if (isAlwaysDisplayed) {
        setIsDisplayed(false);
        setIsVideoPlayed(true);
      }
    }, 10000);

    const secondTimeout = setTimeout(() => {
      if (isAlwaysDisplayed) {
        setIsDisplayed(true);
        setIsVideoPlayed(false);
      }
    }, 60000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, [isAlwaysDisplayed, setIsVideoPlayed]);

  return (
    <>
      {isDisplayed ? <div className="absolute inset-0 bg-background-dark" /> : null}
      <img
        src={`https://image.tmdb.org/t/p/original${src}`}
        alt="Backdrop"
        loading="lazy"
        sizes="100vw"
        onLoad={() => setImageLoaded(true)}
        className={`
       ${isDisplayed ? "opacity-100" : "xl:opacity-0"}
      object-cover w-full brightness-110 transition-all duration-1000 ease-in`}
      />
      <div className="absolute top-10 left-56 sm:top-48 sm:left-1/2 z-20">
        {!imageLoaded && (
          <LineWave
            height="100"
            width="100"
            color="#636364"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        )}
      </div>
    </>
  );
};

export default Backdrop;
