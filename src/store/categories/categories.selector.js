import { createSelector } from "reselect";

const selectionCategoryReducer = (state) => state.categories;



export const selectorCategories = createSelector(
  [selectionCategoryReducer],
  (categoriesSlice)=>categoriesSlice.categories
)

export const selectorCategory = createSelector(
  [selectorCategories],
  (categories)=>{
    console.log(categories);
    return categories.reduce((acc,category)=>{
      const {title,items} = category;
      acc[title.toLowerCase()] = items;
      return acc;
    },{})
  }
)