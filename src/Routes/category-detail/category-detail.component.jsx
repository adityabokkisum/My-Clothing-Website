import { useParams } from "react-router-dom"
import "./category-detail.styles.scss"
import { Fragment, useEffect, useState } from "react";
import ProductCard from "../../components/product-card-component/product-card.component";
import { useSelector } from "react-redux";
import { selectorCategory } from "../../store/categories/categories.selector";

const CategoryDetail = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectorCategory);
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