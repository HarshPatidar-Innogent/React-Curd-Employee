import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Form, Input, Space, notification } from "antd";
import { Modal } from "antd";

export function UpdateEmpDetails({ visible, onCancel, empId }) {
  const { id } = useParams();
  const setValueRef = useRef();

  const [emp, setEmp] = useState();

  const formItem = {
    margin: "20px",
  };

  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Employee Updated Successfully",
    });
  };

  function getEmployee(ID) {
    axios
      .get(`http://localhost:8080/get/id/${empId}`, {
        validateStatus: function (status) {
          return status < 500;
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setEmp(data);
        form.setFieldsValue(data);
      })
      .catch((error) => console.log(error));
  }

  console.log(empId);
  // useEffect(() => {
  //   getEmployee(empId);
  // }, [empId]);

  useEffect(() => {
    setValueRef.current = () => {
      getEmployee(empId);
    };
  }, [empId]);

  useEffect(() => {
    if (setValueRef.current) {
      setValueRef.current();
    }
  }, [empId]);

  const formStyle = {
    padding: "20px",
    border: "none",
  };

  // const [newEmp, setNewEmp] = useState();
  function updateEmp(value) {
    axios
      .put(`http://localhost:8080/update/${empId}`, value)
      .then((response) => response.data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    openNotificationWithIcon("success");
  }

  return (
    <Modal
      title="Update Employee"
      open={visible}
      footer={(_, {}) => (
        <>
          <Button onClick={onCancel}>Close</Button>
        </>
      )}
      onCancel={onCancel}
    >
      {" "}
      {contextHolder}
      <div className="container-fluid">
        <Form
          style={formStyle}
          form={form}
          name="Employee"
          onFinish={updateEmp}
        >
          <h2>Update Details of Employee {id}</h2>
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
