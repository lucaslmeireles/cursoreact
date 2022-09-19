import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React, { Component } from "react";
import P from 'prop-types';

const Post = ({post, handleClick}) => {
  return(
    <div key={post.id}>
        <h1 onClick={() => handleClick(post.title)}>{post.title}</h1>
        <p>{post.body}</p>
      </div>
  )
}

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string
  }),
  onClick: P.func,
}
function App() {
  const [posts, setPosts] = useState([])
  const [value, setValue] = useState('')
  const input = useRef(null)

  console.log('pia renderizou');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
    .then(r => setPosts(r))
  },[])
  const handleClick = (value) =>{
    setValue(value)
  }
  useEffect(()=>{
    input.current.focus()
    console.log(input.current)
  },[value])
  return(
    <div className="app">
      <p> 
        <input type="search" ref={input} value={value} onChange={(e) => setValue(e.target.value)}/>
      </p> 
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => {
            return <Post key={post.id} post={post} handleClick={handleClick} />;
          })
        );
      }, [posts])}
      {posts.length <=0 && <p>Ainda não existem posts</p>}
    </div>
  
  )
}

export default App;
