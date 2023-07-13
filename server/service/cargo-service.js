import { Cargo, cargoDocs, cargoTransport, cargoLoading, cargoPayment, DocsType, TransportType, LoadingType, PaymentType, User } from "../models/models.js";
import CargoDto from "../dtos/cargo-dto.js";
import { Op } from 'sequelize';

class CargoService {
  async cargoRegistration({ countryfrom, cityfrom, countryto, cityto, weightMin, weighMax, volumeMin, volumeMax, calendar, long, widthMax, heightMax, distanceto, distancefrom, userId, docs, transport, loading, danger, payment }) {

    const cargo = await Cargo.create({ countryfrom, cityfrom, countryto, cityto, weightMin, weighMax, volumeMin, volumeMax, calendar, long, widthMax, heightMax, distanceto, distancefrom, userId, danger });
    const cargoDto = new CargoDto(cargo);
    if (docs && docs.length > 0) {
      docs.forEach(async (doc) => {
        await cargoDocs.create({ cargoId: cargoDto.id, docsTypeId: doc.id })
      })
    }
    if (transport && transport.length > 0) {
      transport.forEach(async (el) => {
        await cargoTransport.create({ cargoId: cargoDto.id, transportTypeId: el.id })
      })
    }
    if (loading && loading.length > 0) {
      loading.forEach(async (el) => {
        await cargoLoading.create({ cargoId: cargoDto.id, loadingTypeId: el.id })
      })
    }
    if (payment && payment.length > 0) {
      payment.forEach(async (el) => {
        await cargoPayment.create({ cargoId: cargoDto.id, paymentTypeId: el.id })
      })
    }
    const addOption = {
      "paymenttype": payment,
      "loadingtype": loading,
      "transporttype": transport,
      "doctype": docs
    }
    let cargoAddOption = { ...cargo.dataValues, ...addOption }
    return (
      cargoAddOption
    )
  }

  async findCargo(req) {
    let queryData = req.query
    let where = {};

    for (let key in queryData) {
      if (queryData[key] !== null && queryData[key].length > 0 && key !== 'docs' && key !== 'transport' && key !== 'loading' && key !== 'payment') {
        where[key] = queryData[key]
        if (key === "weightMin") {
          where[key] = {
            [Op.lte]: queryData[key],
          }
        } else if (key === "weighMax") {
          where[key] = {
            [Op.gte]: queryData[key],
          }
        } else if (key === "volumeMin") {
          where[key] = {
            [Op.lte]: queryData.volumeMin,
          }
        }
        else if (key === "volumeMax") {
          where[key] = {
            [Op.gte]: queryData.volumeMax,
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
        else if (key === "distanceto") {
          where[key] = {
            [Op.lte]: queryData.distanceto,
          }
        }
        else if (key === "distancefrom") {
          where[key] = {
            [Op.gte]: queryData.distancefrom,
          }
        }
      }
    }


    if ((!queryData.docs) && (!queryData.transport) && (!queryData.payment) && (!queryData.loading)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
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
      return cargoInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transporttype',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingtype',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',

        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transporttype',
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingtype',

        },
        {
          model: PaymentType,
          as: 'paymenttype',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingtype',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.docs && queryData.docs.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transporttype',

        },
        {
          model: LoadingType,
          as: 'loadingtype',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.docs && queryData.docs.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transporttype',
          where: { id: [...queryData.transport] },
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
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingtype',
        },
        {
          model: PaymentType,
          as: 'paymenttype',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
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
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.docs && queryData.docs.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
        },
        {
          model: TransportType,
          as: 'transporttype',
        },
        {
          model: LoadingType,
          as: 'loadingtype',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.transport && queryData.transport.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.transport] },
        },
        {
          model: LoadingType,
          as: 'loadingtype',
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0) && (queryData.payment && queryData.payment.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.docs && queryData.docs.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [{
          model: User
        },
        {
          model: DocsType,
          as: 'doctype',
          where: { id: [...queryData.docs] },
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
      return cargoInfo;
    } else if ((queryData.transport && queryData.transport.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.transport] },
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
      return cargoInfo;
    }
    else if ((queryData.loading && queryData.loading.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.loading] },
        },
        {
          model: PaymentType,
          as: 'paymenttype',
        }
        ]
      });
      return cargoInfo;
    }
    else if ((queryData.payment && queryData.payment.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
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
          where: { id: [...queryData.payment] },
        }
        ]
      });
      return cargoInfo;
    }

    if ((queryData.docs && queryData.docs.length > 0) && (queryData.transport && queryData.transport.length > 0) && (queryData.payment && queryData.payment.length > 0) && (queryData.loading && queryData.loading.length > 0)) {
      const cargoInfo = await Cargo.findAll({
        where: { ...where, deleted: false },
        include: [
          {
            model: DocsType,
            as: 'doctype',
            where: { id: [...queryData.docs] },
          },
          {
            model: User
          },
          {
            model: TransportType,
            as: 'transporttype',
            where: { id: [...queryData.transport] },
          },
          {
            model: LoadingType,
            as: 'loadingtype',
            where: { id: [...queryData.loading] },
          },
          {
            model: PaymentType,
            as: 'paymenttype',
            where: { id: [...queryData.payment] },
          }
        ]
      });
      return cargoInfo;
    }
    return cargoInfo;
  }

  async deleteCargo(req, res) {
    try {
      const { cargoId } = req.body;
      await Cargo.update({ deleted: true }, { where: { id: cargoId } })
      return
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteCargo error" })
    }
  }

}


export default new CargoService()