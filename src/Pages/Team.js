import { ListGroup, Nav } from "react-bootstrap"
import { salesPersons } from "../data/salesPersons"
import { Link, useParams } from "react-router-dom"
import SalesPerson from "./SalesPerson"
import { useEffect, useState } from "react"

export default function Team() {
    const [currentSalesPerson, setCurrentSalesPerson] = useState(null)
    const { id } = useParams();

    // below useEffect allow to set salesPerson object assigned to the id passed by the router
    useEffect(() => {
        setCurrentSalesPerson(salesPersons.filter(salesPerson => salesPerson.id === id)[0])
    }, [id])

    return (
        <div className="d-flex flex-column gap-3">
            <ListGroup>
                {salesPersons.map(salesPerson => (
                    <Nav.Item><ListGroup.Item as={Link} to={salesPerson.id} >{salesPerson.value}</ListGroup.Item></Nav.Item>)
                )}
            </ListGroup>
            {currentSalesPerson && <SalesPerson currentSalesPerson={currentSalesPerson}></SalesPerson>}
        </div >
    )
}