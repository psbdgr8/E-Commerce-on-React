import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../components/Loader";
import { delCart, addCart, remCart } from "../redux/action";

export default function Cart() {
  const dispatch = useDispatch();
  const delProduct = (products) => {
    dispatch(delCart(products));
  };
  const addProduct = (products) => {
    dispatch(addCart(products));
  };
  const removeProduct = (products) => {
    dispatch(remCart(products));
  };

  const products = useSelector((state) => state.handleCart.cart);
  const total = useSelector((state) => state.handleCart.total);
  const shipping = total < 1 ? 0 : 50;
  console.log(products);

  const CartList = products.map((data) => {
    return (
      <tr key={data.id}>
        <th scope="row" className="border-bottom-0">
          <div className="d-flex align-items-center">
            <div
              style={{
                border: "0.2px  solid gray",
                padding: "5px",
                borderRadius: "15px",
              }}
            >
              <img
                src={data.images[data.images.length - 1]}
                className="img-fluid rounded-3"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "15px",
                  objectFit: "contain",
                }}
                alt="Book"
              />
            </div>
            <div className="flex-column ms-4">
              <p
                style={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: "inherit",
                }}
                className="mb-2"
              >
                {data.title}
              </p>
              <p
                style={{
                  color: "GrayText",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Brand: {data.brand.toUpperCase()}
              </p>
            </div>
          </div>
        </th>
        <td className="align-middle border-bottom-0">
          <p
            className="mb-0"
            style={{
              fontWeight: "inherit",
            }}
          >
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </p>
        </td>
        <td className="align-middle border-bottom-0">
          <div className="d-flex flex-row">
            <button
              className="btn btn-link px-2"
              onClick={() => {
                delProduct(products[products.indexOf(data)]);
              }}
            >
              <FontAwesomeIcon icon={solid("minus")} />
            </button>

            <div
              className="form-control form-control-sm"
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data.qty}
            </div>

            <button
              className="btn btn-link px-2"
              onClick={() => {
                addProduct(products[products.indexOf(data)]);
              }}
            >
              <FontAwesomeIcon icon={solid("plus")} />
            </button>
          </div>
        </td>
        <td className="align-middle border-bottom-0">
          <p
            className="mb-0"
            style={{
              fontWeight: "inherit",
            }}
          >
            ₹{Math.trunc(data.price * 82.44)}{" "}
          </p>
        </td>
        <div
          onClick={() => {
            removeProduct(products[products.indexOf(data)]);
          }}
        >
          <FontAwesomeIcon
            className="btn"
            style={{
              marginLeft: "-60px",
              marginBottom: "-105px",
            }}
            icon={solid("trash")}
          />
        </div>
      </tr>
    );
  });

  return (
    <section className="h-100 h-custom">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Cart Items</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length < 1 ? (
                    <tr>
                      <th>
                        <div className="text-center"
                        >
                          <Link to={"/"}>
                            <div style={{ fontWeight: "normal" }}>
                              Your cart is empty shop now.
                            </div>
                          </Link>
                        </div>
                      </th>
                    </tr>
                  ) : (
                    CartList
                  )}
                </tbody>
              </table>
            </div>
            <div className="card text-center">
              <div className="card-body">
                <div className="">
                  <div
                    className="d-flex justify-content-evenly"
                    style={{
                      fontWeight: "inherit",
                    }}
                  >
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">₹{Math.trunc(total * 82.44)}</p>
                  </div>
                  <div
                    className="d-flex justify-content-evenly"
                    style={{
                      fontWeight: "inherit",
                    }}
                  >
                    <p className="mb-0">Shipping</p>
                    <p style={{marginLeft: 24}}>+ ₹{shipping}</p>
                  </div>

                  <hr className="my-4" />

                  <div
                    className="d-flex justify-content-evenly mb-4"
                    style={{
                      fontWeight: "inherit",
                    }}
                  >
                    <p className="mb-2">Total</p>
                    <p className="mb-2">
                      ₹{Math.trunc(total * 82.44) + shipping}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                  >
                    <div className="d-flex">
                      <span>Buy Now</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
