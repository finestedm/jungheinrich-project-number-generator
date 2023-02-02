import { ListGroup, Nav } from "react-bootstrap"
import { salesPersons } from "../data/salesPersons"
import { Link } from "react-router-dom"
import SalesPerson from "./SalesPerson"

export default function Team() {
    return (
        <><ListGroup>
            {/* {salesPersons.map(salesPerson => <ListGroup.Item>{salesPerson.value}</ListGroup.Item>)} */}
            {salesPersons.map(salesPerson => (
                                <Nav.Item><ListGroup.Item as={Link} to={salesPerson.id} >{salesPerson.value}</ListGroup.Item></Nav.Item>)
                            )}
        </ListGroup>
           <SalesPerson></SalesPerson> 
        </>
    )
}