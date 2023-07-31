import { Fragment,useContext } from "react"
import { Outlet,Link } from "react-router-dom"
import { UserContext } from "../../components/contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import "./navigation.styles.scss"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../components/contexts/cart.context"

const NavigationBar = () => {
  const {currentUser} = useContext(UserContext);
  const {toggleState} = useContext(CartContext)
    return (
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to="/">
            <CrwnLogo/>
        </Link>
        <div className="nav-links-container">
            <Link className="nav-link" to = "/shop">
                SHOP
            </Link>
            {
              currentUser ? (
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              ) :(
              <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
            )
            }
          <CartIcon/>
        </div>
        {
          toggleState && <CartDropDown/>
        }
        </div>
        <Outlet/>
      </Fragment>
    )
  }
  export default NavigationBar