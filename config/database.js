//import dependencies
const Sequelize = require('sequelize');

//import data model
const UserModel = require('../model/users')
//kalau ada data lain tambah di sini 

//database
//JANGAN DIGANGGU GUGAT
const sequelize = new Sequelize('belajar', 'postgres', 'Occa1996%', {
    host: 'localhost',
    dialect: 'postgres',
  });

  // test connection
  //JANGAN DIGANGGU GUGAT
sequelize
.authenticate()
.then((res) => {
  console.log("CONNECTION_SUCCESS");
})
.catch((err) => console.log("FAILED_TO_CONNECT ", err));

//initialized model
//bisa nambah di sini
const userModel = UserModel(sequelize, Sequelize)

//module export
//bisa nambah di sini
module.exports = {
    sequelize, 
    userModel
}