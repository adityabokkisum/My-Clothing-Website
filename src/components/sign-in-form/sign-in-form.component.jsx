import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss"
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const SignInForm = () => {
    const dispatch = useDispatch();
    const oDefaultFormFields ={
        email: "",
        password: ""
    };

    const [formFields,setFormDetails] = useState(oDefaultFormFields);
    const resetFormFields = () =>{
        setFormDetails(oDefaultFormFields);
    };
    const onSubmitHandler =  (oEvent) => {
        oEvent.preventDefault();
        const aHtmlFormInstance = Array.from(oEvent.target);
        const oCurrentState = getUserEnteredValues(aHtmlFormInstance);
        try {
            dispatch(emailSignInStart(oCurrentState.email,oCurrentState.password));
            resetFormFields();
        } catch (error) {
        }
    }
    const getUserEnteredValues = (aUserEnteredValues) => {
        const oValues = {};
        aUserEnteredValues.forEach((htmlElement) => {
            oValues[htmlElement.name] = htmlElement.value;
        })
        return oValues;
    }
    const signUsingWithGooglePopup = () => {
        dispatch(googleSignInStart());
    }
    const onChangeHandler = (oEvent) => {
        const {name,value} = oEvent.target;
        setFormDetails ({...formFields,[name]:value});
    }
return (
    <div className="sign-in-container">
         <h2>I already have an account</h2>
            <span>Signin with your email and password</span>
            <form onSubmit = {onSubmitHandler}>
            <FormInput type = "email" label="Email" name="email" onChange={onChangeHandler} value = {formFields.email} required/>
            <FormInput type = "password" label="Password" name = "password" onChange={onChangeHandler} value = {formFields.password} required/>
            <div className="buttons-container">
                <Button children="SIGN IN" type = "submit"/>
                <Button children="GOOGLE SIGN IN" buttonType="google" onClick = {signUsingWithGooglePopup} type = "button"/>
            </div>
            </form>
    </div>
);
}

export default SignInForm;