import { useContext } from "react";
import "./checkout.styles.scss"
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { selectorForCartItemsinCartReducer } from "../../store/cart/cart.selector";

const CheckOut = () => {
    const cartItems = useSelector(selectorForCartItemsinCartReducer);
    const totalAmount = cartItems.reduce((acc,curr)=>curr.quantity * curr.price + acc,0);
    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => {
                    return <CheckOutItem key = {item.id} cartItem={item}/>
                })
            }
            <h2 className="total">Total : {"$" + " " + totalAmount}</h2>

        </div>
    )
}

export default CheckOut;