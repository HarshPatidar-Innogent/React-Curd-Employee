import { useState } from "react";

export function State() {
  let [text, setText] = useState();

  const changeText = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <h1>{text}</h1>
      <br />
      <input type="text" onChange={changeText} name="" id="" />
      <p>{text}</p>
    </>
  );
}
