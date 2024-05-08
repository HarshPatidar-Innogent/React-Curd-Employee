import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "antd";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
} from "react-router-dom";
import { Product } from "./innogent-product";
import { useSelector, useDispatch } from "react-redux";
import { changeProduct } from "./Product/productSlice";

const { Meta } = Card;

export function Display() {
  const [data, setData] = useState([{}]);
  function getData() {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => response.data)
      .then((data) => setData(data.products))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  const product = useSelector((state) => state.product.value);

  const dispatch = useDispatch();

  const bodyBg = {
    backgroundColor: "#002D04",
  };

  const card = {
    maxHeight: "500px",
    width: 250,
    transition: "box-shadow 0.6s ease-out",
    boxShadow: "0.8px 0.9px 3px white",
  };

  const cardImg = {
    backgroundImage: "cover",
    maxHeight: "200px",
    minHeight: "200px",
  };

  const cardDes = {
    // maxHeight: "100px",
    // minHeight: "100px",
  };

  return (
    <div>
      <h1
        style={{ backgroundColor: "#1B1212", padding: "5px", color: "white" }}
        className="text-center"
      >
        Raste Ka Mal Saste Me
      </h1>
      <div className="row row-cols-3 g-3" style={bodyBg}>
        {data.map((item) => (
          <Link
            to={{
              pathname: `/product/${item.id}`,
              // pathname: `/product/`,
            }}
            style={{
              textDecoration: "none",
              border: "2px solid #FFFF33",
              maxHeight: "500px",
              width: "250px",
              margin: "100px",
            }}
            onClick={() => dispatch(changeProduct(item))}
          >
            <Card
              key={item.id}
              className="m-3 col-3"
              hoverable
              style={card}
              cover={
                <img style={cardImg} alt={item.title} src={item.thumbnail} />
              }
            >
              <h4>{item.brand}</h4>
              <Meta
                style={cardDes}
                title={item.title}
                description={item.description}
              />
              <br />
              <button className="btn btn-primary">${item.price}</button>
              <br />
              <br />
              <p className="btn btn-warning">Rating: {item.rating}*</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
