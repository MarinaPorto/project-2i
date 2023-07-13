import ApiError from "../error/ApiError.js"
import { User, Like, Dislike } from '../models/models.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import * as url from 'url';
import UserService from "../service/user-service.js";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { validationResult } from "express-validator";
import fs from "fs";


class UserController {
  async userRegistration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Ошибка при валидации", errors.array()))
      }
      const { role, work, name, surname, secondname, orgname, country, city, number, unp, datapolicy } = req.body
      const { email, password } = req.body
      const { verification } = req.files
      let fileName = uuidv4() + ".jpg"
      verification.mv(path.resolve(__dirname, '..', 'static', 'docs', fileName))
      const userData = await UserService.userRegistration({ email, password, role, work, name, surname, secondname, orgname, country, city, number, unp, datapolicy, verification: fileName })
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }

  async uploadAvatar(req, res) {
    try {
      let img = req.files.file
      const user = await User.findOne({ where: { id: req.body.userId } })
      let imgName = uuidv4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', 'avatars', imgName))
      user.img = imgName
      await user.save()
      return res.json(imgName)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Upload avatar error" })
    }
  }

  async updateUserData(req, res) {
    try {
      const { orgname, surname, name, country, city, number, unp, userId } = req.body;
      const updateUserData = await UserService.updateUserData(orgname, surname, name, country, city, number, unp, userId);
      return res.json(updateUserData)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updateUserData error" })
    }
  }

  async activationUser(req, res) {
    try {
      const { userId } = req.body;
      const activationUserStatus = await UserService.activationUser(userId);
      return res.json(activationUserStatus)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updateUserData error" })
    }
  }
  async deleteUser(req, res) {
    try {
      const { userId } = req.body;
      const activationUserStatus = await UserService.deleteUser(userId);
      return res.json(activationUserStatus)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteUser error" })
    }
  }

  async addUserAccount(req, res) {
    try {
      const userAccount = await UserService.addUserAccount(req);
      return res.json(userAccount)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "addUserAccount error" })
    }
  }


  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }


  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers(req);
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async getUsersRequestedInvoice(req, res, next) {
    try {
      const users = await UserService.getUsersRequestedInvoice(req);
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }


  async getUser(req, res, next) {
    try {
      const userInfo = await UserService.getUser(req);
      return res.json(userInfo)
    } catch (e) {
      next(e)
    }
  }
  async sendPasswordLink(req, res, next) {
    try {
      const password = await UserService.sendPasswordLink(req, res, next);
      return res.json(password)
    } catch (e) {
      next(e)
    }
  }
  async updatePassword(req, res, next) {
    try {
      await UserService.updatePassword(req, res, next);
      return res
    } catch (e) {
      next(e)
    }
  }

  async setNewPassword(req, res, next) {
    try {
      let resp = await UserService.saveNewPassword(req, res, next);
      return res.json(resp.status)
    }
    catch (e) {
      next(e)
    }
  }
  async uploadInvoice(req, res, next) {
    try {
      let email = req.body.email;
      let invoice = req.files.file
      invoice.mv(path.resolve(__dirname, '..', 'static', 'invoices', invoice.name))
      let file = {
        filename: invoice.name,
        path: path.resolve(__dirname, '..', 'static', 'invoices', invoice.name),
      }
      await UserService.sendInvoice(email, file, res);
      fs.unlink(path.resolve(__dirname, '..', 'static', 'invoices', invoice.name), (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      return res.json()
    } catch (e) {
      next(e)
    }
  }


  async getInvoice(req, res, next) {
    try {
      await UserService.getInvoice(req, res);
      return res.json()
    } catch (e) {
      next(e)
    }
  }


  async getUserByName(req, res, next) {
    try {
      const userName = await UserService.getUserByName(req);
      return res.json(userName)
    } catch (e) {
      next(e)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const userAccount = await UserService.getUserAccount(req);
      return res.json(userAccount)
    } catch (e) {
      next(e)
    }
  }

  async closeSubscription(req, res, next) {
    try {
      await UserService.closeSubscription(req, res);
      return res.json()
    } catch (e) {
      next(e)
    }
  }

  async getLikes(req, res, next) {
    try {
      const likesInfo = await UserService.getLikes(req);
      return res.json(likesInfo)
    } catch (e) {
      next(e)
    }
  }

  async getDislikes(req, res, next) {
    try {
      const dislikesInfo = await UserService.getDislikes(req);
      return res.json(dislikesInfo)
    } catch (e) {
      next(e)
    }
  }


  async upLike(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    try {
      const like = await Like.create({ likesRecipientId: likesRecipient, likesSenderId: likesSender });
      Dislike.destroy({ where: { likesRecipientId: likesRecipient, likesSenderId: likesSender } });
      return res.json(like)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "up like error" })
    }
  }
  async unLike(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    try {
      Like.destroy({ where: { likesRecipientId: likesRecipient, likesSenderId: likesSender } });
      return res.json({ "message": "like" })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "un like error" })
    }
  }

  async unDislike(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    try {
      Dislike.destroy({ where: { likesRecipientId: likesRecipient, likesSenderId: likesSender } });
      return res.json({ "message": "dislike" })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "un dislike error" })
    }
  }

  async upDislike(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    try {
      const dislike = await Dislike.create({ likesRecipientId: likesRecipient, likesSenderId: likesSender });
      Like.destroy({ where: { likesRecipientId: likesRecipient, likesSenderId: likesSender } });
      return res.json({ "message": "dislike" })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "up dislike error" })
    }
  }
}

export default new UserController()