import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Section = ({ children, heading, scrollLeft, scrollRight }) => {
  return (
    <section className="md:pl-6 px-2 md:pt-14 xl:ml-28 2xl:ml-28">
      <div className="flex justify-between items-center mb-3 sm:mb-5 mt-10">
        <h1 className="text-xl sm:text-3xl font-bold capitalize">{heading}</h1>
        <div className="hidden sm:flex items-center justify-center gap-2 md:mr-4 2xl:mr-32">
          <div
            onClick={scrollLeft}
            className="bg-gray-300/10 hover:bg-gray-300/5 transition-colors duration-300 cursor-pointer p-2 rounded-full"
          >
            <FaChevronLeft className="text-lg" />
          </div>
          <div
            onClick={scrollRight}
            className="bg-gray-300/10 hover:bg-gray-300/5 transition-colors duration-300 cursor-pointer p-2 rounded-full"
          >
            <FaChevronRight className="text-lg" />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};

export default Section;
