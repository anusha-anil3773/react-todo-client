import React , { useState, useEffect }from 'react';
import './App.css';
import Navbar from './components/navbar'
import Todo from './components/todo';
import Home from './components/home';
import About from './components/about';
import { Route, Routes } from "react-router-dom"
import axios from 'axios';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/message")
    .then((res) =>
       setMessage(res.data.message))
    .catch((error) => 
        console.error(error));
  }, []);
  return (
    <div>

       <Navbar/>
       <h1>{message}</h1>
       <div>
        <Routes>
        <Route path="/" element={<Todo/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
     
    </div>
    
  );
}

export default App;
