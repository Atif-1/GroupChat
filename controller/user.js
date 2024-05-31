const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

require('dotenv').config();

async function generateToken(text){
	const token=jwt.sign(text,process.env.TOKEN_SECRET);
	return token;
	}

exports.userSignup=async (req,res)=>{
	const name=req.body.name;
	const email=req.body.email;
	const phone=req.body.phone;
	const password=req.body.password;
	const users=await User.findAll();
	for(let user of users){
		if(user.email==email || user.phone==phone){
			return res.status(200).json({success:false,message:"User already exist,Please Login"});
		}
	}
	const encryptPassword=await(bcrypt.hash(password,process.env.SALT_ROUNDS));
	User.create({name:name,email:email,phone:phone,password:encryptPassword});
	res.status(200).json({success:true,message:'successfully signed up'});
}

exports.userLogin=async(req,res)=>{
	try{
	const email=req.body.email;
	const password=req.body.password;
	const users=await User.findAll();
	for(let user of users){
		if(user.email==email){
			if(await bcrypt.compare(password,user.password)){
			return res.status(200).json({"name":await generateToken(user.name),"id":await generateToken(user.id)});
			}
			else{
				return res.status(401).json({success:false,message:"User not authorised"});
			}
		}
	}
	res.status(404).json({success:false,message:"User not found"});
	}
	catch(err){
		console.log(err);
	}
}