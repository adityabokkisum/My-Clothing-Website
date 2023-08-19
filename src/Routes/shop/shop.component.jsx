import { useEffect } from "react";
import CategoriesPreview from "../categories-preview/categories-preview";
import CategoryDetail from "../category-detail/category-detail.component";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux"

import "./shop.styles.scss"
import { setCategories } from "../../store/categories/categories.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Shop = () => {
  const dispatch = useDispatch();
    useEffect(()=> {
        getCategoriesAndDocuments().then((categoriesArray)=>{
            dispatch(setCategories(categoriesArray));
          })
    },[])
    return(
   <Routes>
        <Route index element = {<CategoriesPreview/>}/>
        <Route path=":category" element = {<CategoryDetail/>}/>
   </Routes>
    )
}

export default Shop;