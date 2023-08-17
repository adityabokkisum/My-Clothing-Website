import { createAction } from "../../utils/Reduce/Reduce.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

export const setCategoriesStart = () => {
return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export const setCategoriesSuccess = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categories);
}

export const setCategoriesFailed = (error) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error);
}