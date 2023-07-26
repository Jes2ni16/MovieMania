import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCameraVideoOff } from "react-icons/bs";
import { useGetVideoQuery } from "../services/api";
import { useFilterVideo } from "../hooks/useFilterVideo";

import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ media, setModalOpen, openModal, isVideo, videoKey }) => {
  const cancelButtonRef = useRef(null);
  const videoRef = useRef(null);
  const type = media?.media_type || isVideo;
  const id = media?.id;
  const { data, isFetching } = useGetVideoQuery(
    { type, id, original_language: media?.original_language },
    { skip: !openModal }
  );
  const { video } = useFilterVideo(data);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.src = "";
    }
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex sm:min-h-full items-end justify-center px-1.5 py-4 text-center sm:items-center sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-background-dark text-left shadow-xl transition-all sm:my-8 w-full h-[310px] sm:h-[560px] sm:w-[900px] xl:w-full xl:max-w-[970px] md:h-[608px]">
                <div className="bg-background-dark">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mt-2">
                        {openModal && (
                          <>
                            {!isFetching && (
                              <>
                                {video !== undefined ? (
                                  <iframe
                                    ref={videoRef}
                                    src={`https://www.youtube.com/embed/${
                                      !videoKey ? video?.key : videoKey
                                    }`}
                                    title="Playback"
                                    className="w-full h-[300px] sm:h-[550px] md:w-full xl:md:w-[970px] md:h-[600px] object-cover brightness-110"
                                  ></iframe>
                                ) : (
                                  <div className="flex justify-center items-center sm:h-[480px]">
                                    <div className="flex flex-col items-center gap-2">
                                      <BsCameraVideoOff className="text-2xl text-gray-400" />
                                      <h1 className="text-xl text-gray-400 font-semibold">
                                        No video
                                      </h1>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <AiOutlineClose
                  onClick={() => {
                    setModalOpen(false);
                    handlePlayVideo();
                  }}
                  size="30px"
                  className="cursor-pointer absolute hidden sm:block top-1 right-1 bg-neutral-900 rounded-md p-1"
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
