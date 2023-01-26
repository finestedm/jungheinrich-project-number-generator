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
    const [selectedSite, setSelectedSite] = useState(1)
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
                    <Offcanvas.Header className='d-flex align-items-center' closeButton>
                        <Offcanvas.Title>
                            <img src={logo} height='30' />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-grow-1">
                        <Nav className="flex-column flex-grow-1 gap-2">
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' disabled={!user} as={Link} to="/" active={selectedSite === 1} onClick={() => setSelectedSite(1)}>
                                    <Row>
                                        <Col xs='auto' className='d-flex align-items-center'><AiOutlineNumber size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                            <span>Generuj numer</span>
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' disabled={!user} as={Link} to="/Archive" active={selectedSite === 2} onClick={() => setSelectedSite(2)}>
                                    <Row className='d-flex align-items-center justify-content-between'>
                                        <Col xs='auto' className='d-flex align-items-center'><BiArchive size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Archiwum</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/Archive" active={selectedSite === 3} onClick={() => setSelectedSite(3)}>
                                    <Row>
                                        <Col xs='auto' className='d-flex align-items-center'><BiArchive size='1.5em'/></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Placeholder #1</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>

                            {!user ? <>
                                <Nav.Item className='mt-auto d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/login" active={selectedSite === 4} onClick={() => setSelectedSite(4)}>
                                        <Row className='d-flex align-items-center justify-content-between'>
                                            <Col xs="auto" className='d-flex align-items-center'><AiOutlineLogin size='1.5em'/></Col>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span>Zaloguj się</span></Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item className='d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/signup" active={selectedSite === 5} onClick={() => setSelectedSite(5)}>
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
                                    <Nav.Link className='p-3 d-flex align-items-center' active={selectedSite === 6} onClick={() => {
                                        setSelectedSite(6)
                                        onLogout()
                                    }}>
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