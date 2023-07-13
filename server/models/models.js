import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  work: { type: DataTypes.STRING },
  orgname: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  secondname: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  number: { type: DataTypes.STRING },
  unp: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, required: true },
  password: { type: DataTypes.STRING, required: true },
  verification: { type: DataTypes.STRING },
  datapolicy: { type: DataTypes.BOOLEAN },
  img: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  isPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  passwordLink: { type: DataTypes.STRING },
  invoice: { type: DataTypes.BOOLEAN, defaultValue: false },
  balance: { type: DataTypes.INTEGER, defaultValue: 0 },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  period: { type: DataTypes.DATE }
}
)

export const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, ref: 'user', primaryKey: true },
  refreshToken: { type: DataTypes.STRING, required: true },
}
)

export const Cargo = sequelize.define('cargo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  countryfrom: { type: DataTypes.STRING },
  cityfrom: { type: DataTypes.STRING },
  countryto: { type: DataTypes.STRING },
  cityto: { type: DataTypes.STRING },
  weightMin: { type: DataTypes.INTEGER },
  weighMax: { type: DataTypes.INTEGER },
  volumeMin: { type: DataTypes.INTEGER },
  volumeMax: { type: DataTypes.INTEGER },
  calendar: { type: DataTypes.DATE },
  long: { type: DataTypes.INTEGER },
  widthMax: { type: DataTypes.INTEGER },
  heightMax: { type: DataTypes.INTEGER },
  distanceto: { type: DataTypes.INTEGER },
  distancefrom: { type: DataTypes.INTEGER },
  danger: { type: DataTypes.STRING },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
})

export const Transport = sequelize.define('transport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  countryfrom: { type: DataTypes.STRING },
  regions: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  weighMax: { type: DataTypes.INTEGER },
  long: { type: DataTypes.INTEGER },
  widthMax: { type: DataTypes.INTEGER },
  heightMax: { type: DataTypes.INTEGER },
  danger: { type: DataTypes.STRING },
  deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
})


export const Dialog = sequelize.define('dialog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  partner: { type: DataTypes.INTEGER },
  author: { type: DataTypes.INTEGER },
})


export const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING },
  readed: { type: DataTypes.BOOLEAN, defaultValue: false },
  dialogId: { type: DataTypes.INTEGER },
  senderId: { type: DataTypes.INTEGER },
  partnerId: { type: DataTypes.INTEGER }
})


export const Account = sequelize.define('account', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING },
  account: { type: DataTypes.INTEGER },
  rest: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
  period: { type: DataTypes.DATE }
}

)

////////types

export const DocsType = sequelize.define('docsType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
})

export const TransportType = sequelize.define('transportType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
})

export const LoadingType = sequelize.define('loadingType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
})

export const PaymentType = sequelize.define('paymentType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
})

///////// likes - dislikes

export const Like = sequelize.define('like', {
  likesSenderId: { type: DataTypes.INTEGER, ref: 'user', primaryKey: true },
  likesRecipientId: { type: DataTypes.INTEGER, ref: 'user', primaryKey: true },
}
)

export const Dislike = sequelize.define('dislike', {
  likesSenderId: { type: DataTypes.INTEGER, ref: 'user', primaryKey: true },
  likesRecipientId: { type: DataTypes.INTEGER, ref: 'user', primaryKey: true },
})

/////////cargo connections

export const cargoDocs = sequelize.define('cargoDocs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const cargoTransport = sequelize.define('cargoTransport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
export const cargoLoading = sequelize.define('cargoLoading', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
export const cargoPayment = sequelize.define('cargoPayment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/////////transport connections
export const transportDocs = sequelize.define('transportDocs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

export const transportTransportType = sequelize.define('transportTransportType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
export const transportLoading = sequelize.define('transportLoading', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
export const transportPayment = sequelize.define('transportPayment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

////////dialogs connections

export const dialogPersonal = sequelize.define('dialogPersonal', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  partner: { type: DataTypes.INTEGER },
})

User.hasMany(Cargo)
Cargo.belongsTo(User)

User.hasMany(Transport)
Transport.belongsTo(User)
Token.belongsTo(User)

Cargo.belongsToMany(DocsType, { through: 'cargoDocs', as: 'doctype' })
DocsType.belongsToMany(Cargo, { through: 'cargoDocs', as: 'doctype' })

Cargo.belongsToMany(TransportType, { through: 'cargoTransport', as: 'transporttype' })
TransportType.belongsToMany(Cargo, { through: 'cargoTransport', as: 'transporttype' })

Cargo.belongsToMany(LoadingType, { through: 'cargoLoading', as: 'loadingtype' })
LoadingType.belongsToMany(Cargo, { through: 'cargoLoading', as: 'loadingtype' })

Cargo.belongsToMany(PaymentType, { through: 'cargoPayment', as: 'paymenttype' })
PaymentType.belongsToMany(Cargo, { through: 'cargoPayment', as: 'paymenttype' })

Transport.belongsToMany(DocsType, { through: 'transportDocs', as: 'docTypeTransport' })
DocsType.belongsToMany(Transport, { through: 'transportDocs', as: 'docTypeTransport' })

Transport.belongsToMany(TransportType, { through: 'transportTransportType', as: 'transportTypeTransport' })
TransportType.belongsToMany(Transport, { through: 'transportTransportType', as: 'transportTypeTransport' })

Transport.belongsToMany(LoadingType, { through: 'transportLoading', as: 'loadingTypeTransport' })
LoadingType.belongsToMany(Transport, { through: 'transportLoading', as: 'loadingTypeTransport' })

Transport.belongsToMany(PaymentType, { through: 'transportPayment', as: 'paymentTypeTransport' })
PaymentType.belongsToMany(Transport, { through: 'transportPayment', as: 'paymentTypeTransport' })


User.belongsToMany(Dialog, { through: 'dialogPersonal', as: 'dialogUsers' })
Dialog.belongsToMany(User, { through: 'dialogPersonal', as: 'dialogUsers' })

Dialog.hasMany(Message)
Message.belongsTo(Dialog)

User.hasMany(Account)
Account.belongsTo(User)

// User.sync({ alter: true })
// Account.sync({ alter: true })