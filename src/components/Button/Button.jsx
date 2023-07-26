const Button = ({ children, handleClick }) => {
  return (
    <button onClick={handleClick} className="bg-[#FFC54E] w-full sm:w-1/2 xl:w-1/3 rounded-md py-2 mt-7 text-center">
      {children}
    </button>
  );
};

export default Button;
