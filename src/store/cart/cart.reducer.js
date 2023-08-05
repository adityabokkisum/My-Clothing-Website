import { CART_ACTION_TYPES } from "./cart.types";

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


export const cartReducer = (state = INIT_STATE,action) => {
    const {type,payload} = action;
    let newCartItems = [];
    switch (type) {
        case CART_ACTION_TYPES.ADD_CART_ITEM:
            newCartItems = addCardItem(payload,state);
            return {
                ...state,
                cartItems: newCartItems
            }
        case CART_ACTION_TYPES.REMOVE_CART_ITEM:
            newCartItems = removeCartItem(payload,state);
            return {
                ...state,
                cartItems: newCartItems
            }
        case CART_ACTION_TYPES.TOGGLE_STATE:
            return {
                ...state,
                toggleState: payload
            }
        default:
            return state;
    }
}