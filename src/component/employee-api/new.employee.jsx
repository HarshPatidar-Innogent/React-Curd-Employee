import React, { useState } from "react";
import { Button, Form, Input, Space, notification } from "antd";
import axios from "axios";
import { Modal } from "antd";

export default function AddEmployee({ visible, onCancel }) {
  const [emp, setEmp] = useState({});
  const [form] = Form.useForm();
  const formItem = {
    margin: "20px",
    padding: "2px",
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Employee Added",
    });
  };

  function handleSubmit(values) {
    setEmp(values);
    addEmployee(values);
    form.resetFields();
  }
  function addEmployee(emp) {
    axios
      .post("http://localhost:8080/add", emp)
      .then((response) => response.data)
      .then((d) => {
        console.log(d);
        setEmp(...emp, d);
      })
      .catch((error) => console.log(error));
    openNotificationWithIcon("success");
  }

  // useEffect(() => {
  //   addEmployee(emp);
  //   return;
  // }, []);

  return (
    <Modal
      title="Add Employee"
      open={visible}
      footer={(_, {}) => (
        <>
          <Button onClick={onCancel}>Close</Button>
        </>
      )}
      onCancel={onCancel}
    >
      {contextHolder}
      <div className="container-fluid">
        <Form
          form={form}
          name="Employee"
          style={{
            maxWidth: 600,
            border: "none",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            style={formItem}
            label="Name"
            name="empName"
            rules={[
              {
                required: true,
                message: "Please input valid Employee Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={formItem}
            label="Job"
            name="job"
            rules={[
              {
                required: true,
                message: "Please input valid Job Title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={formItem}
            label="Salary"
            name="sal"
            rules={[
              {
                required: true,
                message: "Please input valid Salary Eg:10000.0",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            style={formItem}
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input valid Address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
