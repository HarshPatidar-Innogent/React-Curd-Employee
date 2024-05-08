import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "antd";
import { Card } from "antd";

export function EmpDetails({ visible, onCancel, data }) {
  const { id } = useParams();
  const [emp, setEmp] = useState({});
  const [open, setOpen] = useState(false);
  const setValueRef = useRef();

  function getEmployee(ID) {
    axios
      .get(`http://localhost:8080/get/id/${ID}`, {
        validateStatus: function (status) {
          return status < 500;
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setEmp(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    setValueRef.current = () => {
      getEmployee(data);
    };
  }, [data]);

  useEffect(() => {
    if (setValueRef.current) {
      setValueRef.current();
    }
  }, [data]);

  console.log(data);

  return (
    <Modal
      title="Employee Details"
      open={visible}
      footer={(_, {}) => (
        <>
          <Button onClick={onCancel}>Close</Button>
        </>
      )}
      onCancel={onCancel}
      style={{ width: 500 }}
    >
      <Card
        hoverable
        style={{ width: 450 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <div>
          <br />
          <h5>Employee ID: {emp.empId}</h5>
          <h5>Employee Name: {emp.empName}</h5>
          <h5>Employee Salary: {emp.sal}</h5>
          <h5>Employee Job: {emp.job}</h5>
          <h5>Employee Address: {emp.address}</h5>
        </div>
      </Card>
    </Modal>
  );
}
