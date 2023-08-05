import Button from "../button/button.component"
import "./product-card.styles.scss"
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({product}) => {
    const {name,price,imageUrl} = product;
    const dispatch = useDispatch();
    const addCartToItem = () => {
        dispatch(addItemToCart(product));
    }
    return (
    <div className="product-card-container">
        <img src = {imageUrl} alt={`${name}`}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType="inverted" onClick = {addCartToItem}>Add to cart</Button>
    </div>
    )
}

export default ProductCard;