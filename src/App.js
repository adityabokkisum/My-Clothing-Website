import {Routes,Route} from "react-router-dom"
import Home from "./Routes/home/home.component"
import NavigationBar from "./Routes/navigation-bar/navigation-bar.component"

const Shop = () => {
  return (
    <h1>I am Shopping</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<NavigationBar/>}>
        <Route index element = {<Home/>}/>
        <Route path="shop" element = {<Shop/>}/>
      </Route>
    </Routes>
  );
}

export default App;