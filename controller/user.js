const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


require('dotenv').config();

async function generateToken(name,id){
	const token=jwt.sign({name:name,userId:id},process.env.TOKEN_SECRET);
	return token;
	}

exports.userSignup=async (req,res)=>{
	try{
	const name=req.body.name;
	const email=req.body.email;
	const phone=req.body.phone;
	const password=req.body.password;
	if(password.length<6){
		return res.json({success:false,message:"Signup failed please enter password more than 6 characters"});
	}
	const users=await User.findAll();
	for(let user of users){
		if(user.email==email || user.phone==phone){
			return res.status(200).json({success:false,message:"User already exist,Please Login"});
		}
	}
	const encryptPassword=await(bcrypt.hash(password,10));
	User.create({name:name,email:email,phone:phone,password:encryptPassword,isOnline:false});
	res.status(200).json({success:true,message:'successfully signed up'});
	}
	catch(err){
		console.log(err);
	}
}

exports.userLogin=async(req,res)=>{
	try{
	const email=req.body.email;
	const password=req.body.password;
	const users=await User.findAll();
	for(let user of users){
		if(user.email==email){
			if(await bcrypt.compare(password,user.password)){
			await user.update({isOnline:true});
			return res.status(200).json({token:await generateToken(user.name,user.id)});
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
exports.userLogout=async(req,res)=>{
	try{
	const userId=req.params.id;
	const user=await User.findByPk(userId);
	await user.update({isOnline:false});
	res.json({success:true,message:"User successfully logout"});
	}
	catch(err){
		console.log(err);
	}
}
exports.getUsers=async(req,res)=>{
	try{
		const users=await User.findAll();
		let data=[];
		for(let user of users){
			if(user.id!=req.user.userId){
			data.push({id:user.id,name:user.name});
			}
		}
		res.status(200).json(data);
	}
	catch(err){
		console.log(err);
	}
}