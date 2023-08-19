import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    toggleState: false,
    cartItems:[]
}

const addCardItem = (productToAdd,{cartItems}) => {

    const matchedItem = cartItems.find((item)=> {
        return item.id === productToAdd.id;
    });
    if (matchedItem) {
        return cartItems.map((item) => item.id === productToAdd.id ? {...item,quantity: item.quantity + 1} : item)
    }
   return [...cartItems,{...productToAdd,quantity:1}];
}

const removeCartItem = ({bRemoveTotalItem,id},{cartItems}) => {

    let newCartItems = structuredClone(cartItems);
    const {index,item} = getItemById(id,cartItems);
    const bRemoveItem = bRemoveTotalItem || item.quantity === 1;
    (bRemoveItem) ? newCartItems.splice(index,1) : newCartItems[index].quantity--;
    return newCartItems;
}

const getItemById = (id,cartItems) => {
    const item = cartItems.find((item) => item.id === id);
    const index = cartItems.findIndex((cartItem)=>cartItem.id === item.id);
    return {index,item};
}


export const cartSlice = createSlice({
    name: "cart",
    initialState: INIT_STATE,
    reducers: {
        setToggleState(state,action) {
            state.toggleState = action.payload
        },
        addItemToCart(state,action) {
            state.cartItems = addCardItem(action.payload,JSON.parse(JSON.stringify(state)));
        },
        removeItemFromCart(state,action) {
            state.cartItems = removeCartItem(action.payload,JSON.parse(JSON.stringify(state)));
        }
    }
})

export const {setToggleState,addItemToCart,removeItemFromCart} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;