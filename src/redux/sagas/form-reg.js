
import { takeLatest, put } from "redux-saga/effects";
import { openRegistrForm2, closeRegistrForm2 } from "../reducers/registration-stage2-reducer";


export function* openRegistrationFormStage2() {
  yield put(openRegistrForm2());
}

export function* closeRegistrationFormStage2() {
  yield put(closeRegistrForm2());

}

export function* watchRegistrationForm() {
  yield takeLatest("OPEN_REGISTRATION_FORM_STAGE_2", openRegistrationFormStage2);
  yield takeLatest("CLOSE_REGISTRATION_FORM_STAGE_2", closeRegistrationFormStage2);
}