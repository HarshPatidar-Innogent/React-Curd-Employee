import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { Login } from "./component/login/login";
import { NasaComponent } from "./component/nasa-api/nasa.component.jsx";
import { State } from "./component/testing/State.jsx";
import { HttpRequest } from "./component/testing/HTTP.jsx";
import { Hook } from "./component/testing/Hooks.jsx";
import { Fakestore } from "./component/fakestore-api/fakestore.component.jsx";
import { Employee } from "./component/employee-api/employee.component.jsx";
import { FakestoreAntd } from "./component/fakestore-antd.component.jsx/fakestore-antd.jsx";
import { Display } from "./component/innogent-training/Innogent-react1.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Product } from "./component/innogent-training/innogent-product.jsx";
import { store } from "./component/innogent-training/store.js";
import { Provider } from "react-redux";
import { Product2 } from "./component/innogent-training/innogent-product2.jsx";
import { Cart } from "./component/innogent-training/innogent-cart.jsx";
import { AddEmployee } from "./component/employee-api/new.employee.jsx";
import { DeleteEmployee } from "./component/employee-api/delete.employee.jsx";
import { UpdateEmployee } from "./component/employee-api/update.employee.jsx";
import { UpdateEmpDetails } from "./component/employee-api/updateEmp.jsx";
import { EmpDetails } from "./component/employee-api/employee.details.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <NasaComponent />s */}
    {/* <State /> */}
    {/* <HttpRequest /> */}
    {/* <Hook /> */}
    {/* <Fakestore /> */}
    {/* <FakestoreAntd /> */}
    {/* <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Display />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product2 />} />
          <Route path="/product/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider> */}
    {/* <Employee />
    <EmpDetails /> */}
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Employee />} />
        <Route exact path="/empDetails/:id" element={<EmpDetails />} />
      </Routes>
    </BrowserRouter>
    {/* <AddEmployee /> */}
    {/* <DeleteEmployee /> */}
    {/* <BrowserRouter>
      <Routes>
        <Route path="/update/" element={<UpdateEmployee />} />
        <Route path="/updateEmp/:id" element={<UpdateEmpDetails />} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
