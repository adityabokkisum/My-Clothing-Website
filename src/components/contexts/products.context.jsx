import { createContext, useEffect, useState} from "react";
import SHOP_DATA from "../../shop-data.json"

//As the actual value you want to access
export const ProductContext = createContext({
    products: [],
    setProducts: () => null
});

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        setProducts(SHOP_DATA);
        console.log(SHOP_DATA);
    },[]);
    const value = {products,setProducts}
    return <ProductContext.Provider value = {value}>{children}</ProductContext.Provider>
}