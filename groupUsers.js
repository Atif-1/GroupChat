const Sequelize=require('sequelize');
const sequelize=require('../util/database.js');

const GroupUsers=sequelize.define('group-users',{
        admin:{
                type:Sequelize.BOOLEAN,
                defaultValue:false

            }
});

module.exports=GroupUsers;