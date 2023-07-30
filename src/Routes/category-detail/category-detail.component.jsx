import { useParams } from "react-router-dom"
import "./category-detail.styles.scss"
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card-component/product-card.component";

const CategoryDetail = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext)
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[categoriesMap, category])
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