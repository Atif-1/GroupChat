const jwt=require('jsonwebtoken');
const User=require('../model/user');

require('dotenv').config();

exports.authenticate=(req,res,next)=>{
	try{
		const token=req.header("Authorization");
	const user=jwt.verify(token,process.env.TOKEN_SECRET);
	req.user=user; 	
	next();
	}
	catch(err){
		console.log(err);
	}
	
}