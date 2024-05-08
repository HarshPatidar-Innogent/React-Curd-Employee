import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UpdateEmployee() {
  const [empId, setEmpId] = useState(0);
  const formItem = {
    margin: "20px",
  };
  const navigate = useNavigate();
  function getEmpId(value) {
    // setEmpId(value.empID);
    // console.log(value.empID);
    navigate(`/updateEmp/${value.empID}`);
  }
  return (
    <div className="container-fluid">
      <h1>Update Employee</h1>
      <Form
        name="Employee"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={getEmpId}
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
            <Button type="primary" htmlType="submit">
              Get
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
