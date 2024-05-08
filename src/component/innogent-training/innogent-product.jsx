import React from "react";
import { Carousel } from "antd";
import { Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Divider } from "antd";
import {
  StarFilled,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

const { Text, Link } = Typography;
const { Title } = Typography;
const body = {
  backgroundColor: "orange",
  backgroundSize: "cover",
  color: "white",
};
const mainComponent = {
  padding: "20px",
};
const image = {
  width: "50%",
  maxHeight: "cover",
};
const mainFont = {
  fontWeight: "bold",
  color: "purple",
};
const button = {};
export function Product() {
  const product = useSelector((state) => state.product.value);
  return (
    <div className="flex-wrap m-4" style={body}>
      <div className="row" style={mainComponent}>
        <div className="col-5" style={image}>
          <div>
            <Carousel autoplay>
              {product.images.map((image) => (
                <div>
                  <img src={image} alt="" />
                </div>
              ))}
            </Carousel>
            <div className="justify-content-between">
              <Button>
                <CaretLeftOutlined />
              </Button>
              <Button>
                <CaretRightOutlined />
              </Button>
            </div>
          </div>
        </div>
        {/* <Divider type="vertical" orientation="center" /> */}
        <div className="col-5">
          <Title level={1} style={mainFont}>
            {product.title}
          </Title>
          <Text strong>
            <Title level={3}>{product.brand}</Title>
          </Text>

          <Title level={4}>{product.description}</Title>
          <Title strong level={5}>
            Discount:
            <Button type="primary" danger className="m-2">
              {product.discountPercentage}% Off
            </Button>
          </Title>
          <Title level={3}>Price: $ {product.price}</Title>
          <Title level={4}>
            Rating: {product.rating}
            <StarFilled />
          </Title>
        </div>
      </div>
    </div>
  );
}
