const Sequelize=require('sequelize');
const sequelize=require('../util/database.js');

const Chats=sequelize.define('chat',{
	message:{
		type:Sequelize.TEXT,
		allowNull:false
	}
});

module.exports=Chats;