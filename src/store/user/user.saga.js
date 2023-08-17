import {takeLatest,put,all,call} from "redux-saga/effects";

import {USER_ACTION_TYPES} from "./user.types"

import { signInSuccess,signInFailed, emailSignUpSuccess, emailSignUpFailed, signOutUserSuccess, signOutUserFailed } from "./user.action";

import { getCurrentUser,createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth,additionalDetails) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth,userAuth,additionalDetails);
        yield(put(signInSuccess({id: userSnapShot.id,...userSnapShot.data()})))
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield( call(getSnapShotFromUserAuth,userAuth));
    } catch (error) {
        yield(put(signInFailed(error)));
    }
}

export function* signInWithGooglePopupFromFireBase() {
    try {
        const {user} = yield(call(signInWithGooglePopup));
        yield(call(getSnapShotFromUserAuth,user));
    } catch (error) {
        yield(put(signInFailed(error)));
    }
}

export function* signInWithEmailAndPasswordFromFireBase({payload: {email,password}}) {
    try {
        const {user} = yield(call(signInAuthUserWithEmailAndPassword,email,password));
        yield(call(getSnapShotFromUserAuth,user));
    } catch (error) {
        yield(put(signInFailed(error)));
    }
}

export function* signUpWithEmailAndPasswordFromFireBase(action) {
    try {
        const {payload} = action;
        const {email,password,additionalDetails} = payload;
        const {user} = yield(call(createAuthUserWithEmailAndPassword,email,password));
        yield(put(emailSignUpSuccess(user,additionalDetails)));
    } catch (error) {
        yield(put(emailSignUpFailed(error)));
    }
}

export function* signUpWithEmailAndPasswordSuccessFromFireBase(action) {
    const {payload} = action;
    const {user,additionalDetails} = payload;
    try {
        yield(call(getSnapShotFromUserAuth,user,additionalDetails));
    } catch (error) {
        yield(put(emailSignUpFailed(error)));
    }
}

export function* signOutUserFromApp() {
    try {
        yield(call(signOutUser));
        yield(put(signOutUserSuccess()))
    } catch (error) {
        yield(put(signOutUserFailed(error)))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,signInWithGooglePopupFromFireBase);
}

export function* onEmailSignIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,signInWithEmailAndPasswordFromFireBase);
}

export function* onEmailSignUp() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START,signUpWithEmailAndPasswordFromFireBase);
}

export function* onEmailSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS,signUpWithEmailAndPasswordSuccessFromFireBase);
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOutUserFromApp);
}

export function* userSagas() {
    yield all([call(onCheckUserSession),call(onGoogleSignIn),call(onEmailSignIn),call(onEmailSignUp),call(onEmailSignUpSuccess),call(onSignOut)])
}