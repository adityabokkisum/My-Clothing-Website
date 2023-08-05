import { createAction } from "../../utils/Reduce/Reduce.utils"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

const setCategoriesStart = () => {
return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

const setCategoriesSuccess = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categories);
}

const setCategoriesFailed = (error) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error);
}
export const fetchCategoriesAsync = async(dispatch) => {
    dispatch(setCategoriesStart(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));
    try {
       const categoriesArray = await getCategoriesAndDocuments();
       dispatch(setCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(setCategoriesFailed(error));
    }
}