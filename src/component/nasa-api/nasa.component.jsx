import { useEffect, useState } from "react";

export function NasaComponent() {
  const [mars, setMars] = useState({ photos: [] });

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY"
    )
      .then((response) => response.json())
      .then((data) => {
        setMars(data);
      });
  }, []);

  return (
    <div>
      <h2>Mars Rover Photos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Photo ID</th>
            <th>Preview</th>
            <th>Camera Name</th>
            <th>Rover Name</th>
          </tr>
        </thead>
        <tbody>
          {mars.photos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <a href={item.img_src} target="_blank">
                  <img
                    src={item.img_src}
                    alt={item.earth_date}
                    width="200"
                    height=" "
                  />
                </a>
              </td>
              <td>{item.camera.full_name}</td>
              <td>{item.rover.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
