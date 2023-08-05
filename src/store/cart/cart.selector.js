import { createSelector } from "reselect";

const selectionStateIdentifier = (state) => state.cart;


const selectionCartItemChangeIdentifier = createSelector(
    [selectionStateIdentifier],
    (cartSlice) => cartSlice.cartItems
)

const selectionCartToggleChangeIdentifier = createSelector(
    [selectionStateIdentifier],
    (cartSlice) => cartSlice.toggleState
)

export const selectorForCartItemsinCartReducer = createSelector(
    [selectionCartItemChangeIdentifier],
    (categories) => categories
)

export const selectorForToggleStateInCartReducer = createSelector(
    [selectionCartToggleChangeIdentifier],
    (toggleState) => toggleState
)