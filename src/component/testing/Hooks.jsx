import { useEffect } from "react";
import { useState } from "react";

export function Hook() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    alert(count);
  }, [count]);

  function countClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={countClick}>Click</button>
    </div>
  );
}
