const Content = ({ children, variant, isSpacerOnly = false }) => {
  let style = "";

  switch (variant) {
    case "primary":
      style = "-mt-[100px] sm:-mt-[400px] lg:-mt-[650px] xl:-mt-[750px]";
      break;
    case "seconday":
      style = "bg-background-dark pt-6 sm:pt-12 pb-28 sm:pb-12";
      break;
  }

  if (isSpacerOnly) {
    return (
      <div className="relative space-y-6 bg-background-dark pb-28 sm:space-y-12 sm:pb-12 sm:mt-16">
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${style} transition-smooth space-y-6 overflow-x-hidden sm:space-y-12 sm:px-0 custom-container`}
    >
      {children}
    </div>
  );
};

export default Content;
