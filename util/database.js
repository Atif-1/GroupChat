const Sequelize=require('sequelize');
require('dotenv').config();
const sequelize=new Sequelize('group-chat',process.env.DB_TYPE,process.env.DB_PASSWORD,{dialect:'mysql',host:process.env.DB_HOST});

module.exports=sequelize;
