import moment from "moment";

import { useGetUpComingMovieQuery } from "../services/api";
import Section from "./Section/Section";
import MediaCard from "./MediaCard";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

function UpcomingMovie() {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const { data } = useGetUpComingMovieQuery({ date: moment(new Date()).format("YYYY-MM-DD") });

  return (
    <Section heading="Upcoming Movies" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div
        ref={scrollRef}
        className="grid grid-rows-2 grid-flow-col gap-4 md:mt-7 overflow-x-auto scrollbar-none"
      >
        {data?.results?.map((item) => (
          <MediaCard key={item.id} media={item} isVideo="movie" />
        ))}
      </div>
    </Section>
  );
}

export default UpcomingMovie;
