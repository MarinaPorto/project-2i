import { Router } from "express";
import dialogController from "../controllers/dialogController.js";

export const routerDialog = new Router();

routerDialog.post('/create', dialogController.createDialog)
routerDialog.get('/:author', dialogController.findDialogsByAuthor)
routerDialog.delete('/delete/:author', dialogController.findOneDialogAndDelete)