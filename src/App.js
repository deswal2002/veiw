import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Bookmark from "./pages/bookmark/Bookmark";
import Story from "./pages/Story/Story";
import React from 'react'
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/bookmark" element={<Bookmark/>}/>
      <Route path="/Story/:storyId" element={<Story/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
