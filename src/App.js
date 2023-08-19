import {Routes,Route} from "react-router-dom"
import Home from "./Routes/home/home.component"
import NavigationBar from "./Routes/navigation-bar/navigation-bar.component"
import Authentication from "./Routes/authentication/authentication.component"
import Shop from "./Routes/shop/shop.component"
import CheckOut from "./Routes/checkout/checkout.component"
import { useEffect } from "react"
import { createUserDocumentFromAuth, onAuthChangeHandler } from "./utils/firebase/firebase.utils"
import { setCurrentUser } from "./store/user/user.reducer"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const unSubsriber = onAuthChangeHandler((user)=>{
        if (user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });
    return unSubsriber;
  },[]);
  return (
    <Routes>
      <Route path="/" element = {<NavigationBar/>}>
        <Route index element = {<Home/>}/>
        <Route path="shop/*" element = {<Shop/>}/>
        <Route path="auth" element = {<Authentication/>}/>
        <Route path = "checkout" element = {<CheckOut/>}/>
      </Route>
    </Routes>
  );
}

export default App;