import CategoriesPreview from "../categories-preview/categories-preview";
import CategoryDetail from "../category-detail/category-detail.component";
import "./shop.styles.scss"
import { Route, Routes } from "react-router-dom";

const Shop = () => {
    return(
   <Routes>
        <Route index element = {<CategoriesPreview/>}/>
        <Route path=":category" element = {<CategoryDetail/>}/>
   </Routes>
    )
}

export default Shop;