import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Row, Col, Offcanvas, Form, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineNumber } from 'react-icons/ai'
import { BiArchive } from 'react-icons/bi'
import logo from '../images/Jungheinrich-Logo.svg'
import logoSmall from '../images/Jungheinrich-Logo-J.svg'
import { getNewPostsNumber } from '../components/SummaryCards'
import { logout, reset } from '../features/auth/authSlice'


export default function Topbar() {
    const [selectedSite, setSelectedSite] = useState(1)
    const posts = useSelector((state) => state.posts)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authSlice)

    function onLogout() {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (    
        <Navbar collapseOnSelect key='md' expand='md' className='sticky-top'>
            <Container fluid className='flex-row flex-md-column px-2 py-2'>
                <Navbar.Brand className='d-block d-xl-none'><img src={logoSmall} height='30' /></Navbar.Brand>
                <Navbar.Brand className='d-none d-xl-block'><img src={logo} height='26' /></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Offcanvas placement="start" collapseOnSelect className='navbar--offcanvas'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={logo} height='30' />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='text-center d-flex'>
                        <Nav className="flex-column gap-2">
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/" active={selectedSite === 1} onClick={() => setSelectedSite(1)}>
                                    <Row>
                                        <Col xs='auto'><AiOutlineNumber /></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                            <span>Generuj numer</span>
                                        </Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 align-items-center' as={Link} to="/Archive" active={selectedSite === 2} onClick={() => setSelectedSite(2)}>
                                    <Row className='d-flex align-items-center justify-content-between'>
                                        <Col xs='auto'><BiArchive /></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Archiwum</span></Col>
                                        {getNewPostsNumber(posts) !== 0 ?
                                            <Col xs='auto' className='text-center'>
                                                <div className='navbar-indicator d-flex justify-content-center align-items-center fw-bold'>
                                                    <span className='d-none d-xl-block'>{getNewPostsNumber(posts)} </span>
                                                </div>
                                        </Col> : ''}
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/Archive" active={selectedSite === 3} onClick={() => setSelectedSite(3)}>
                                    <Row>
                                        <Col xs='auto'><BiArchive /></Col>
                                        <Col className='nav-link--description d-block d-md-none d-xl-block text-start'><span >Placeholder #1</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>

                            {!user ? <>
                                <Nav.Item className='mt-auto d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/login" active={selectedSite === 4} onClick={() => setSelectedSite(4)}>
                                        <Row>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                                <span>Zaloguj się</span>
                                            </Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item className='d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/signup" active={selectedSite === 5} onClick={() => setSelectedSite(5)}>
                                        <Row>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                                <span>Zarejestruj się</span>
                                            </Col>
                                        </Row>
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                            :
                            <>
                                <Nav.Item className='mt-auto d-flex align-items-stretch'>
                                    <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/login" active={selectedSite === 3} onClick={() => {
                                        setSelectedSite(3)
                                        onLogout()
                                    }}>
                                        <Row>
                                            <Col className='nav-link--description d-block d-md-none d-xl-block text-start'>
                                                <span>Wyloguj się</span>
                                            </Col>
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