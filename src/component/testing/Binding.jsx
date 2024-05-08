export function Binding() {
  var categories = ["Electornics", "Footwear", "Fashion"];
  var data = [
    {
      Name: "Samsung TV",
      Price: 45000.0,
      Stock: true,
    },
    {
      Name: "Nike Casual",
      Price: 5000.0,
      Stock: true,
    },
    {
      Name: "Watch",
      Price: 7000.0,
      Stock: true,
    },
  ];

  var menu = [
    { Category: "Electronics", Products: ["Mobiles", "Televisions"] },
    { Category: "Footwear", Products: ["Casuals", "Boots"] },
  ];

  return (
    <div className="">
      <select name="" id="">
        {menu.map((item) => (
          <optgroup key={item.Category} label={item.Category}>
            {item.Products.map((product) => (
              <option value={product}>{product}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <ol key="menu">
        {menu.map((item) => (
          <li key={item.Category}>
            {item.Category}
            <ul>
              {item.Products.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h1>Categories</h1>
      <ol>
        {categories.map((catergory) => (
          <li>{catergory}</li>
        ))}
      </ol>
      <br />
      <br />
      <br />

      <select>
        {categories.map((catergory) => (
          <option>{catergory}</option>
        ))}
      </select>
      <br />
      <br />
      <br />

      <ul className="list-unstyled">
        {categories.map((catergory) => (
          <li>
            <input type="checkbox" /> {catergory}
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />

      <table className="table">
        <tr>
          <th>Categories</th>
        </tr>
        {categories.map((catergory) => (
          <tr>
            <td>{catergory}</td>
          </tr>
        ))}
      </table>

      <h2>Product Table</h2>
      <table className="table" border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Name}>
              <td>{item.Name}</td>
              <td>{item.Price}</td>
              <td>{item.Stock == true ? "Available" : "Out of Stock"}</td>
              <td>
                <button className="btn btn-danger">
                  <span className="bi bi-trash-fill"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
