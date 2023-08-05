import { createAction } from "../../utils/Reduce/Reduce.utils"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

export const setCategories = (categories) => {
return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES,categories);
}