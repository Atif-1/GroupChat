const jwt=require('jsonwebtoken');
const User=require('../model/user');

require('dotenv').config();

exports.authenticate=(req,res,next)=>{
	const token=req.header("Authorization");
	const userId=jwt.verify(token,process.env.TOKEN_SECRET);
	User.findByPk(userId.userId).then((user) => {
		req.user=user; 
		next();
	}).catch((err) => {
		console.log(err);
	});	
}