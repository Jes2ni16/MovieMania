import { useEffect, useState } from "react";

const useInfinityScroll = (isFetching, page, setPage, total_pages) => {
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!loadMore) return;

    const onScroll = () => {
      const scrolledToBottom =
        document.documentElement.clientHeight + window.scrollY >=
        document.documentElement.offsetHeight * 0.8;
      if (scrolledToBottom && !isFetching && page < total_pages) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [loadMore, page, isFetching, setPage, total_pages]);

  const handleLoadMore = () => {
    setLoadMore(true);
    setPage((prev) => prev + 1);
  };

  return [handleLoadMore, loadMore];
};

export default useInfinityScroll;
