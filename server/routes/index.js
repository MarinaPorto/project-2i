import { Router } from "express";
import { routerUser } from "./userRouter.js";
import { routerCargo } from "./cargoRouter.js";
import { routerTransport } from "./transportRouter.js";
import { routerDialog } from "./dialogRouter.js";
import { routerMessage } from "./messageRouter.js";

const router = new Router()

router.use('/user', routerUser)
router.use('/cargo', routerCargo)
router.use('/transport', routerTransport)
router.use('/dialog', routerDialog)
router.use('/message', routerMessage)


export default router;