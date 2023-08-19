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

const selectionCartTotalIdentifier = createSelector(
    [selectionStateIdentifier],
    (cartSlice) => cartSlice.cartTotal
)

export const selectorForCartItemsinCartReducer = createSelector(
    [selectionCartItemChangeIdentifier],
    (categories) => categories
)

export const selectorForToggleStateInCartReducer = createSelector(
    [selectionCartToggleChangeIdentifier],
    (toggleState) => toggleState
)

export const selectorForTotalAmount = createSelector(
    [selectionCartTotalIdentifier],
    (cartTotal) => cartTotal
)