import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
// import { Carousel } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { Divider } from "antd";
import { Typography } from "antd";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { productCart } from "./Product/productSlice";

const { Text, Title } = Typography;

export function Product2(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.product.cart);
  const navigate = useNavigate();

  console.log(cart);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  async function getData(id) {
    await axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => response.data)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getData(id);
    return;
  }, [id]);
  console.log(product);
  const contentStyle = {
    height: "530px",
    color: "#fff",
    lineHeight: "260px",
    textAlign: "center",
    background: "#364d79",
    margin: "20px",
    borderRadius: "20px",
  };
  const images = {
    width: "100%",
    margin: "auto",
    height: "100%",
    minHeight: "530px",
    maxHeight: "530px",
    objectFit: "fill",
    borderRadius: "15px 15px 0 0",
  };

  const finalPrice =
    product.price - product.price * (product.discountPercentage / 100);
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-6">
            <h1 className="display-1 mb-4 m-4">{product?.brand}</h1>
            {/* <Carousel autoplay style={contentStyle}>
              {product?.images?.map((image) => (
                <div className="justify-content-center">
                  <img src={image} alt="" style={images} />
                </div>
              ))}
            </Carousel> */}
            <Carousel style={contentStyle}>
              {product?.images?.map((image) => (
                <Carousel.Item>
                  <div className="justify-content-center">
                    <img src={image} alt="" style={images} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-6" style={{ marginTop: "150px" }}>
            <Title level={1}>{product.title}</Title>
            <Divider style={{ height: "20px" }} />
            <Title level={4}>{product.description}</Title>
            <Divider style={{ height: "20px" }} />
            <Title delete level={4}>
              $ {product.price}
            </Title>
            <Title type="danger" level={4}>
              -{product.discountPercentage}% Off
            </Title>
            <Title level={4}>$ {finalPrice}</Title>
            <Title level={5}>
              Inclusive of all taxes EMI starts at ₹7,219. No Cost EMI available{" "}
            </Title>
            <Divider style={{ height: "20px" }} />

            <Button
              type="primary"
              shape="round"
              icon={<ShoppingCartOutlined />}
              size={10}
              danger
              style={{ margin: "20px" }}
              onClick={() => {
                dispatch(productCart(product));
                navigate("/product/cart");
              }}
            >
              Add to Cart
            </Button>
            <Button type="primary" shape="round" size={10}>
              But Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
