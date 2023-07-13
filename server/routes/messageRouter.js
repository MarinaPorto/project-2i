import { Router } from "express";
import messageController from "../controllers/messageController.js";

export const routerMessage = new Router();

routerMessage.post('/create', messageController.createMessage)
routerMessage.post('/status', messageController.changeUnread)
routerMessage.get('/dialog/:dialogId', messageController.getMessages)
routerMessage.get('/unread/:userId', messageController.getAllUnread)