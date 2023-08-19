import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
    categories: []
};

export const categroriesSlice = createSlice({
    name: "categories",
    initialState: INIT_STATE,
    reducers: {
        setCategories(state,action) {
            state.categories = action.payload;
        }
    }
})

export const {setCategories} = categroriesSlice.actions;

export const categoriesReducer =categroriesSlice.reducer;