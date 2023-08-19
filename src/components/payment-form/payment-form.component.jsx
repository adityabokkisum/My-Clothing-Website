import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./payment-form.styles.scss"
import Button from "../button/button.component";
import { useSelector } from "react-redux";
import { selectorForTotalAmount } from "../../store/cart/cart.selector";


const PaymentForm =() => {
    const stripe = useStripe();
    const elements = useElements();
    const totalAmount = useSelector(selectorForTotalAmount)
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const response = await fetch("/.netlify/functions/create-payment-intent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({amount:totalAmount*100})
        }).then(res => res.json());
        const {paymentIntent: {client_secret} } = response
        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Adithya Bokkisum",
                    address: "510 Towsend st"
                }
            }
        });
        if (paymentResult.error) {
            alert(paymentResult.error.message)
        } else if(paymentResult.paymentIntent.status === "succeeded") {
            alert("payment successfully done");
        }
    }
    return (
        <div className="paymentFormContainer">
            <form className="formContainer" onSubmit={paymentHandler}>
                <CardElement/>
                <Button buttonType="inverted">Pay Now</Button>
            </form>
        </div>
    )
}

export default PaymentForm