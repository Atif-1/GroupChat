const Sequelize=require("sequelize");
const sequelize= require('../util/database.js');

const Groups=sequelize.define('group',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement:true,
		primaryKey:true
		
	},
	name:{
		type:Sequelize.STRING,
		allowNull:false
	},
	admin:{
		type:Sequelize.INTEGER,
		allowNull:false
	},
	createdBy:{
		type:Sequelize.STRING,
		allowNull:false
	}
})
 
module.exports=Groups;
