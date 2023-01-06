import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Row, Col, Offcanvas, Form, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineNumber } from 'react-icons/ai'
import { BiArchive } from 'react-icons/bi'
import logo from '../images/Jungheinrich-Logo.svg'
import logoSmall from '../images/Jungheinrich-Logo-J.svg'

export default function Topbar() {
    const [selectedSite, setSelectedSite] = useState(1)

    return (    
        <Navbar collapseOnSelect key='md' expand='md'>
            <Container fluid className='flex-row flex-md-column px-4 py-2'>
                <Navbar.Brand><img src={logoSmall} height='30' /></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Offcanvas placement="start" collapseOnSelect>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={logo} height='30' />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column gap-2">
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/" active={selectedSite === 1} onClick={() => setSelectedSite(1)}>
                                    <Row>
                                        <Col xs='auto'><AiOutlineNumber /></Col>
                                        <Col><span>Generuj numer</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/Archive" active={selectedSite === 2} onClick={() => setSelectedSite(2)}>
                                    <Row>
                                        <Col xs='auto'><BiArchive /></Col>
                                        <Col><span >Archiwum</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='d-flex align-items-stretch'>
                                <Nav.Link className='p-3 d-flex align-items-center' as={Link} to="/Archive" active={selectedSite === 3} onClick={() => setSelectedSite(3)}>
                                    <Row>
                                        <Col xs='auto'><BiArchive /></Col>
                                        <Col><span >Placeholder #1</span></Col>
                                    </Row>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )      
}