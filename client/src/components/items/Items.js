import React, { useContext, Fragment, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";
import PersonItem from "./PersonItem";
import Spinner from "../layout/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Items = () => {
  // init Context
  const itemContext = useContext(ItemContext);

  // destruct
  const { items, filtered, getItems, loading } = itemContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  // if there are no items
  if (items !== null && items.length === 0 && !loading) {
    return <h4>Please add an Item</h4>;
  }

  return (
    <Fragment>
      {items !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(item => (
                <CSSTransition key={item._id} timeout={500} classNames="item">
                  <PersonItem item={item} />
                </CSSTransition>
              ))
            : items.map(item => (
                <CSSTransition key={item._id} timeout={500} classNames="item">
                  <PersonItem item={item} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Items;
