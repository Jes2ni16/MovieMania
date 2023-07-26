import { useState } from "react";

const useSelection = (initialState) => {
  const [selection, setSelection] = useState(initialState);

  const handleSelection = (itemId) => {
    setSelection((prevSelection) =>
      prevSelection.includes(itemId) ? prevSelection.filter((id) => id !== itemId) : [...prevSelection, itemId]
    );
  };

  const resetSelection = () => {
    setSelection([]);
  };

  return [selection, handleSelection, resetSelection];
};

export default useSelection;
