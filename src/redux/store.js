import { configureStore } from "@reduxjs/toolkit";
import { burgerReducer } from "./reducers/burger-reducer";
import { registrationReducer } from "./reducers/registration-reducer";
import { registrationFormReducer } from "./reducers/registration-stage2-reducer";
import { registrationFinishReducer } from "./reducers/registration-finish";
import { entranceModalReducer } from "./reducers/entrance-reducer";
import { passwordModalReducer } from "./reducers/password-reducer";
import { emailModalReducer } from "./reducers/email-reducer ";
import { modalPromoReducer } from "./reducers/modal-promo";
import { balancePageReducer } from "./reducers/balance-page-reducer";
import { sfModalReducer } from "./reducers/sf-reducer";
import { myPageReducer } from "./reducers/my-page-reducer";
import { selectedPageReducer } from "./reducers/selected-page-reducer";


import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const rootReducer = combineReducers({
  burger: burgerReducer,
  registration: registrationReducer,
  registrationForm: registrationFormReducer,
  registrationFinish: registrationFinishReducer,
  entranceModal: entranceModalReducer,
  passwordModal: passwordModalReducer,
  emailModal: emailModalReducer,
  modalPromo: modalPromoReducer,
  balancePage: balancePageReducer,
  sfModal: sfModalReducer,
  myPage: myPageReducer,
  selectedPage: selectedPageReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);