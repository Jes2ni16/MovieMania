import Section from "./Section/Section";
import { useGetPopularTvQuery } from "../services/api";
import MediaCard from "./MediaCard";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

const PopularTvShows = () => {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();
  const { data: tvShows } = useGetPopularTvQuery();

  return (
    <Section heading="TV Series" scrollLeft={scrollLeft} scrollRight={scrollRight}>
      <div ref={scrollRef} className="grid grid-flow-col gap-4 overflow-x-scroll scrollbar-none">
        {tvShows?.results?.map((tv) => (
          <MediaCard key={tv.id} media={tv} isVideo="tv" />
        ))}
      </div>
    </Section>
  );
};

export default PopularTvShows;
