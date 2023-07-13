import { Transport, transportDocs, transportTransportType, transportLoading, transportPayment, DocsType, TransportType, LoadingType, PaymentType, User } from "../models/models.js";
import TransportDto from "../dtos/transport-dto.js";
import { Op } from 'sequelize';

class TransportService {
  async transportRegistration({ countryfrom, regions, location, weighMax, long, widthMax, heightMax, userId, docs, transporttype, loading, danger, payment }) {
    const transport = await Transport.create({ countryfrom, regions, location, weighMax, long, widthMax, heightMax, userId, danger });
    const transportDto = new TransportDto(transport);
    if (docs && docs.length > 0) {
      docs.forEach(async (doc) => {
        await transportDocs.create({ transportId: transportDto.id, docsTypeId: doc.id })
      })
    }
    if (transporttype && transporttype.length > 0) {
      transporttype.forEach(async (el) => {
        await transportTransportType.create({ transportId: transportDto.id, transportTypeId: el.id })
      })
    }
    if (loading && loading.length > 0) {
      loading.forEach(async (el) => {
        await transportLoading.create({ transportId: transportDto.id, loadingTypeId: el.id })
      })
    }
    if (payment && payment.length > 0) {
      payment.forEach(async (el) => {
        await transportPayment.create({ transportId: transportDto.id, paymentTypeId: el.id })
      })
    }
    const addOption = {
      "paymentTypeTransport": payment,
      "loadingTypeTransport": loading,
      "transportTypeTransport": transporttype,
      "docTypeTransport": docs
    }
    let transpotAddOption = { ...transport.dataValues, ...addOption }
    return transpotAddOption
  }

  async findTransport(req) {
    let queryData = req.query
    let where = {};

    for (let key in queryData) {
      if (queryData[key] !== null && queryData[key].length > 0 && key !== 'docs' && key !== 'transport' && key !== 'payment' && key !== 'loading') {
        where[key] = queryData[key]
      } else if (key === "weighMax") {
        where[key] = {
          [Op.gte]: queryData[key],
        }
      }
      else if (key === "widthMax") {
        where[key] = {
          [Op.gte]: queryData.widthMax,
        }
      }
      else if (key === "heightMax") {
        where[key] = {
          [Op.gte]: queryData.heightMax,
        }
      }
    }

    if ((!queryData.docs) && (!queryData.transport) && (!queryData.payment) && (!queryData.loading)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
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
      return transportInfo;
    }

    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.docs && queryData.docs.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.docs && queryData.docs.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },

        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },

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
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',

          where: { id: [...queryData.docs] },
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
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingTypeTransport',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.payment && queryData.payment.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
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
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.docs && queryData.docs.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
          where: { id: [...queryData.docs] },
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
      return transportInfo;
    } else if ((queryData.transport && queryData.transport.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'docTypeTransport',
        },
        {
          model: TransportType,
          as: 'transportTypeTransport',
          where: { id: [...queryData.transport] },
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
      return transportInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
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
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymentTypeTransport',
        }
        ]
      });
      return transportInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
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
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return transportInfo;
    }


    if ((queryData.docs && queryData.docs.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.payment && queryData.payment.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const transportInfo = await Transport.findAll({
        where: { ...where, deleted: false },
        include: [
          {
            model: DocsType,
            as: 'docTypeTransport',
            where: { id: [...queryData.docs] },
          },
          {
            model: User
          },
          {
            model: TransportType,
            as: 'transportTypeTransport',
            where: { id: [...queryData.transport] },

          },
          {
            model: LoadingType,
            as: 'loadingTypeTransport',
            where: { id: [...queryData.loading] },

          },
          {
            model: PaymentType,
            as: 'paymentTypeTransport',
            where: { id: [...queryData.payment] },
          }
        ]
      });
    }
  }

  async updateTransportLocation(req, res) {
    try {
      const { location, transportId } = req.body;
      await Transport.update({ location: location }, { where: { id: transportId } })
      return
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updateTransportLocation error" })
    }
  }

  async deleteTransport(req, res) {
    try {
      const { transportId } = req.body;
      await Transport.update({ deleted: true }, { where: { id: transportId } })
      return
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteTransport error" })
    }
  }

}

export default new TransportService()