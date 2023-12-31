import ProductCard from "../product-card-component/product-card.component"
import "./category-preview.styles.scss"
import { Link } from "react-router-dom"

const CategoryPreview = ({products,title})=> {
    return (
        <div className="category-preview-container">
            <h2>
                <Link className="title" to={title}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_,idx)=>idx<4)
                    .map((product)=> <ProductCard key = {product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;