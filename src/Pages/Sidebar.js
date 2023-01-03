import React, {useState} from 'react'
import { Navbar, Nav, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineNumber } from 'react-icons/ai'
import { BiArchive } from 'react-icons/bi'
import logo from '../images/Jungheinrich-Logo.svg'
import logoSmall from '../images/Jungheinrich-Logo-J.svg'


export default function Sidebar() {

    const [selectedSite, setSelectedSite] = useState(1)

    return (  
        <div className='sidebar p-4 d-flex flex-row flex-md-column flex-shrink-0 gap-3 mb-5'>
            <div className='mt-3 mb-4'>
                <Navbar.Brand>
                    <Link to='/'>
                        <img className="nav-main__logo d-none d-md-inline" aria-hidden="true" src={logo} alt='Jungheinrich'/>
                        <img className="nav-main__logo d-md-none d-inline" aria-hidden="true" src={logoSmall} alt='Jungheinrich'/>
                    </Link>
                </Navbar.Brand>
            </div>
            <Nav
                className="flex-row flex-md-column gap-2">
                <Nav.Item className='d-flex align-items-stretch'>
                    <Nav.Link className='p-2 d-flex align-items-center' as={Link} to="/" active={selectedSite === 1} onClick={() => setSelectedSite(1)}>
                        <Row>
                            <Col xs='auto'><AiOutlineNumber /></Col>
                            <Col className='d-none d-md-inline'><span>Generuj nowy numer projektu</span></Col>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='d-flex align-items-stretch'>
                    <Nav.Link className='p-2 d-flex align-items-center' as={Link} to="/Archive" active={selectedSite === 2} onClick={() => setSelectedSite(2)}>
                        <Row>
                            <Col xs='auto'><BiArchive /></Col>
                            <Col className='d-none d-md-inline'><span >Archiwum projektów</span></Col>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
