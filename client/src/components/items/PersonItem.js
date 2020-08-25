import React, { useContext } from "react";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/itemContext";

export const PersonItem = ({ item }) => {
  const itemContext = useContext(ItemContext);
  // destruct
  const { _id, item1, quantity, type } = item;

  const { deleteItem, setCurrent, clearCurrent, checkedItem } = itemContext;

  const onDelete = () => {
    deleteItem(_id);
    clearCurrent();
  };

  const onCheck = e => {
    if (type === "favorite") {
      //console.log(e.target.parentNode.parentNode.parentNode);
      // Kliknemo na gumb in poiščemo starša - card - ter mu dodamo nov razred
      e.target.parentNode.parentNode.parentNode.classList.add("btn-item-check");
      console.log(e.target.parentNode.parentNode.parentNode);

      console.log(document.querySelector(".btn-item-check"));

      // nov dodan razred ostranimo po 1 uri
      setTimeout(() => {
        document
          .querySelector(".btn-item-check")
          .classList.remove("btn-item-check");
      }, 300000); //3600000
    } else {
      e.target.parentNode.parentNode.parentNode.classList.add("btn-item-check");
      checkedItem(_id);
    }
  };

  return (
    <div className="card bg-light">
      <h1 className="text-primary text-left">
        {item1.charAt(0).toUpperCase() + item1.slice(1)}{" "}
        <span
          className={
            "badge " + (type === "favorite" ? "badge-success" : "badge-light")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
          {/* da je prva črka z veliko začetnico */}
        </span>
        {/* @todo- naj gumb za kupljen izdelek deluje */}
        <button className="btn-checked" onClick={onCheck}>
          <i className="fas fa-check-circle fa-4x"></i>
        </button>
      </h1>

      <ul className="list">
        {quantity === "" ? <li>Quantity: /</li> : <li>Quantity: {quantity}</li>}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(item)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

PersonItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default PersonItem;
