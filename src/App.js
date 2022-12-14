import Topbar from "./Pages/Topbar";
import React from 'react'
import  {Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";


export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} className='App'>
      <div className='app-container h-100 d-flex flex-column flex-md-row align-items-stretch '>
        <Topbar className='topbar'/>
        <Routes>
          <Route index element={<Main/>} />
          <Route path='/archive' element={<Archive/>} />
        </Routes>
      </div>
    </BrowserRouter>
     
  );
}