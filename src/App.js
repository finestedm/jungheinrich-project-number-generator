import Navbar from "./Pages/Navbar";
import React from 'react'
import  {Container, Row, Col} from 'react-bootstrap'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import SalesPerson from "./Pages/SalesPerson";
import { useSelector } from "react-redux";
import { salesPersons } from "./data/salesPersons";

export default function App() {
  const { user } = useSelector((state) => state.authSlice)
 
  const {id} = useParams();
  console.log(id)

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} className='App'>
      <Container fluid className='app-container h-100 d-flex flex-column flex-md-row align-items-stretch p-0 m-0'>
        {user && <Navbar className='topbar' />}
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route index element={<Main/>} />
          <Route path='/archive' element={<Archive />} />
          <Route path='/team' >
            <Route path=':id' element={<SalesPerson />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}