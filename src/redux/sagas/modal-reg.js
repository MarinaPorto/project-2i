
import { takeLatest, put } from "redux-saga/effects";
import { openRegistrForm, closeRegistrForm  } from "../reducers/registration-reducer";


export function* openRegistrationForm() {

        yield put (openRegistrForm());
    

}
export function* closeRegistrationForm() {

      
        yield put (closeRegistrForm());

}




export function* watchRegistrationForm() {
    yield takeLatest("OPEN_REGISTRATION_FORM", openRegistrationForm);
    yield takeLatest("CLOSE_REGISTRATION_FORM", closeRegistrationForm);
}