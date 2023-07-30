import { createContext, useEffect, useState} from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

//As the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap:{}
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    useEffect(()=>{
        getCategoriesAndDocuments().then((categoryMap)=>{
            console.log("category-context",categoriesMap)
            setCategoriesMap(categoryMap);
        }).catch((oError)=>{
            console.log(oError);
        })
    },[]);
    const value = {categoriesMap}
    return <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
}