import { useState } from "react";
import { useFilterVideo } from "../hooks/useFilterVideo";
import { useGetVideoQuery } from "../services/api";
import Backdrop from "./Backdrop";
import Playback from "./Playback";
import { useLocation } from "react-router-dom";

const Hero = ({ media }) => {
  const { pathname } = useLocation();
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const type = media?.media_type || pathname.split("/")[1];
  const id = media?.id;
  const { data } = useGetVideoQuery({ type, id });
  const { video } = useFilterVideo(data);

  return (
    <section className="sticky -z-10 aspect-video max-h-screen w-full overflow-hidden sm:top-0">
      <div className="relative h-full w-full">
        {isVideoPlayed && (
          <>{video ? <Playback src={`https://www.youtube.com/embed/${video?.key}`} /> : null}</>
        )}
        <Backdrop
          src={media?.backdrop_path}
          isAlwaysDisplayed={video ? true : false}
          setIsVideoPlayed={setIsVideoPlayed}
        />
        <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-background-dark to-transparent sm:block" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
