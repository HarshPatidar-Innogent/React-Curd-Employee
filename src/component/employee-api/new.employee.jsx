import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Space, notification, Select, Option } from "antd";
import axios from "axios";
import { Modal } from "antd";

export default function AddEmployee({ visible, onCancel }) {
  const { Option } = Select;

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
    console.log(values);
    form.resetFields();
  }
  function addEmployee(emp) {
    axios
      .post("http://localhost:8080/addAllDetails", emp)
      .then((response) => response.data)
      .then((d) => {
        // console.log(d);
        setEmp(...emp, d);
      })
      .catch((error) => console.log(error));
    openNotificationWithIcon("success");
  }

  // useEffect(() => {
  //   addEmployee(emp);
  //   return;
  // }, []);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectCountry, setSelectedCountry] = useState("");
  const [selectState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const setValueRef = useRef();

  // async function fetchCountries() {
  //   await axios
  //     .get("https://restcountries.com/v3.1/all")
  //     .then((response) => response.data)
  //     .then((countries) => setCountries(countries), console.log(countries))
  //     .catch((error) => console.log(error));
  // }
  // useEffect(() => {
  //   fetchCountries();
  // }, []);

  async function fetchCountries() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  // useEffect(() => {
  //   fetchStates();
  // }, [selectCountry]);

  useEffect(() => {
    setValueRef.current = () => {
      fetchStates();
      fetchCities();
    };
  }, [selectCountry]);

  useEffect(() => {
    if (setValueRef.current) {
      setValueRef.current();
    }
  }, [selectCountry]);

  const handleCountryChange = (input) => {
    setSelectedCountry(input);
  };

  const handleChangeState = (input) => {
    setSelectedState(input);
  };

  const handleChangeCity = (input) => {
    setSelectedCity(input);
  };

  // const dataString = JSON.stringify({ country: selectCountry });

  async function fetchStates() {
    await axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: selectCountry,
      })
      .then((respone) => respone.data.data.states)
      // .then((data) => (setStates(data.map((state) => state.name)), console.log(data)))
      .then((data) => setStates(data.map((state) => state.name)))
      .catch((error) => console.log(error));
  }
  // console.log(selectCountry);
  // console.log(states);

  async function fetchCities() {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", {
        country: selectCountry,
        state: selectState,
      })
      .then((response) => response.data)
      .then((result) => setCities(result.data))
      .catch((error) => console.log("error", error));
  }

  // useState(() => {
  //   fetchCities();
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
            label="Country"
            name={["address", "city", "state", "country", "countryName"]}
            rules={[
              {
                required: true,
                message: "Please Select the Country",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onSelect={(input) => handleCountryChange(input)}
              value={selectCountry}
            >
              {countries.map((country) => (
                <Option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={formItem}
            label="State"
            name={["address", "city", "state", "stateName"]}
            rules={[
              {
                required: true,
                message: "Please Select the State",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onSelect={(input) => handleChangeState(input)}
              value={selectState}
            >
              {states.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={formItem}
            label="City"
            name={["address", "city", "cityName"]}
            rules={[
              {
                required: true,
                message: "Please Select the City",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onSelect={(input) => handleChangeState(input)}
              value={selectedCity}
            >
              {cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={formItem}
            label="Full Address"
            name={["address", "localAddress"]}
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
