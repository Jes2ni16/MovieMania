import { useEffect, useState } from "react";

import Grid from "../components/Grid/Grid";
import People from "../components/People";
import Content from "../components/content/Content";
import { useGetPopularPeopleQuery } from "../services/api";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { Oval } from "react-loader-spinner";

const PopularPeople = () => {
  const [page, setPage] = useState(1);
  const { data: people, isLoading, isFetching } = useGetPopularPeopleQuery({ page });
  const total_pages = people?.total_pages;
  const [handleLoadMore, loadMore] = useInfinityScroll(isFetching, page, setPage, total_pages);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Content variant="secondary">
        <section className="mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6 overflow-hidden">
          <h1 className="text-xl sm:text-2xl font-medium capitalize mb-1 sm:mb-4">Popular People</h1>
          <Grid>
            {people?.results?.map((movie, index) => (
              <People key={index} movie={movie} />
            ))}
          </Grid>
          {loadMore && isFetching && (
            <div className="flex justify-center mt-6">
              <Oval
                height={40}
                width={40}
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
          )}
          {!loadMore && (
            <div className="flex justify-center">
              <Button handleClick={handleLoadMore}>Load more...</Button>
            </div>
          )}
        </section>
      </Content>
    </>
  );
};

export default PopularPeople;
