import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import axios from "axios";

export function DeleteEmployee() {
  const formItem = {
    margin: "20px",
  };
  const [empId, setEmpId] = useState(0);
  function handleSubmit(value) {
    console.log(value);
    setEmpId(value);
  }
  function deleteEmp(empId) {
    axios
      .delete(`http://localhost:8080/delete/${empId.empID}`, {
        validateStatus: function (status) {
          return status < 500;
        },
      })
      .then((respone) => {
        console.log(respone);
        alert("Employee Deleted");
      })
      .catch((error) => {
        console.log(error);
        alert("Employee Not Found");
      });
  }
  useEffect(() => {
    deleteEmp(empId);
  }, [empId]);

  return (
    <div className="container-fluid">
      <Form
        name="Employee"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          style={formItem}
          label="Employee Id"
          name="empID"
          rules={[
            {
              required: true,
              message: "Please input valid Employee ID eg:1001",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center", margin: "20px" }}>
          <Space>
            <Button type="primary" danger htmlType="submit">
              Delete
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
