import { ListGroup, Nav, Container } from "react-bootstrap"
import { salesPersons } from "../data/salesPersons"
import { Link, useNavigate, useParams } from "react-router-dom"
import SalesPerson from "./SalesPerson"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Team() {
    const [currentSalesPerson, setCurrentSalesPerson] = useState(null)
    const { id } = useParams();
    const { user } = useSelector((state => state.authSlice))
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    // below useEffect allow to set salesPerson object assigned to the id passed by the router
    useEffect(() => {
        setCurrentSalesPerson(salesPersons.filter(salesPerson => salesPerson.id === id)[0])
    }, [id])

    return (
        <Container fluid className='main w-100 px-md-5 d-flex flex-column gap-3'>
            <ListGroup>
                {salesPersons.map(salesPerson => (
                    <Nav.Item><ListGroup.Item as={Link} key={salesPerson.id} to={salesPerson.id} >{salesPerson.value}</ListGroup.Item></Nav.Item>)
                )}
            </ListGroup>
            {currentSalesPerson && <SalesPerson currentSalesPerson={currentSalesPerson} />}
        </Container >
    )
}