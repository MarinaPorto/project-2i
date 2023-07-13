import { Dialog, Message } from "../models/models.js";

class MessageService {

  async getMessagesForDialog(req) {
    try {
      const { dialogId } = req.params;
      const messages = await Message.findAll({
        where:
          { dialogId },
      })
      return messages;
    } catch (e) {
      console.log(e);
    }
  }

  async createMessage(req) {
    try {
      const { text, dialogId, senderId, partnerId } = req.body;
      const message = await Message.create({ text, dialogId, senderId, partnerId })
      const io = req.app.get('socketio');
      return message;
    } catch (e) {
      console.log(e);
    }
  }

  async findDialogByAuthor(req) {
    try {
      const { dialog } = req.params;
      const foundMessages = await Dialog.findOne({ where: { dialog } })
      return foundMessages;
    } catch (e) {
      console.log(e);
    }
  }

  async changeUnread(req) {
    const { dialogId, partnerId } = req.body;
    try {
      const messages = await Message.update({ readed: true }, { where: { dialogId, partnerId, readed: false } })
      return messages
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "unread not changed" })
    }
  }

  async getAllUnread(req) {
    const { userId } = req.params;
    try {
      const messages = await Message.findAll({ where: { partnerId: userId, readed: false } })
      return messages
    }
    catch (e) {
      console.log(e)
      return res.status(400).json({ message: "unread messages not found" })
    }
  }
}

export default new MessageService()