import { useEffect } from "react";
import Content from "./content/Content";

const NotFound = ({ heading }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Content>
      <section className="mt-16 sm:mt-20 md:mt-32 px-3 sm:px-6 transition-all duration-1000 ease-in">
        <div className="flex flex-col justify-center items-center h-[420px]">
          <img src="/notfound.png" className="w-[250px] object-contain" />
          <h1 className="text-2xl text-gray-400 font-extrabold">{heading || "Not Found"}</h1>
        </div>
      </section>
    </Content>
  );
};

export default NotFound;
