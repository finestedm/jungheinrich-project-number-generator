import Header from "./Pages/Sidebar";
import React from 'react'
import  {Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";


export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} as={Container} className='App'>
      <Row>
        <Col xs={2}><Header /></Col>
        <Col>
          <Routes >
            <Route index element={<Main/>} />
            <Route path='/archive' element={<Archive/>} />
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
     
  );
}