import { createAction } from "../../utils/Reduce/Reduce.utils"
import { CART_ACTION_TYPES } from "./cart.types"

export const setToggleState = (toggleState) => {
    return createAction(CART_ACTION_TYPES.TOGGLE_STATE,toggleState);
}

export const addItemToCart = (cartItems) => {
    return createAction(CART_ACTION_TYPES.ADD_CART_ITEM,cartItems);
}

export const removeItemFromCart = (id,bRemoveTotalItem) => {
    return createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM,{id,bRemoveTotalItem});
}

export const setTotalAmount = (iTotalAmount) => {
    return createAction(CART_ACTION_TYPES.TOTAL_AMOUNT,iTotalAmount);
}