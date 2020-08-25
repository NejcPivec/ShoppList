import React, { useContext, useRef, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";

export const ItemFilter = () => {
  const itemContext = useContext(ItemContext);

  const { filterItems, clearFilter, filtered } = itemContext;

  // init ref value
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      // get value in input
      filterItems(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Items..."
        onChange={onChange}
      />
    </form>
  );
};

export default ItemFilter;
