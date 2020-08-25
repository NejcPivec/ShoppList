import React, { useState, useContext, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";

export const ItemForm = () => {
  const itemContext = useContext(ItemContext);

  const { addItem, current, clearCurrent, updateItem } = itemContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        item1: "",
        quantity: "",
        type: "ordinary"
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    item1: "",
    quantity: "1",
    type: "ordinary"
  });

  // destruc
  const { item1, quantity, type } = item;

  const onChange = e =>
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addItem(item); // funkcija v ItemState
    } else {
      updateItem(item);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit Item" : "Add Item"}</h2>
      <input
        type="text"
        name="item1"
        placeholder="Item..."
        value={item1}
        onChange={onChange}
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity..."
        value={quantity}
        onChange={onChange}
      />
      <h5>Item Type:</h5>
      <input
        type="radio"
        name="type"
        value="ordinary"
        checked={type === "ordinary"}
        onChange={onChange}
      />
      Ordinary{" "}
      <input
        type="radio"
        name="type"
        value="favorite"
        checked={type === "favorite"}
        onChange={onChange}
      />
      Favorite
      <div>
        <input
          type="submit"
          value={current ? "Edit Item" : "Add Item"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ItemForm;
