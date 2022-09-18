import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import React, { Component } from "react";

function App() {
  const [count, setCount] = useState(0);
  //Component did update
  useEffect(() => {
    console.log("Component did update");
  });
  //Component did monunt
  useEffect(() => {
    console.log("Component did mount");
  }, []);
  //Component will update
  useEffect(() => {
    console.log("Contador mudou");
  }, [count]);
  //Component will unmount
  useEffect(() => {
    console.log("Contador mudou");
    return () => {
      setCount(0);
    };
  }, []);
  return (
    <div>
      <p> Counter : {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default App;
