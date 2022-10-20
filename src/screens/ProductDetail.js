import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCart, addCount } from "../redux/action";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const id = useParams();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [count, setCount] = useState(1);
  const url = `https://dummyjson.com/products/${id.id}`;

  const dispatch = useDispatch();
  const addedProducts = useSelector((state) => state.handleCart.cart);


  function AddtoCart(products) {
    products.qty = count;
    console.log(products)
    dispatch(addCount(products));
  }

  function Minus() {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(count);
    }
  }
  function Plus() {
    setCount(count + 1);
  }

  async function fetchProducts() {
    const data = await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });

    setLoading(false);
    // console.log(products);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-2 item-photo">
            <img
              alt=""
              style={{
                objectFit: "contain",
                width: "75%",
                height: "500px",
                borderRadius: "25px",
                overflow: "hidden",
              }}
              src={products.images[activeIndex]}
            />
            <section>
              <div className="col">
                {products.images.map((data) => {
                  return (
                    <div
                      onClick={() => {
                        setActiveIndex(products.images.indexOf(data));
                      }}
                      onMouseOver={() => {
                        setHoverIndex(products.images.indexOf(data));
                        setActiveIndex(products.images.indexOf(data));
                      }}
                      onMouseOut={() => {
                        setHoverIndex(null);
                      }}
                      key={data}
                      className="col-lg-6 col-md-12 mb-4"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "25px",
                          borderRadius: "25px",
                          boxShadow:
                            hoverIndex === products.images.indexOf(data)
                              ? "3px 3px 12px 12px #9E9E9E"
                              : "0px 1px 2px 0px  rgba(60, 64, 67, 0.3)",
                        }}
                      >
                        <img
                          alt=""
                          src={data}
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "contain",
                            margin: "5px",
                            borderRadius: "25px",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div
            className="col-xs-5"
            style={{
              // border: "1px solid gray",
              padding: "10px",
              borderRadius: "10px",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{products.title}</h3>
            <h5 style={{ color: "black" }}>
              Brand:{" "}
              <small style={{ color: "blue", fontSize: "19px" }}>
                {products.brand.toUpperCase()}{" "}
              </small>
              ·{" "}
              <small style={{ color: "black" }}>
                ({products.stock} available)
              </small>
            </h5>
            <h6 className="title-price">
              <small>
                PRICE:{" "}
                <small style={{ color: "GrayText", fontSize: "12px" }}>
                  <s>
                    ₹
                    {Math.trunc(
                      ((products.price * 100) /
                        (100 - products.discountPercentage)) *
                        82.44
                    )}
                  </s>
                </small>
              </small>
            </h6>
            <h3
              style={{
                marginTop: "0px",
              }}
            >
              <small
                style={{
                  color: "goldenrod",
                  fontWeight: "lighter",
                  fontSize: "18px",
                }}
              >
                {products.discountPercentage} %
              </small>{" "}
              ₹{Math.trunc(products.price * 82.44)}{" "}
            </h3>
            <div
              className="section"
              style={{
                paddingBottom: "20px",
                borderRadius: "10px",
                marginLeft: "1px",
              }}
            >
              <h6 className="title-attr">Quantity</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="btn btn-secondary" onClick={Minus}>
                  <FontAwesomeIcon icon={solid("minus")} />
                </div>
                <div
                  style={{
                    paddingTop: "3px",
                    border: "1px solid black",
                    fontSize: "20px",
                    textAlign: "center",
                    height: "40px",
                    width: "60px",
                    borderRadius: "6px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {count}
                </div>
                <div className="btn btn-primary" onClick={Plus}>
                  <FontAwesomeIcon icon={solid("plus")} />
                </div>
              </div>
            </div>
            <div
              className="section"
              style={{
                paddingBottom: "20px",
                marginLeft: "1px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-success"
                onClick={() => AddtoCart(products)}
              >
                Add to Cart <FontAwesomeIcon icon={solid("cart-shopping")} />
              </button>
            </div>
          </div>
          <div
            className="col-xs-9"
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
          >
            <h5 className="title-attr">Product Details:</h5>
            <div
              style={{
                borderBottom: "15px",
                width: "100%",
                borderColor: "silver",
              }}
            >
              <p style={{ padding: "15px" }}>
                <small>{products.description}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
