import React from "react";
import { Row, Col, Card, Image, Figure} from 'react-bootstrap';

export default function ArchivedProjectPlaceholder() {
    return (
        <tr>
            <td><p className='placeholder-wave m-0'><span className="placeholder placeholder-lg rounded-pill col-7 bg-secondary"></span></p></td>
            <td><p className='placeholder-wave m-0'><span className="placeholder rounded col-7 bg-secondary"></span></p></td>
            <td className="table--customer"><p className='placeholder-wave m-0'><span className="placeholder rounded col-10 bg-secondary"></span></p></td>
            <td className="table--location"><p className='placeholder-wave m-0'><span className="placeholder rounded col-7 bg-secondary"></span></p></td>
            <td className='d-none d-lg-table-cell'><p className='placeholder-wave m-0'><span className="placeholder rounded col-12 bg-secondary"></span></p></td>
            <td className='d-none d-md-table-cell'>
                <div className='align-items-center placeholder-wave'>
                    <Image className='placeholder rounded me-2 bg-secondary' roundedCircle style={{ height: '1.5rem', aspectRatio: '1/1' }} />
                    <span className="placeholder rounded col-3 me-1 bg-secondary"></span>
                    <span className="placeholder rounded col-4 bg-secondary"></span>
                </div>
            </td>
            <td className='d-none d-md-table-cell'>
                <p className='placeholder-wave m-0'>
                    <span className="placeholder rounded col-7 me-1 bg-secondary"></span>
                    <span className="placeholder rounded col-3 bg-secondary"></span>
                </p>
            </td>
        </tr>
    )

}