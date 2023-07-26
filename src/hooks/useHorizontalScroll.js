import { useRef } from "react";

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const itemWidth = containerWidth / 3;
      const scrollPosition = scrollRef.current.scrollLeft - itemWidth * 3;

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      if (Math.round(scrollLeft + clientWidth) >= scrollRef.current.scrollWidth) {
        // Scroll reached the end, scroll back to the beginning
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll by a fixed amount to the right
        scrollRef.current.scrollBy({
          left: scrollRef.current.scrollLeft + clientWidth / 3,
          behavior: "smooth",
        });
      }
    }
  };

  return { scrollRef, scrollLeft, scrollRight };
};

export default useHorizontalScroll;
