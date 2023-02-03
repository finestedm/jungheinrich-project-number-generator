import { useEffect, useState } from "react";
import { ListGroup, Table, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Items } from "./PaginatedItems";
import { AiOutlineNumber } from "react-icons/ai"
import { TbBuildingWarehouse } from "react-icons/tb"
import {MdOutlineDescription, MdOutlineDateRange, MdOutlineLocationOn, MdOutlineLocalOffer, MdOutlineCardTravel, MdOutlineArrowForwardIos, MdOutlineArrowBackIos} from 'react-icons/md'

export default function SalesPerson({ currentSalesPerson }) {
    const [postsData, setPostsData] = useState([])
    const [currentSalesPersonsPosts, setCurrentSalesPersonsPosts] = useState([])
    const posts = useSelector((state) => state.posts);
    useEffect(() => {
        setPostsData(posts)
    }, [posts]);

    useEffect(() => {
        setCurrentSalesPersonsPosts(postsData.filter(post => post.user === currentSalesPerson.value))
    }, [currentSalesPerson]);
    
    useEffect(() => {
        console.log(currentSalesPersonsPosts)
        
    }, [currentSalesPersonsPosts])

    // postsData.forEach(post => console.log((currentSalesPerson.value).includes(post.user)))
    // console.log(salesPersonPosts)

    return (
        <>
            <h3>Projekty użytkownika: <Image style={{height: '2rem'}} src={currentSalesPerson.photo}/> {currentSalesPerson.value} </h3>

            <Table hover className='table-ps m-0'>
                <thead>
                    <tr className='table--head'> 
                        <th><span className='d-flex align-items-center gap-1'><AiOutlineNumber size='1.2em'/> Numer</span></th>
                        <th><span className='d-none d-lg-flex align-items-center gap-1'><MdOutlineLocalOffer size='1.2em'/> Status</span> <span className='d-flex d-lg-none align-items-center'><MdOutlineLocalOffer size='1.2em'/> St.</span> </th>
                        <th><span className='d-flex align-items-center gap-1'><TbBuildingWarehouse size='1.2em'/> Klient</span></th>
                        <th className='d-none d-xxl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineLocationOn size='1.2em'/> Lokalizacja</span></th>
                        <th className='d-none d-xl-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDescription size='1.2em'/> Opis</span></th>
                        <th className='d-none d-md-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineCardTravel /> Handlowiec</span></th>
                        <th className='d-none d-lg-table-cell'><span className='d-flex align-items-center gap-1'><MdOutlineDateRange size='1.2em' /> Utworzono</span></th>
                        <th className='edit-column'></th>
                    </tr>
                </thead>

                <tbody>
                    <Items currentItems={currentSalesPersonsPosts} />
                </tbody>
            </Table>
        </>
    )
}