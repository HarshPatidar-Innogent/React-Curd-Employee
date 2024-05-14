import axios from "axios";
import { useEffect, useState } from "react";
import AddEmployee from "./new.employee";
import { Button, Space, ConfigProvider, theme, notification } from "antd";
import { UpdateEmpDetails } from "./updateEmp";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { EmpDetails } from "./employee.details";
import { Typography } from "antd";
import { render } from "@testing-library/react";

const { Title } = Typography;

export function Employee() {
  const [emp, setEmp] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(undefined);
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const pagination = {
    pageSize: 9,
    total: emp.length,
    onChange: (page, pageSize) => {
      console.log("Page:", page, "Page Size:", pageSize);
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "empId",
      key: "empId",
      sorter: {
        compare: (a, b) => a.empId - b.empId,
      },
      onCell: (record) => {
        return {
          onClick: (_event) => {
            // navigate(`/empDetails/${record.empId}`);
            setDetailsVisible(true);
            setId(record.empId);
          },
        };
      },
    },
    {
      title: "Name",
      dataIndex: "empName",
      key: "empName",
      sorter: {
        compare: (a, b) => a.empName - b.empName,
      },
      onCell: (record) => {
        return {
          onClick: (event) => {
            // navigate(`/empDetails/${record.empId}`);
            setDetailsVisible(true);
            setId(record.empId);
          },
        };
      },
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      onCell: (record) => {
        return {
          onClick: (event) => {
            // navigate(`/empDetails/${record.empId}`);
            setDetailsVisible(true);
            setId(record.empId);
          },
        };
      },
    },
    {
      title: "Salary",
      dataIndex: "sal",
      key: "sal",
      sorter: {
        compare: (a, b) => a.sal - b.sal,
      },
      onCell: (record) => {
        return {
          onClick: (event) => {
            // navigate(`/empDetails/${record.empId}`);
            setDetailsVisible(true);
            setId(record.empId);
          },
        };
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      onCell: (record) => {
        return {
          onClick: (event) => {
            // navigate(`/empDetails/${record.empId}`);
            setDetailsVisible(true);
            setId(record.empId);
          },
        };
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => {
              DeleteEmployee(record.empId);
              openNotificationWithIcon(
                "success",
                `Employee Deleted Successfully`
              );
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              // setUpdateVisible(true);
              handleEdit(record.empId);
            }}
          >
            Edit
          </Button>
          {/* {selectedEmpId === record.empId && (
            <UpdateEmpDetails
              visible={updateVisible}
              onCancel={handleCancel}
              empId={selectedEmpId}
            />
          )} */}
        </Space>
      ),
    },
  ];

  const handleEdit = (empId) => {
    setUpdateVisible(true);
    setSelectedEmpId(empId);
  };
  function handleCancel() {
    setUpdateVisible(false);
    setSelectedEmpId(null);
    window.location.reload();
  }
  async function getEmp() {
    const customAxios = axios.create({
      baseURL: "http://localhost:8080",
    });
    await customAxios
      .get("http://localhost:8080/get/all", {
        validateStatus: function (status) {
          return true;
        },
      })
      .then((response) => response.data)
      .then((data) => setEmp(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getEmp();
  }, []);

  function DeleteEmployee(empId) {
    console.log(empId);
    axios
      .delete(`http://localhost:8080/delete/${empId}`, {
        validateStatus: function (status) {
          return status < 500;
        },
      })
      .then((respone) => {
        console.log(respone);
      })
      .catch((error) => {
        console.log(error);
      });

    setEmp(emp.filter((emp) => emp.empId !== empId));

    // window.location.reload();
  }

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,
        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        components: {
          Table: {},
        },
      }}
    >
      {contextHolder}

      <div className="m-3 mt-3 p-3" style={{ backgroundColor: "black" }}>
        <Title
          level={2}
          className="d-flex justify-content-center align-items-center"
        >
          Employee Records
        </Title>

        <Button
          type="primary"
          onClick={() => setVisible(true)}
          className="mb-4 d-flex justify-content-center align-items-center"
        >
          Add Employee
        </Button>
        <AddEmployee
          visible={visible}
          onCancel={() => (setVisible(false), window.location.reload())}
        />
        <Table
          dataSource={emp}
          columns={columns}
          borderColor="black"
          pagination={pagination}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       // navigate(`/empDetails/${record.empId}`);
          //       setDetailsVisible(true);
          //       setId(record.empId);
          //     },
          //   };
          // }}
        />
        <EmpDetails
          visible={detailsVisible}
          onCancel={() => setDetailsVisible(false)}
          onClose={() => setDetailsVisible(false)}
          data={id}
        />
        {updateVisible && (
          <UpdateEmpDetails
            visible={updateVisible}
            onCancel={() => handleCancel()}
            empId={selectedEmpId}
          />
        )}
      </div>
    </ConfigProvider>
  );
}
