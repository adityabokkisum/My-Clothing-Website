import { createContext, useEffect, useReducer} from "react";
import { createUserDocumentFromAuth, onAuthChangeHandler} from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/Reduce/Reduce.utils";

const userReducer = (state,action) => {
    console.log("dispatch")
    console.log(action);
    const {type,payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return new Error(`Unhandled type of ${type} userReducer`);
    }
}

const INIT_STATE = {
    currentUser: null
}

//As the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

export const UserProvider = ({children}) => {
    const [{currentUser},dispatch] = useReducer(userReducer,INIT_STATE);
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
    }
    useEffect(()=>{
        const unSubsriber = onAuthChangeHandler((user)=>{
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unSubsriber;
    },[]);
    const value = {currentUser,setCurrentUser}
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}