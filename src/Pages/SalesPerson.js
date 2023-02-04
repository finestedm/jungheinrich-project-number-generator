import { useEffect, useState } from "react";
import { ListGroup, Table, Image, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Items } from "./PaginatedItems";
import { AiOutlineNumber } from "react-icons/ai"
import { TbBuildingWarehouse } from "react-icons/tb"
import { MdOutlineDescription, MdOutlineDateRange, MdOutlineLocationOn, MdOutlineLocalOffer, MdOutlineCardTravel, MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import moment from 'moment'

export default function SalesPerson({ currentSalesPerson }) {
    const [postsData, setPostsData] = useState([])
    const [currentSalesPersonsPosts, setCurrentSalesPersonsPosts] = useState([])
    const posts = useSelector((state) => state.posts);
    useEffect(() => {
        setPostsData(posts)
    }, [posts]);

    useEffect(() => {
        setCurrentSalesPersonsPosts(postsData.filter(post => post.user === currentSalesPerson.value))
    }, [currentSalesPerson, postsData]);

    useEffect(() => {
        const newest = (currentSalesPersonsPosts.map(post => post.createdAt)).sort().reverse()[0]
    }, [currentSalesPersonsPosts])
    
    function findNewestSalesPersonPosts() {
        return ((currentSalesPersonsPosts.map(post => post.createdAt)).sort().reverse())[0]
    }

    return (
        <>
            <Row className="d-flex align-items-center m-0 gap-3">
                <Col xs={12} md='auto'>
                    <Image className='team--salesperson-avatar' style={{ height: '8rem', aspectRatio: '1/1', objectFit: 'cover' }} roundedCircle src={currentSalesPerson.photo} />
                </Col>
                <Col xs={12} md='auto'>
                    <h3>{currentSalesPerson.value}</h3>
                    <small className='text-muted'>Najnowszy projekt dodano: {moment(findNewestSalesPersonPosts()).format("DD.MM.YYYY, H:mm")}  </small>
                </Col>
            </Row>

            <Table hover className='table-ps m-0'>
                <thead>
                    <tr className='table--head'> 
                        <th><span className='d-flex align-items-center gap-1'><AiOutlineNumber size='1.2em'/> Numer</span></th>
                        <th><span className='d-none d-lg-flex align-items-center gap-1'><MdOutlineLocalOffer size='1.2em'/> Status</span> <span className='d-flex d-lg-none align-items-center'><MdOutlineLocalOffer size='1.2em'/> St.</span> </th>
                        <th><span className='d-flex align-items-center gap-1'><TbBuildingWarehouse size='1.2em'/> Klient</span></th>
                        <th className='d-none d-xxl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineLocationOn size='1.2em'/> Lokalizacja</span></th>
                        <th className='d-none d-xl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDescription size='1.2em'/> Opis</span></th>
                        <th className='d-none d-lg-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDateRange size='1.2em' /> Utworzono</span></th>
                    </tr>
                </thead>

                <tbody>
                    <Items currentItems={currentSalesPersonsPosts} minimalMode={true} />
                </tbody>
            </Table>
        </>
    )
}