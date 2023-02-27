import Navbar from "./Pages/Navbar";
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Archive from "./Pages/Archive";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import SalesPerson from "./Pages/SalesPerson";
import Team from "./Pages/Team";
import { useDispatch, useSelector } from "react-redux";
import { salesPersons } from "./data/salesPersons";
import { getPosts } from './actions/posts'


export default function App() {
  const { user } = useSelector((state) => state.authSlice)
  const { id } = useParams();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} className='App' id='App'>
      <Container fluid className='app-container h-100 d-flex flex-column flex-md-row align-items-stretch p-0 m-0'>
        {user && <Navbar className='topbar' />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route index element={<Main />} />
          <Route path='/archive' element={<Archive />} />
          <Route path='/team' element={<Team />} >
            <Route path=':id' element={<SalesPerson />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}