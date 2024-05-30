const Sequelize=require('sequelize');	
require('dotenv').config();
const sequelize=new Sequelize(process.env.DB_SCHEMA,process.env.DB_TYPE,process.env.DB_PASSWORD,{dialect:'mysql',host:process.env.DB_HOST});

module.exports=sequelize;