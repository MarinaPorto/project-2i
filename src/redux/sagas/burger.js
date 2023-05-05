
import { takeLatest, put } from "redux-saga/effects";
import { openBurger, closeBurger  } from "../reducers/burger-reducer";


export function* workerSaga() {

        yield openBurger();
        yield closeBurger();

}

export function* watchGetProduct() {
    yield takeLatest("O_B", workerSaga);
}