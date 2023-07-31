import { createContext, useEffect, useState} from "react";
import { createUserDocumentFromAuth, onAuthChangeHandler, signOutUser } from "../../utils/firebase/firebase.utils";

//As the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
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