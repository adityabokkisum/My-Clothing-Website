import { createContext, useState} from "react";

const addCardItem = (productToAdd,cartItems) => {

    const matchedItem = cartItems.find((item)=> {
        return item.id === productToAdd.id;
    });
    if (matchedItem) {
        return cartItems.map((item) => item.id === productToAdd.id ? {...item,quantity: item.quantity + 1} : item)
    }
   return [...cartItems,{...productToAdd,quantity:1}];
}

const removeCartItem = (id,cartItems,bRemoveTotalItem,setCartItems) => {
    let newCartItems = structuredClone(cartItems);
    const {index,item} = getItemById(id,cartItems);
    const bRemoveItem = bRemoveTotalItem || item.quantity === 1;
    (bRemoveItem) ? newCartItems.splice(index,1) : newCartItems[index].quantity--;
    setCartItems(newCartItems);
}

const getItemById = (id,cartItems) => {
    const item = cartItems.find((item) => item.id === id);
    const index = cartItems.findIndex((cartItem)=>cartItem.id === item.id);
    return {index,item};
}

//As the actual value you want to access
export const CartContext = createContext({
    toggleState: false,
    setToggleState: () => null,
    cartItems:[],
    addItemToCart: () => null,
    removeItemFromCart: () => null
});

export const CartProvider = ({children}) => {
    const [toggleState,setToggleState] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(productToAdd,cartItems));
    }
    const removeItemFromCart = (id,bRemoveTotalItem) => {
        removeCartItem(id,cartItems,bRemoveTotalItem,setCartItems);
    }
    const value = {toggleState,setToggleState,addItemToCart,cartItems,removeItemFromCart};
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}