import { User, Cargo, Transport, Like, Dislike, Account } from "../models/models.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import MailService from "./mail-service.js";
import TokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../error/ApiError.js";
import { Op } from 'sequelize';
import sequelize from '../db.js';

class UserService {
  async userRegistration({ email, password, role, work, name, surname, secondname, orgname, country, city, number, unp, datapolicy, verification: fileName }) {
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw new Error(`Пользователь с таким email ${email} уже существует`)
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await User.create({ email, password: hashedPassword, activationLink, role, work, name, surname, secondname, orgname, country, city, number, unp, datapolicy, verification: fileName });

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async uploadDocuments(req, res) {
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

  async login(email, password) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw ApiError.badRequest(`Пользователь с таким email ${email} не найден`)
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest(`Указан неверный пароль`)
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } })
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async sendPasswordLink(req, res, next) {
    const { email } = req.body;
    try {
      const passwordLink = uuidv4();
      const user = await User.findOne({ where: { email } })
      user.passwordLink = passwordLink
      await user.save()
      await MailService.sendPasswordMail(email, `${process.env.API_URL}/api/user/password/${passwordLink}`);
      return passwordLink
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "sendPasswordLink error" })
    }
  }

  async updatePassword(req, res) {
    const { passwordLink } = req.params;
    try {
      const user = await User.findOne({ where: { passwordLink }, attributes: { exclude: ['password'] } })
      return res.redirect(`${process.env.CLIENT_URL}/password/confirm/${passwordLink}`)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updatePassword error" })
    }
  }

  async saveNewPassword(req, res) {
    const { password, passwordLink } = req.body;
    try {
      const user = await User.findOne({ where: { passwordLink } })
      const hashedPassword = await bcrypt.hash(password, 3);
      user.password = hashedPassword
      // user.passwordLink = null // !!!!!! после тестирования раскомментировать !!!!!!!!!!!!
      await user.save()
      return res

    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "saveNewPassword error" })
    }
  }

  async uploadInvoice(req, res) {
    try {
      let invoice = req.files.file
      const user = await User.findOne({ where: { id: req.body.userId } })
      user.invoice = invoice.name
      await user.save()
      return res.json(invoice)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Upload avatar error" })
    }
  }

  async sendInvoice(email, file, res) {
    try {
      await MailService.sendInvoiceMail(email, file, res);
      const user = await User.findOne({ where: { email } })
      user.invoice = false
      await user.save()
      return res
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "sendInvoice error" })
    }
  }

  async getInvoice(req, res) {
    const { userId } = req.body;
    try {
      const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
      user.invoice = true
      await user.save()
      return res
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "getInvoice error" })
    }
  }

  async updateUserData(orgname, surname, name, country, city, number, unp, userId, res) {
    try {
      const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
      user.orgname = orgname
      user.surname = surname
      user.name = name
      user.country = country
      user.city = city
      user.number = number
      user.unp = unp
      await user.save()
      return user
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "updateUserData error" })
    }
  }

  async activationUser(userId) {
    try {
      const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
      user.isActivated = true
      await user.save()
      return user
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "activationUser error" })
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findOne({ where: { id: userId } })
      user.deleted = true
      await user.save()
      await Cargo.update({ deleted: true }, { where: { userId } })
      await Transport.update({ deleted: true }, { where: { userId } })
      return user
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "deleteUser error" })
    }
  }

  async addUserAccount(req, res) {
    const { userId, account, date, email, type } = req.body;
    let currentDate = new Date();
    let newdate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let dateEnd = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    let period = null;

    try {
      const user = await User.findOne({ where: { id: userId } })
      let rest;
      if (type === "refill") {
        rest = +user.balance + (+account);
        user.balance = +user.balance + (+account)
        await user.save()
        await MailService.sendAccountMail(email);
      } else {
        if (user.period) {
          dateEnd = new Date(user.period.setMonth(user.period.getMonth() + 1));
        }
        period = dateEnd.toISOString().slice(0, 19).replace('T', ' ');
        rest = +user.balance - (+account);
        user.balance = +user.balance - (+account)
        user.isPaid = true
        user.period = period
        await user.save()
      }
      const userAccount = await Account.create({ userId, account, date: newdate, type, rest, period })
      return userAccount
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "addUserAccount error" })
    }
  }

  async closeSubscription(req, res) {
    const { userId } = req.body;
    try {
      const user = await User.findOne({
        where: { id: userId },
      })
      user.isPaid = false
      user.period = null
      await user.save()
      return res.json();
    }
    catch (e) {
      console.log(e)
      return res.status(400).json({ message: "addUserAccount error" })
    }
  }


  async getAllUsers(req) {
    const users = await User.findAndCountAll({
      where: { deleted: false },
      attributes: { exclude: ['password', "activationLink"] },
    });
    return users;
  }


  async getUsersRequestedInvoice(req) {
    const users = await User.findAll({
      where: { deleted: false, invoice: true },
      attributes: { exclude: ['password', "activationLink"] },
    });
    return users;
  }

  async getUser(req) {
    const { id } = req.params
    const userInfo = await User.findOne({
      where: { id },
      attributes: { exclude: ['password', "activationLink"] },
    });
    return userInfo;
  }

  async getUserByName(req) {
    const { name } = req.params
    const userName = await User.findOne({
      attributes: ['name', 'surname', 'id'],
      where: {
        [Op.or]: [
          { name },
          { surname: name }
        ],
      }
    });

    return userName;
  }
  async getUserAccount(req) {
    const { userId } = req.params
    const userAccount = await Account.findAll({
      where: { userId },
    });
    return userAccount;
  }

  async getLikes(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    let likes = await Like.findAll({
      where: { likesRecipientId: likesRecipient }
    })
    return likes;
  }

  async getDislikes(req, res) {
    let likesRecipient = req.body.likesRecipientId;
    let likesSender = req.body.likesSenderId;
    let dislikes = await Dislike.findAll({
      where: { likesRecipientId: likesRecipient }
    })
    return dislikes;
  }
}

export default new UserService()