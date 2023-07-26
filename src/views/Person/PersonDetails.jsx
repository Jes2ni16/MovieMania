import React, { useEffect, useState } from "react";

import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BsTiktok } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { Link, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import {
  useGetCreditMoviesQuery,
  useGetExternalIDQuery,
  useGetPersonDetailsQuery,
  useGetProfileQuery,
} from "../../services/api";
import Content from "../../components/content/Content";
import Credit from "../../components/Credit";
import Loader from "../../components/Loader/Loader";
import { Oval } from "react-loader-spinner";
import NotFound from "../../components/NotFound";

const Details = ({ heading, details, isRepeated = false, age }) => {
  if (isRepeated) {
    return (
      <div className="mt-3">
        <h3 className="text-base text-gray-300">{heading}</h3>
        {details?.also_known_as?.map((item, index) => (
          <p className="text-sm font-light text-gray-300 py-1.5" key={index}>
            {item}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3 className="text-base text-gray-300">{heading}</h3>
      <p className="text-sm font-light text-gray-300">
        {details} <span>{age ? `${age} years old` : ""}</span>
      </p>
    </div>
  );
};

const SocialAccounts = ({ url, social_id, icon }) => {
  return (
    <Link to={`${url}${social_id}`} target="_blank" className="text-2xl inline-block pt-7">
      {icon}
    </Link>
  );
};

const ProfileModal = ({ profilePath, setOpenModal, openModal }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`relative w-full ${
        openModal ? "block opacity-100" : "hidden opacity-0"
      } transition-all duration-700`}
    >
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-50 left-1/2 -translate-x-1/2 w-fit sm:w-[256px] h-fit sm:h-[387px]`}
      >
        <img
          src={`https://www.themoviedb.org/t/p/original${profilePath}`}
          alt={profilePath}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full rounded-md object-contain ${!imageLoaded && "filter blur-sm"}`}
        />
        {!imageLoaded && (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
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
        {imageLoaded && (
          <div
            className="absolute -top-4 -right-4 z-40 p-1.5 bg-black/20 backdrop-blur rounded-full cursor-pointer"
            onClick={() => {
              setOpenModal(false);
              setImageLoaded(false);
            }}
          >
            <AiOutlineClose className="text-white text-lg" />
          </div>
        )}
      </div>
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur transition-all duration-700`}
        onClick={() => {
          setOpenModal(false);
          setImageLoaded(false);
        }}
      />
    </div>
  );
};

const PersonDetails = () => {
  const { id } = useParams();
  const { data: details, isFetching, isLoading, isError } = useGetPersonDetailsQuery({ id });
  const { data: creditMovie } = useGetCreditMoviesQuery({ personId: id });
  const { data: profiles } = useGetProfileQuery({ id });
  const { data: externalIds } = useGetExternalIDQuery({ id });

  const [profilePath, setProfilePath] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [bioLength, setBioLength] = useState(450);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sortedCreditMovie =
    creditMovie?.cast && [...creditMovie.cast]?.sort((a, b) => b.vote_count - a.vote_count);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("scroll-disabled");
    };
  }, [openModal]);

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

  if (details === undefined) {
    return <NotFound heading="No Data Found" />;
  }

  const onOpenModal = (profilePath) => {
    setProfilePath(profilePath);
    setOpenModal(true);
  };

  return (
    <>
      <ProfileModal profilePath={profilePath} setOpenModal={setOpenModal} openModal={openModal} />
      <Content>
        <section className="mt-16 sm:mt-20 md:mt-32 px-3 sm:px-6 transition-all duration-1000 ease-in">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="min-h-fit w-full sm:w-[340px] md:w-[290px] xl:w-[300px]">
              {details?.profile_path ? (
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details?.profile_path}`}
                  alt={details?.name}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full object-cover rounded-md overflow-hidden ${
                    !imageLoaded && "filter blur-sm"
                  }`}
                />
              ) : (
                <div className="h-[380px] w-[300px] sm:w-[340px] md:w-[290px] xl:w-[300px] rounded-md bg-gray-300 flex items-center justify-center">
                  <IoImageOutline className="text-gray-400 text-2xl" />
                </div>
              )}
              <div className="flex items-center gap-2">
                {externalIds?.facebook_id && (
                  <SocialAccounts
                    url="https://www.facebook.com/"
                    social_id={externalIds?.facebook_id}
                    icon={<CiFacebook />}
                  />
                )}
                {externalIds?.instagram_id && (
                  <SocialAccounts
                    url="https://www.instagram.com/"
                    social_id={externalIds?.instagram_id}
                    icon={<AiOutlineInstagram />}
                  />
                )}
                {externalIds?.twitter_id && (
                  <SocialAccounts
                    url="https://www.twitter.com/"
                    social_id={externalIds?.twitter_id}
                    icon={<FiTwitter />}
                  />
                )}
                {externalIds?.tiktok_id && (
                  <SocialAccounts
                    url="https://www.tiktok.com/"
                    social_id={externalIds?.tiktok_id}
                    icon={<BsTiktok />}
                  />
                )}
                {externalIds?.youtube_id && (
                  <SocialAccounts
                    url="https://www.tiktok.com/"
                    social_id={externalIds?.youtube_id}
                    icon={<AiOutlineYoutube />}
                  />
                )}
              </div>
              <div className="mt-5 sm:mt-7">
                <h2 className="text-xl text-gray-300">Personal Info</h2>
                <div className="grid grid-cols-2 md:grid-cols-1">
                  <Details heading="Known for" details={details?.known_for_department} />
                  <Details heading="Known Credits" details={creditMovie?.cast?.length} />
                  <Details heading="Gender" details={details?.gender === 2 ? "Male" : "Female"} />
                  <Details
                    heading="Birthday"
                    details={details?.birthday}
                    age={new Date().getFullYear() - parseInt(details?.birthday)}
                  />
                  <Details heading="Place of Birth" details={details?.place_of_birth} />
                  <Details heading="Alson Known As" details={details} isRepeated />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[640px] xl:flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold">{details?.name}</h1>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">Biography</h3>
                <p className="text-sm font-light text-gray-300 leading-6 mt-2">
                  {details?.biography.slice(0, bioLength)}
                </p>
                {details?.biography.length >= bioLength && (
                  <>
                    {bioLength === 450 ? (
                      <button
                        className="text-sm text-yellow-500 flex items-center"
                        onClick={() => setBioLength(details?.biography.length)}
                      >
                        Read More <BiChevronRight className="text-2xl" />
                      </button>
                    ) : (
                      <button
                        className="text-sm text-yellow-500 flex items-center"
                        onClick={() => setBioLength(450)}
                      >
                        Read less <BiChevronRight className="text-2xl" />
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="mt-10 max-h-[240px]">
                <h3 className="text-lg font-semibold">Known For</h3>
                {details?.also_known_as.length === 0 ? (
                  <div className="flex justify-center mt-2">
                    <h2 className="text-sm text-gray-400">No data found</h2>
                  </div>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="flex justify-center mt-6">
                        <Oval
                          height={30}
                          width={30}
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
                    ) : (
                      <div className="relative w-full xl:w-[865px] mt-1">
                        <Swiper
                          navigation={{
                            nextEl: ".button-next-slide",
                            prevEl: ".button-prev-slide",
                          }}
                          modules={[Navigation]}
                          slidesPerView={3}
                          spaceBetween={10}
                          breakpoints={{
                            640: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 4,
                            },
                            1024: {
                              slidesPerView: 4,
                            },
                            1280: {
                              slidesPerView: 6,
                            },
                          }}
                          className=""
                        >
                          {sortedCreditMovie?.map((credit, index) => (
                            <SwiperSlide key={index}>
                              <Link
                                to={`/${credit.media_type === "movie" ? "movie" : "tv"}/details/${
                                  credit.id
                                }`}
                              >
                                <Credit {...credit} />
                              </Link>
                            </SwiperSlide>
                          ))}
                          <button className="button-prev-slide hidden sm:inline-block absolute z-10 top-1/3 left-1  bg-action-dark/40 backdrop-blur p-2 rounded-full">
                            <BsChevronLeft className="text-lg" />
                          </button>
                          <button className="button-next-slide hidden sm:inline-block absolute z-10 top-1/3 right-1 bg-action-dark/40 backdrop-blur p-2 rounded-full">
                            <BsChevronRight />
                          </button>
                        </Swiper>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="mt-14">
                <h2 className="text-xl sm:text-3xl text-gray-300 font-semibold pb-4">Profiles</h2>
                {profiles?.profiles?.length !== 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {profiles?.profiles?.map((profile, index) => (
                      <div key={index} className="cursor-pointer">
                        <img
                          src={`https://www.themoviedb.org/t/p/w300${profile.file_path}`}
                          alt=""
                          loading="lazy"
                          onLoad={() => setImageLoaded(true)}
                          onClick={() => onOpenModal(profile.file_path)}
                          className={`rounded-md ${!imageLoaded && "filter blur-sm"}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>No Profiles Added</h1>
                )}
              </div>
            </div>
          </div>
        </section>
      </Content>
    </>
  );
};

export default PersonDetails;
