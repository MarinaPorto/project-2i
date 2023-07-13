import { Sequelize } from 'sequelize';




// const sequelize = new Sequelize(
//   "iris",
//   "root",
//   "",
//   {
//     dialect: 'mysql',
//     host: "localhost",
//     port: "3306",
//   }
// )

const sequelize =  new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
)



export default sequelize