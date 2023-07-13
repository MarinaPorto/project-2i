import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";
import authCheck from "../middleware/auth-middleware.js";
import roleCheck from "../middleware/check-role-middleware.js";


export const routerUser = new Router();

routerUser.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.userRegistration,
)
routerUser.post('/login', userController.login)
routerUser.post('/logout', userController.logout)
// routerUser.post('/activate/:link', userController.activate)
routerUser.post('/activation', roleCheck('Admin'), userController.activationUser)
routerUser.post('/delete', roleCheck('Admin'), userController.deleteUser)

routerUser.post('/avatar', userController.uploadAvatar)
routerUser.post('/invoice', userController.uploadInvoice)
routerUser.post('/getinvoice', userController.getInvoice)
routerUser.post('/like', userController.getLikes)
routerUser.post('/dislike', userController.getDislikes)
routerUser.post('/upLike', userController.upLike)
routerUser.post('/unLike', userController.unLike)
routerUser.post('/unDislike', userController.unDislike)
routerUser.post('/upDislike', userController.upDislike)
routerUser.post('/update', authCheck, userController.updateUserData)
routerUser.post('/close-subscription', userController.closeSubscription)

routerUser.get('/data/:id', userController.getUser)
routerUser.get('/refresh', userController.refresh)
routerUser.post('/account', roleCheck('Admin'), userController.addUserAccount)
// routerUser.get('/auth', userController.check)
// routerUser.get('/users', userController.getUsers)
routerUser.get('/invoice-list',  userController.getUsersRequestedInvoice)
// routerUser.get('/users', authCheck, userController.getUsers)
routerUser.get('/users', roleCheck('Admin'), userController.getUsers)
routerUser.get('/getuser/:name', userController.getUserByName)
routerUser.get('/getaccount/:userId', userController.getUserAccount)

routerUser.post('/passwordforgot', userController.sendPasswordLink)

routerUser.get('/password/:passwordLink', userController.updatePassword)
routerUser.post('/password/save', userController.setNewPassword)



