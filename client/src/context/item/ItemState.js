import React, { useReducer } from "react";
import axios from "axios";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import {
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  GET_ITEMS,
  CLEAR_ITEMS
  //CHECKED_ITEM
} from "../types";

// initial state
const ItemState = props => {
  const initialState = {
    items: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  /* All Actions */
  // Get items
  const getItems = async () => {
    try {
      const res = await axios.get("api/items");

      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Item
  const addItem = async item => {
    // create headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/items", item, config);

      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Item
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`);
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Check Picked Item
  const checkedItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`);

      setTimeout(() => {
        dispatch({
          type: DELETE_ITEM,
          payload: id
        });
      }, 3600000); // 1h
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Item
  const setCurrent = item => {
    dispatch({
      type: SET_CURRENT,
      payload: item
    });
  };

  // Clear Current Item
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // update Item
  const updateItem = async item => {
    // create headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Filter Items
  const filterItems = text => {
    dispatch({
      type: FILTER_ITEMS,
      payload: text
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  // Clear Items
  const clearItems = () => {
    dispatch({
      type: CLEAR_ITEMS
    });
  };

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        checkedItem
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
