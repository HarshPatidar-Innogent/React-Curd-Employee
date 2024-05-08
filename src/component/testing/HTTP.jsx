import axios from "axios";
import { useState } from "react";

export function HttpRequest() {
  const [state, setState] = useState({});

  const data = { user: "", title: "", body: "" };
  const [inputData, setInputData] = useState(data);

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    axios
      .post("https://jsonplaceholder.typicode.com/users", inputData)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container-fluid">
      <form action="">
        <input
          type="text"
          name="user"
          value={inputData.user}
          onChange={handleData}
        />
        <br />
        <input
          type="text"
          name="title"
          value={inputData.title}
          onChange={handleData}
        />
        <br />
        <input
          type="text"
          name="body"
          value={inputData.body}
          onChange={handleData}
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
