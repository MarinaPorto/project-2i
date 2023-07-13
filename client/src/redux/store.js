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
import { userRoleReducer } from "./reducers/user-role-reducer";
import { userDataReducer } from "./reducers/user-data-reducer";
import { cargoRegistrationReducer } from "./reducers/cargo-registration-reducer";
import { cargoUsersReducer } from "./reducers/cargo-users-reducer";
import { cargoFoundReducer } from "./reducers/cargo-search-reducer";
import { currentIdReducer } from "./reducers/current-id-reducer";
import { transportsUserReducer } from "./reducers/transports-user-reducer";
import { transportFoundReducer } from "./reducers/transport-search-reducer";
import { currentImgReducer } from "./reducers/current-img-reducer";
import { currentSelectedUserReducer } from "./reducers/current-selected-user-reducer";
import { editFormReducer } from "./reducers/edit-form-reducer";
import { chatIsOpenReducer } from "./reducers/chat-reducer";
import { searchIsOpenReducer } from "./reducers/search-reducer";
import { dialogsReducer } from "./reducers/dialogs-reducer";
import { unreadMessagesReducer } from "./reducers/unread-reducer";
import { usersReducer } from "./reducers/users-list-reducer";
import { editLocationFormReducer } from "./reducers/edit-location-reducer";
import { editAccountFormReducer } from "./reducers/edit-account-reducer";
import { successModalReducer } from "./reducers/success-reducer";


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
  userRole: userRoleReducer,
  userData: userDataReducer,
  cargoRegistration: cargoRegistrationReducer,
  cargoUsers: cargoUsersReducer,
  cargoFound: cargoFoundReducer,
  currentId: currentIdReducer,
  transportsUser: transportsUserReducer,
  transportFound: transportFoundReducer,
  currentImg: currentImgReducer,
  currentSelectedUser: currentSelectedUserReducer,
  editForm: editFormReducer,
  chatIsOpen: chatIsOpenReducer,
  searchIsOpen: searchIsOpenReducer,
  myDialogs: dialogsReducer,
  unreadMessages: unreadMessagesReducer,
  users: usersReducer,
  editLocationForm: editLocationFormReducer,
  editAccountForm: editAccountFormReducer,
  successModal: successModalReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);