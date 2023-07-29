import { useContext } from "react";
import "./checkout-item.styles.scss"
import { CartContext } from "../contexts/cart.context";

const CheckOutItem = ({cartItem}) => {
    const {imageUrl,price,quantity,name,id} = cartItem;
    const {addItemToCart,removeItemFromCart} = useContext(CartContext)
    const onIncreaseQuantity = () => {
        addItemToCart(cartItem);
    };
    const onRemoveItem = (bRemoveTotalItem) => {
        removeItemFromCart(id,bRemoveTotalItem);
    };
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt = {`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick = {()=>onRemoveItem(null)}> &#10094; </div>
                <span className="value">{quantity}</span>
                <div className = "arrow" onClick = {onIncreaseQuantity}> &#10095; </div>
            </span>
            <span className="price"> {price} </span>
            <div className="remove-button" onClick={() => onRemoveItem(true)}>&#10005;</div>
        </div>
    )
}

export default CheckOutItem;