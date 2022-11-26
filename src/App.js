import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import axios from "axios";

function App() {
  // const [cookies, setCookie] = useCookies(["user"]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/count/")
      // .then((res) => setCookie("count", res.data.data, { path: "/" }))
      .then((res) => setCount(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // implement increment
  function increment() {
    axios
      .post("http://127.0.0.1:8000/count/increment-counter", {
        curr_val: count,
      })
      // .then((res) => setCookie("count", res.data.updated_val, { path: "/" }))
      .then((res) => setCount(res.data.updated_value))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    window.localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    window.addEventListener("storage", (event) => {
      if (event.storageArea !== localStorage) return;
      if (event.key === "count") {
        setCount(localStorage.getItem("count"));
      }
    });
  }, []);

  return (
    <div className="App">
      Hello world Current counter : {count}
      <button onClick={() => increment()}>increment</button>
    </div>
  );
}

export default App;
