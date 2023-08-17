import {takeLatest,all,call,put, take} from "redux-saga/effects"
import {CATEGORIES_ACTION_TYPES} from "./categories.types"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesSuccess,setCategoriesFailed } from "./categories.action";

export function* fetchCategoriesAsync () {
    try {
       const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(setCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(setCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}