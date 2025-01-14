const Sequelize=require('sequelize');
const sequelize=require('../util/database.js');

const GroupUsers=sequelize.define('group-users');

module.exports=GroupUsers;