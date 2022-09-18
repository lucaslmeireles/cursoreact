import { useState, useEffect, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React, { Component } from "react";


const Button = React.memo(function ({incrementButton}){
  return <button onClick={() => incrementButton(10)}>+</button>
})
function App() {
  const [count, setCount] = useState(0);
  const incrementCounter = useCallback((num = 1) =>{
    setCount((c) => c + num)
  },[])
  return (
    <div>
      <p> Counter : {count}</p>
      <Button incrementButton={incrementCounter}/>
    </div>
  );
}

export default App;
