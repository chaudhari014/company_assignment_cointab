// src/App.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import UserDetails from './components/UserDetails';
import PostList from './components/PostList';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/posts/:userId" element={<PostList/>} ></Route>
      
   </Routes>
   </div>
  );
}

export default App;
