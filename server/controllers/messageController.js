import { Message, Dialog } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import MessageService from '../service/message-service.js';


class MessageController {
  async getMessages(req, res, next) {
    try {
      const messages = await MessageService.getMessagesForDialog(req);
      return res.json(messages);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async createMessage(req, res, next) {
    try {
      const message = await MessageService.createMessage(req);
      return res.json(message);

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }


  async changeUnread(req, res, next) {
    try {
      const message = await MessageService.changeUnread(req);
      return res.json(message);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllUnread(req, res, next) {
    try {
      const message = await MessageService.getAllUnread(req);
      return res.json(message);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new MessageController()