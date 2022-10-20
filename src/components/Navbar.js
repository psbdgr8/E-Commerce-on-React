import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  var count = 0;
  const products = useSelector((state) => state.handleCart.cart);

  for (var i = 0; i < products.length; i++) {
    count += products[i].qty;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm fluid">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Collections
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link> */}
            </li>
          </ul>
          <div className="button">
            <Link
              to="/cart"
              className="btn btn-outline-dark"
              style={{ paddingRight: "15px", paddingLeft: "15px" }}
            >
              <FontAwesomeIcon icon={solid("cart-shopping")} className="me-2" />
              Cart ({count})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
