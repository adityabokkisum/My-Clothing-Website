// import { createContext, useReducer} from "react";
// import { createAction } from "../../utils/Reduce/Reduce.utils";

// const CART_ACTION_TYPES = {
//     ADD_CART_ITEM: "ADD_CART_ITEM",
//     REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
//     TOGGLE_STATE: "TOGGLE_STATE"
// }

// const INIT_STATE = {
//     toggleState: false,
//     cartItems:[]
// }

// const cartReducer = (state,action) => {
//     const {type,payload} = action;
//     let newCartItems = [];
//     switch (type) {
//         case CART_ACTION_TYPES.ADD_CART_ITEM:
//             newCartItems = addCardItem(payload,state);
//             return {
//                 ...state,
//                 cartItems: newCartItems
//             }
//         case CART_ACTION_TYPES.REMOVE_CART_ITEM:
//             newCartItems = removeCartItem(payload,state);
//             return {
//                 ...state,
//                 cartItems: newCartItems
//             }
//         case CART_ACTION_TYPES.TOGGLE_STATE:
//             return {
//                 ...state,
//                 toggleState: payload
//             }
//         default:
//         return new Error(`Unhandled type of ${type} cartReducer`);
//     }
// }


// const addCardItem = (productToAdd,{cartItems}) => {

//     const matchedItem = cartItems.find((item)=> {
//         return item.id === productToAdd.id;
//     });
//     if (matchedItem) {
//         return cartItems.map((item) => item.id === productToAdd.id ? {...item,quantity: item.quantity + 1} : item)
//     }
//    return [...cartItems,{...productToAdd,quantity:1}];
// }

// const removeCartItem = ({bRemoveTotalItem,id},{cartItems}) => {

//     let newCartItems = structuredClone(cartItems);
//     const {index,item} = getItemById(id,cartItems);
//     const bRemoveItem = bRemoveTotalItem || item.quantity === 1;
//     (bRemoveItem) ? newCartItems.splice(index,1) : newCartItems[index].quantity--;
//     return newCartItems;
// }

// const getItemById = (id,cartItems) => {
//     const item = cartItems.find((item) => item.id === id);
//     const index = cartItems.findIndex((cartItem)=>cartItem.id === item.id);
//     return {index,item};
// }

// //As the actual value you want to access
// export const CartContext = createContext({
//     toggleState: false,
//     setToggleState: () => null,
//     cartItems:[],
//     addItemToCart: () => null,
//     removeItemFromCart: () => null
// });

// export const CartProvider = ({children}) => {
//     const [{cartItems,toggleState},dispatch] = useReducer(cartReducer,INIT_STATE);
//     const addItemToCart = (productToAdd) => {
//         dispatch(createAction(CART_ACTION_TYPES.ADD_CART_ITEM,productToAdd));
//     }
//     const removeItemFromCart = (id,bRemoveTotalItem) => {
//         dispatch(createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM,{id,bRemoveTotalItem}));
//     }
//     const setToggleState = (state) => {
//         dispatch(createAction(CART_ACTION_TYPES.TOGGLE_STATE,state))
//     }
//     const value = {toggleState,setToggleState,addItemToCart,cartItems,removeItemFromCart};
//     return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
// }