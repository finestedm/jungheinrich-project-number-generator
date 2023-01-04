import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

export default function Topbar() {
    return (
        <Navbar className='d-md-none'>
            <Container>
                <Button className='navbar-open-button'> > </Button>
            </Container>
        </Navbar>
    )
}