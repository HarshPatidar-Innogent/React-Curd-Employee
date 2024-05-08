import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { Col, Divider, Row } from "antd";
import { Button } from "antd";
import { Flex, Slider, Switch, Typography } from "antd";

const { Meta } = Card;

export function FakestoreAntd() {
  const [product, setProduct] = useState([]);
  function getProduct() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => response.data)
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => getProduct(), []);
  console.log(product);

  return (
    <div>
      <Row gutter={16}>
        {product.map((item) => (
          <Col className="gutter-row " span={6}>
            <Card
              hoverable
              style={{
                width: 240,
                padding: 20,
              }}
              cover={<img alt={item.title} src={item.image} />}
              actions={[
                <Button type="primary" shape="round">
                  $ {item.price}
                </Button>,
              ]}
            >
              <Meta title={item.title} />
              <Typography.Paragraph className="mt-5">
                {item.description}
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
