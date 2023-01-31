import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Row, Col, Offcanvas, Form, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineNumber, AiOutlineLogin, AiOutlineLogout, AiOutlineUserAdd } from 'react-icons/ai'
import { BiArchive } from 'react-icons/bi'
import logo from '../images/Jungheinrich-Logo.svg'
import logoSmall from '../images/Jungheinrich-Logo-J.svg'
import { logout, reset } from '../features/auth/authSlice'


export default function Topbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authSlice)

    function onLogout() {
        dispatch(logout())
        dispatch(reset())
    }


    
    return (    
        <Navbar collapseOnSelect key='md' expand='md' className='sticky-top'>
            <Container fluid className='flex-row flex-md-column px-2 py-2 h-100'>
                <Navbar.Brand className='d-none d-md-flex d-xl-none'><img src={logoSmall} height='30' /></Navbar.Brand>
                <Navbar.Brand className='d-flex d-md-none d-xl-flex'><img src={logo} height='26' /></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Offcanvas placement="start" collapseOnSelect className='navbar--offcanvas'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={logo} height='30' />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-grow-1">
                        <Nav className="flex-column flex-grow-1 gap-2">
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' disabled={!user} as={Link} to="/" active={window.location.pathname === '/jungheinrich-project-number-generator'}>
                                    <Row>
                                        <Col xs='auto' className='d-flex align-items-center'><AiOutlineNumber size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                            <span>Generuj numer</span>
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' disabled={!user} as={Link} to="/Archive" active={window.location.pathname === '/jungheinrich-project-number-generator/Archive'}>
                                    <Row className='d-flex align-items-center justify-content-between'>
                                        <Col xs='auto' className='d-flex align-items-center'><BiArchive size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Archiwum</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/Archive">
                                    <Row>
                                        <Col xs='auto' className='d-flex align-items-center'><BiArchive size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Placeholder #1</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>

                            {!user ? <>
                                <Nav.Item className='mt-auto d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/login">
                                        <Row className='d-flex align-items-center justify-content-between'>
                                            <Col xs="auto" className='d-flex align-items-center'><AiOutlineLogin size='1.5em'/></Col>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span>Zaloguj się</span></Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item className='d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/signup">
                                        <Row className='d-flex align-items-center justify-content-between'>
                                            <Col xs="auto" className='d-flex align-items-center'><AiOutlineUserAdd size='1.5em'/></Col>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span>Zarejestruj się</span></Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                            :
                            <>
                                <Nav.Item className='mt-auto d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' onClick={() => onLogout()}>
                                        <Row className='d-flex align-items-center justify-content-between'>
                                            <Col xs="auto" className='d-flex align-items-center'><AiOutlineLogout size='1.5em'/></Col>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span>Wyloguj się</span></Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                            }
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )      
}