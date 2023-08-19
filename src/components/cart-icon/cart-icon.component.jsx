import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectorForCartItemsinCartReducer, selectorForToggleStateInCartReducer } from "../../store/cart/cart.selector";
import { setToggleState } from "../../store/cart/cart.reducer";

const CartIcon = () => {
    const cartItems = useSelector(selectorForCartItemsinCartReducer);
    const toggleState = useSelector(selectorForToggleStateInCartReducer);
    const dispatch = useDispatch();
    const getCartItemLength = () => {
       return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity,0);
    }
    return (
        <div className="cart-icon-container" onClick={() => dispatch(setToggleState(!toggleState))}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{getCartItemLength()}</span>
        </div>
    )
};

export default CartIcon