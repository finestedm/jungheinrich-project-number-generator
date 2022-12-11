import React from "react";
import { Row, Table } from 'react-bootstrap'

export default function NoSearchResults() {
    return (
        <Row>
            <Table className='text-center'>
                    <thead>
                        <tr>
                            <th><h4 className='p-4'>Brak wyników</h4></th>
                        </tr>
                    </thead>        
            </Table>
        </Row>
    )
}
