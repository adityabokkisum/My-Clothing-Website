import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss"
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignUpStart } from "../../store/user/user.action";

const { useState} = require("react");

const SignUpForm = () => {
    const dispatch = useDispatch();
    const oDefaultFormFields ={
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const [formFields,setFormDetails] = useState(oDefaultFormFields);
    const onChangeHandler = (event) => {
        const {name,value} = event.target;
        setFormDetails ({...formFields,[name]:value});
    };
    const onSubmitHandler = async (oEvent) => {
        oEvent.preventDefault();
        const aHtmlFormInstance = Array.from(oEvent.target);
        const oCurrentState = getUserEnteredValues(aHtmlFormInstance);
        if (oCurrentState.password !== oCurrentState.confirmPassword) return;
        try {
            const displayName = oCurrentState.name;
            dispatch(emailSignUpStart(oCurrentState.email,oCurrentState.password,{displayName}));
            setFormDetails(oDefaultFormFields);
        } catch (error) {
        }
    };
    const getUserEnteredValues = (aUserEnteredValues) => {
        const oValues = {};
        aUserEnteredValues.forEach((htmlElement) => {
            oValues[htmlElement.name] = htmlElement.value;
        })
        return oValues;
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Signup with your email and password</span>
            <form onSubmit = {onSubmitHandler}>
                <FormInput label="Display Name" name = "name" onChange={onChangeHandler} value = {formFields.name} required/>
                <FormInput type = "email" label="Email" name="email" onChange={onChangeHandler} value = {formFields.email} required/>
                <FormInput type = "password" label="Password" name = "password" onChange={onChangeHandler} value = {formFields.password} required/>
                <FormInput type = "password" label="Confirm Password" name = "confirmPassword" onChange={onChangeHandler} value = {formFields.confirmPassword} required/>
                <Button children="SUBMIT" type = "submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;