import { Router } from "express";
import transportController from "../controllers/transportController.js";

export const routerTransport = new Router();

routerTransport.post('/registration', transportController.transportRegistration)
routerTransport.post('/delete', transportController.deleteTransport)
routerTransport.get('/filter', transportController.findTransport)
routerTransport.get('/list/:userId', transportController.getMyTransport)
routerTransport.get('/searchlist/:search', transportController.getSearchTransport)
routerTransport.post('/update', transportController.updateTransportLocation)