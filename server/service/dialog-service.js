
import { Dialog, User, dialogPersonal } from "../models/models.js";
import sequelize from '../db.js';
import { Op, where } from 'sequelize';
import ApiError from "../error/ApiError.js";
import userService from "./user-service.js";

class DialogService {

  async createDialog(req) {
    try {
      const { author, partner } = req.body;
      const isDialogs = await Dialog.findAll({
        where: { author, partner }
      }
      )
      if (isDialogs.length > 0) {
        return isDialogs;
      } else {
        const dialog = await Dialog.create({ author, partner })
        await dialogPersonal.create({ userId: author, dialogId: dialog.id, partner })
        const partnerData = await User.findOne({ where: { id: partner }, attributes: ['id', 'name', 'surname'] })
        let dialogsInfo = { ...dialog.dataValues, ...partnerData }
        return dialogsInfo;
      }

    } catch (e) {
      console.log(e);
      console.log("Dialogs not created");
    }
  }

  async findDialogByAuthor(req) {
    try {
      const { author } = req.params;
      const foundDialogs = await Dialog.findAll({
        where: {
          [Op.or]: [
            { author },
            { partner: author }
          ]
        }
      })

      async function processArray(foundDialogs) {
        let data_1;

        let data_2 = [];
        for (let element of foundDialogs) {
          if (element.partner == +author) {
            data_1 = await User.findOne({ where: { id: element.author }, attributes: ['id', 'name', 'surname'] });
          } else {
            data_1 = await User.findOne({ where: { id: element.partner }, attributes: ['id', 'name', 'surname'] });
          }

          data_2.push({ ...element.dataValues, ...data_1 })
        }
        return data_2
      }
      let newPartnerData = await processArray(foundDialogs)
      return newPartnerData;
    } catch (e) {
      console.log(e);
      console.log("Dialogs not found");
    }
  }

  async findOneDialogAndDelete(author) {
    try {
      const foundDialogs = await Dialog.findOne({ where: { author } })
      await Dialog.destroy({ where: { author } })
      return foundDialogs;
    } catch (e) {
      console.log(e);
      console.log("Dialogs not delited");
    }
  }
}

export default new DialogService()