import { useParams } from "react-router-dom"
import "./category-detail.styles.scss"
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card-component/product-card.component";
import {gql,useQuery} from "@apollo/client";

const CategoryDetail = () => {
    const {category} = useParams();
    const [products,setProducts] = useState([]);
    const TITLE_COLLECTIONS = gql`
        query($title:String!){
            getCollectionsByTitle(title: $title){
                id
                title
                 items{
                   id
                   name
                   price
                   imageUrl
                 }
               }
            }
        `
    const {error,loading,data} = useQuery(TITLE_COLLECTIONS,{
        variables: {
            title: category
        }
    })
    // console.log(data);
    useEffect(()=>{
        if (data) {
            const {getCollectionsByTitle:{items}} = data;
            setProducts(items);
        }
    },[data, category])
    return (
        <Fragment>
        <h2 className="title">{category.toUpperCase()}</h2>
        <div className="category-container">
            {
                products && products.map((product)=> <ProductCard product={product} key = {product.id}/>)
            }
        </div>
        </Fragment>
    )
}

export default CategoryDetail