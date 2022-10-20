import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Loader from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://dummyjson.com/products";

  const dispatch = useDispatch();
  const addProduct = (products) => {
    dispatch(addCart(products));
  };

  async function fetchProducts() {
    const data = await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        // console.log(res.products);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const productlist = products.map((data) => {
    return (
      <div className="col-md" key={data.id}>
        <div className="card h-100" style={{
          padding: 10
        }}>
          <img
            src={data.images[data.images.length - 1]}
            className="card-img h-100"
            style={{
              objectFit: "contain",
            }}
            alt={data.images[0]}
          />
          <div className="row gx-5 row-cols-2 card-body">
            <h5 className="card-title">{data.title}</h5>
            <h6>₹ {Math.trunc(data.price * 82.44)}</h6>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              to={{
                pathname: `/details/${data.id}`,
              }}
              className=" button btn btn-outline-primary"
              style={{
                height: "40px",
                width: "40%",
                marginBottom: "10px",
                margin: "10px",
              }}
            >
              <div>
                <FontAwesomeIcon icon={solid("eye")} />
              </div>
            </Link>
            <div
              className=" button btn btn-outline-success"
              style={{
                height: "40px",
                width: "40%",
                marginBottom: "10px",
                margin: "10px",
              }}
              onClick={() => {
                addProduct(products[products.indexOf(data)]);
              }}
            >
              <FontAwesomeIcon icon={solid("cart-shopping")} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div
        className="row row-cols-3 row-cols-md-4 g-4"
        style={{
          margin: "10px",
        }}
      >
        {productlist}
      </div>
    );
  }
}
