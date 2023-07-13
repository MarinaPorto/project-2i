import { User, Dialog } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import DialogService from '../service/dialog-service.js';

class DialogController {

  async createDialog(req, res, next) {
    try {
      const { author, partner } = req.body;
      const dialog = await DialogService.createDialog(req);
      const io = req.app.get('socketio');
      io.emit("new-dialog", dialog)
      return res.json(dialog);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async findDialogsByAuthor(req, res, next) {
    try {
      const { author } = req.params;
      const foundDialogs = await DialogService.findDialogByAuthor(req);
      return res.json(foundDialogs);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async findOneDialogAndDelete(req, res, next) {
    try {
      const { author } = req.params;
      const foundDialogs = await DialogService.findOneDialogAndDelete(author);
      return res.json(foundDialogs);
    } catch (e) {
       next(ApiError.badRequest(e.message));
    }
  }
}

export default new DialogController()