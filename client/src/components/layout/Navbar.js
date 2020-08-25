import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ItemContext from "../../context/item/itemContext";

export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearItems } = itemContext;

  const onLogout = () => {
    logout();
    clearItems();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li> {/* check if there is a user first */}
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

// Pravila: kakšna morata biti naslov in icona
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

// defaultni naslov in ikona, če nista podana drugače
Navbar.defaultProps = {
  title: "ShoppList",
  icon: "fas fa-shopping-cart"
};

export default Navbar;
