import { Cargo, User, DocsType, TransportType, LoadingType, PaymentType } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import CargoService from '../service/cargo-service.js';
import { Op } from "sequelize";

class CargoController {
  async cargoRegistration(req, res, next) {
    try {
      const { countryfrom, cityfrom, countryto, cityto, weightMin, weighMax, volumeMin, volumeMax, calendar, long, widthMax, heightMax, distanceto, distancefrom, userId, docs, transport, loading, danger, payment } = req.body
      const cargo = await CargoService.cargoRegistration({ countryfrom, cityfrom, countryto, cityto, weightMin: +weightMin, weighMax: +weighMax, volumeMin: +volumeMin, volumeMax: +volumeMax, calendar, long: +long, widthMax: +widthMax, heightMax: +heightMax, distanceto: +distanceto, distancefrom: +distancefrom, userId, docs, transport, loading, danger, payment })
      return res.json(cargo)
    } catch (e) {
      next(e)
    }
  }

  async getCargo(req, res, next) {
    try {
      const foundCargo = await CargoService.findCargo(req);
      return res.json(foundCargo)
    } catch (e) {
      next(e)
    }
  }

  async getMyCargos(req, res) {
    try {
      const { userId } = req.params
      const myCargoList = await Cargo.findAll({
        where: {
          [Op.and]: [
            { userId },
            { deleted: false }
          ]
        },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
        },
        {
          model: TransportType,
          as: 'transporttype',
        },
        {
          model: LoadingType,
          as: 'loadingtype',
        },
        {
          model: PaymentType,
          as: 'paymenttype',
        }
        ]
      });
      return res.json(myCargoList)
    } catch (e) {
      next(e)
    }
  }

  async getSearchCargos(req, res, next) {
    try {
      const search = req.params.search
      const cargoListFromSerach = await Cargo.findAll({
        where: {
          [Op.or]: [
            { countryfrom: search },
            { cityfrom: search },
            { countryto: search },
            { cityto: search }
          ],
          [Op.and]: [
            { deleted: false }
          ]
        },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
        },
        {
          model: TransportType,
          as: 'transporttype',
        },
        {
          model: LoadingType,
          as: 'loadingtype',
        },
        {
          model: PaymentType,
          as: 'paymenttype',
        }
        ]
      });
      return res.json(cargoListFromSerach)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req, res) {
    const cargos = await Cargo.findAll()
    return res.json(cargos)
  }
  async getOne(req, res) {
    const { id } = req.params
    const cargo = await Cargo.findOne(
      {
        where: { id },
      }
    )
    return res.json(cargo)
  }


  async deleteCargo(req, res) {
    try {
      await CargoService.deleteCargo(req, res);
      return res.json()
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteCargo error" })
    }
  }
}

export default new CargoController()