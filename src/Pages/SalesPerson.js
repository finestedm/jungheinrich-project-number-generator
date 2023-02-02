import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { salesPersons } from "../data/salesPersons";

export default function SalesPerson() {
    
    const { id } = useParams();
    const currentSalesPerson = salesPersons[id];

    const posts = useSelector((state) => state.posts);
    const salesPersonPosts = async() => posts.filter(post => (currentSalesPerson.value).includes(post.user))
    console.log(salesPersonPosts())

    return (
        <>
            <div>{currentSalesPerson.value}</div>
            {/* {salesPersonPosts.map(post => <div>{post.customer}</div>)} */}
        </>
    )
}