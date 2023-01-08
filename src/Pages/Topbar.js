import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button, Row } from 'react-bootstrap'
import logoSmall from '../images/Jungheinrich-Logo-J.svg'
import Sidebar from './Sidebar' 

export default function Topbar() {
    return (
            <Navbar className='d-md-none border-bottom sticky-top'>
                <Container>
                    <Button className='navbar-open-button'> > </Button>
                    <Navbar.Brand><img src={logoSmall} height='30' /></Navbar.Brand>
                </Container>
            </Navbar>
    )
}