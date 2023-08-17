import { useEffect } from "react";
import CategoriesPreview from "../categories-preview/categories-preview";
import CategoryDetail from "../category-detail/category-detail.component";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux"

import "./shop.styles.scss"
import { setCategoriesStart } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(setCategoriesStart());
    },[])
    return(
   <Routes>
        <Route index element = {<CategoriesPreview/>}/>
        <Route path=":category" element = {<CategoryDetail/>}/>
   </Routes>
    )
}

export default Shop;