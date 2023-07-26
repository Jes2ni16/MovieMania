import { useEffect, useState } from "react";

export const useGetRandomMovie = (data) => {
  const [randomMovie, setRandomMovie] = useState();
  const randomIndex = Math.floor(Math.random() * data?.results?.length);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomMovie(data.results[randomIndex]);
    }
  }, [data]);

  return {
    randomMovie,
  };
};
