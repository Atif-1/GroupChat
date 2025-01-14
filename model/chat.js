const Sequelize=require('sequelize');
const sequelize=require('../util/database.js');

const Messages=sequelize.define('messages',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true,
	},
	message:{
		type:Sequelize.TEXT,
		allowNull:false
	}
});

module.exports=Messages;