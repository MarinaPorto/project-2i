import { Router } from "express";
import cargoController from "../controllers/cargoController.js";

export const routerCargo = new Router();

routerCargo.post('/registration', cargoController.cargoRegistration)
routerCargo.post('/delete', cargoController.deleteCargo)
routerCargo.get('/', cargoController.getAll )
routerCargo.get('/filter', cargoController.getCargo )
routerCargo.get('/:id', cargoController.getOne)
routerCargo.get('/list/:userId', cargoController.getMyCargos)
routerCargo.get('/searchlist/:search', cargoController.getSearchCargos)