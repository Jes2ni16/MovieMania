const Grid = ({ children, variant, gap }) => {
  if (variant === "primary") {
    return <div className={`grid md:grid-flow-col gap-${gap}`}>{children}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">{children}</div>
  );
};

export default Grid;
