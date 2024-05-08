import { useEffect, useRef, useState } from "react";

export function Fakestore() {
  const [data, setData] = useState([]);
  const dataRef = useRef(data);
  const [category, setCategory] = useState([]);

  function loadCategory() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((json) => {
        json.unshift("All");
        setCategory(json);
      })
      .catch((error) => console.log(error));
  }

  function loadProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadCategory();
    loadProducts("https://fakestoreapi.com/products/");
  }, [dataRef]);

  function handleChange(event) {
    event.target.value == "All"
      ? loadProducts("https://fakestoreapi.com/products/")
      : loadProducts(
          `https://fakestoreapi.com/products/category/${event.target.value}`
        );
  }

  return (
    <div>
      <h1>Fake Store</h1>

      <div className="d-flex justify-content-between p-2">
        <div>
          <select
            onChange={handleChange}
            name="categories"
            className="form-select"
          >
            {category.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="col-10 flex-wrap d-flex">
          {data.map((item) => (
            <div className="card m-2 p-2 w-25" key={item.id}>
              <img
                className="card-img-top"
                src={item.image}
                alt=""
                key={item.image}
                height="150"
              />
              <div className="card-header">
                <p className="card-title">{item.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Rating</dt>
                  <dd>{item.rating.rate}</dd>
                </dl>
                <p className="card-text text-truncate" style={{ width: "250" }}>
                  {item.description}
                </p>
                <a href={item.image} className="btn btn-primary">
                  $ {item.price}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
