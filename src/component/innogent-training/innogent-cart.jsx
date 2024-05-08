import { useSelector, useDispatch } from "react-redux";
import { changeProduct } from "./Product/productSlice";
import { Button, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export function Cart() {
  const cart = useSelector((state) => state.product.cart);

  console.log(cart);

  let totalPrice = 0;
  cart.map(
    (item) =>
      (totalPrice += item.price - item.price * (item.discountPercentage / 100))
  );

  let index = 0;

  console.log(totalPrice);
  return (
    <div>
      <Title level={2} style={{ textAlign: "center" }}>
        Cart
      </Title>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr>
                <td>{++i}</td>
                <td>
                  <Avatar size={35} src={item.thumbnail} />
                </td>
                <td>{item.title}</td>
                <td>
                  ${item.price - item.price * (item.discountPercentage / 100)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ textAlign: "right", margin: "20px" }}>
          Total: ${totalPrice}
        </h2>
        <Button type="primary" danger onClick={() => window.location.reload()}>
          Empty Cart
        </Button>
      </div>
    </div>
  );
}
