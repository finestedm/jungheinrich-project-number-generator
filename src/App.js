import Header from "./Pages/Header";
import React from 'react'
import  {Container} from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";


export default function App() {
  return (
    <BrowserRouter as={Container} className='App'>
      <Header></Header>
      <Routes>
        <Route index element={<Main />} />
        <Route path='/archive' element={<Archive/>} />
      </Routes>
    </BrowserRouter>
     
  );
}