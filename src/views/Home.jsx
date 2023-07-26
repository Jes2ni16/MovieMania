import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import NowShowing from "../components/NowShowing";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";

import { useGetTrendingQuery } from "../services/api";
import UpcomingMovie from "../components/UpcomingMovie";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import PopularTvShows from "../components/PopularTvShows";

const Home = () => {
  const { data: trending, isFetching } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(trending);
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          onClick={() => setModalOpen(false)}
          className="fixed z-40 inset-0 overflow-hidden bg-gradient-to-r from-black/80 backdrop-blur"
        />
      )}
      {openModal && <Modal media={randomMovie} setModalOpen={setModalOpen} openModal={openModal} />}
      <Hero media={randomMovie} />
      <Content variant="primary">
        <Showcase media={randomMovie} isMediaSelected={false} setModalOpen={setModalOpen} />
      </Content>
      <Content isSpacerOnly>
        <NowShowing />
        <UpcomingMovie />
        <PopularTvShows />
      </Content>
    </>
  );
};

export default Home;
