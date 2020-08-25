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
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          // regular expresion
          const regex = new RegExp(`${action.payload}`, "gi"); // gi- global insensitive
          return item.item1.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
        filtered: null,
        error: null,
        current: null
      };
    default:
      return state;
  }
};
