import { useEffect, useState } from "react";

export const useLogoFilter = (data, iso_639_1) => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    const logo = data?.logos?.find(
      (logo) => logo.iso_639_1 === "en" || logo.iso_639_1 === null || logo.iso_639_1 === iso_639_1
    );
    setLogo(logo);
  }, [data, iso_639_1]);

  return {
    logo,
  };
};
