import "./cart-dropdown.styles.scss"
import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectorForCartItemsinCartReducer } from "../../store/cart/cart.selector"

const CartDropDown = () => {
    const cartItems = useSelector(selectorForCartItemsinCartReducer);
    const navigate = useNavigate();
    const onClickhandler = () => {
        navigate("/checkout");
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map((item)=> <CartItem key = {item.id} cartItem={item}/>)
                }
            </div>
            <Button onClick = {onClickhandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropDown