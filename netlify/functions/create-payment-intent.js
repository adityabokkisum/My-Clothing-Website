require("dotenv").config();

const stripe = require("stripe")("sk_test_51NgnKISCZewgbMkuPHB0jC6Ov9Tt51WBYectrtovC1jd8R76N8PchWTAQB8Uk7ZtrCh9w85i4DcCER69knFb3ffH00n51R84dX");

exports.handler = async (event) => {
    try {
        const {amount} = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ["card"],
            description: "Software development services"
        })
        return {
            statusCode: 200,
            body:JSON.stringify({paymentIntent})
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            body: JSON.stringify({error})
        }
    }
}