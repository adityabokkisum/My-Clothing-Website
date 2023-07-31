import { useContext } from "react";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { CartContext } from "../contexts/cart.context";

const CartIcon = () => {
    const {toggleState,setToggleState,cartItems} = useContext(CartContext)
    const getCartItemLength = () => {
       return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0);
    }
    return (
        <div className="cart-icon-container" onClick={() => setToggleState(!toggleState)}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{getCartItemLength()}</span>
        </div>
    )
};

export default CartIcon