import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { salesPersons } from "../data/salesPersons";

export default function SalesPerson() {
    const { id } = useParams();
    const [postsData, setPostsData] = useState([])
    const [currentSalesPerson, setCurrentSalesPerson] = useState(null)
    const [currentSalesPersonsPosts, setCurrentSalesPersonsPosts] = useState([])
    const posts = useSelector((state) => state.posts);
    useEffect(() => {
        setPostsData(posts)
        console.log(postsData)
    }, [posts]);

    useEffect(() => {
       setCurrentSalesPerson(salesPersons.filter(salesPerson => salesPerson.id === id)[0])
        console.log(currentSalesPerson)
        setCurrentSalesPersonsPosts(postsData.filter(post => post.user === currentSalesPerson.value))
        console.log(currentSalesPersonsPosts)

    }, [id]);


    // postsData.forEach(post => console.log((currentSalesPerson.value).includes(post.user)))
    // console.log(salesPersonPosts)

    return (
        <>
            {/* <div>{currentSalesPerson.value}</div> */}
            {/* {salesPersonPosts.map(post => <div>{post.customer}</div>)} */}
        </>
    )
}