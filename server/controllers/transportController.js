import { Transport, User, DocsType, LoadingType, PaymentType, TransportType } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import TransportService from '../service/transport-service.js';
import { Op } from "sequelize";

class TransportController {
  async transportRegistration(req, res, next) {
    try {
      const { countryfrom, regions, location, weighMax, long, widthMax, heightMax, userId, docs, transporttype, loading, payment, danger } = req.body
      const transport = await TransportService.transportRegistration({ countryfrom, regions, location, weighMax: +weighMax, long: +long, widthMax: +widthMax, heightMax: +heightMax, userId, docs, transporttype, loading, payment, danger })
      return res.json(transport)
    } catch (e) {
      next(e)
    }
  }

  async getMyTransport(req, res, next) {
    try {
      const { userId } = req.params
      const myTransportList = await Transport.findAll({
        where: {
          [Op.and]: [
            { userId },
            { deleted: false }
          ]
        },
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return res.json(myTransportList)
    } catch (e) {
      next(e)
    }
  }

  async findTransport(req, res, next) {
    try {
      const foundTransport = await TransportService.findTransport(req);
      return res.json(foundTransport)
    } catch (e) {
      next(e)
    }
  }

  async getSearchTransport(req, res, next) {
    try {
      const search = req.params.search
      const transportListFromSearch = await Transport.findAll({
        where: {
          [Op.or]: [
            { countryfrom: search },
            { regions: search },
            { location: search },
          ],
          [Op.and]: [
            { deleted: false }
          ],
        },
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return res.json(transportListFromSearch)
    } catch (e) {
      next(e)
    }
  }

  async updateTransportLocation(req, res) {
    try {
      const newLocation = await TransportService.updateTransportLocation(req);
      return res.json(newLocation)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updateTransportLocation error" })
    }
  }

  async deleteTransport(req, res) {
    try {
      await TransportService.deleteTransport(req, res);
      return res.json()
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteTransport error" })
    }
  }
}

export default new TransportController()