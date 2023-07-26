const FilteringCard = ({ children, heading, subHeading }) => {
  return (
    <div className="bg-action-dark rounded-md w-[260px] md:mt-3 py-2">
      <div className="py-2 px-4">
        <h3>{heading}</h3>
      </div>
      <div className="border-t border-t-gray-600/20" />
      <div className="py-2">
        <h4 className="text-sm px-4 font-light">{subHeading}</h4>
        {children}
      </div>
    </div>
  );
};

export default FilteringCard;
