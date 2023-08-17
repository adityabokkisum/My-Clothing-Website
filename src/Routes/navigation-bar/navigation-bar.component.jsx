import { Fragment } from "react"
import { Outlet,Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import "./navigation.styles.scss"
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector"
import { selectorForToggleStateInCartReducer } from "../../store/cart/cart.selector"
import { signOutUserStart } from "../../store/user/user.action"

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const toggleState = useSelector(selectorForToggleStateInCartReducer);
  const signOutUserFromApp = () => dispatch(signOutUserStart())
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
                <span className="nav-link" onClick={signOutUserFromApp}>SIGN OUT</span>
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