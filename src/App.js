import Navbar from "./Pages/Navbar";
import React from 'react'
import  {Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} className='App'>
      <Container fluid className='app-container h-100 d-flex flex-column flex-md-row align-items-stretch p-0 m-0'>
        <Navbar className='topbar'/>
        <Routes>
          <Route index element={<Main/>} />
          <Route path='/archive' element={<Archive/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}