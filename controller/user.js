const User=require('../model/user');
const bcrypt=require('bcrypt');
exports.userSignup=async (req,res)=>{
	console.log("in controller");
	const name=req.body.name;
	const email=req.body.email;
	const phone=req.body.phone;
	const password=req.body.password;
	const users=await User.findAll();
	for(let user of users){
		if(user.email==email || user.phone==phone){
			return res.status(400).json({success:false,message:'User already exist'});
		}
	}
	const encryptPassword=await(bcrypt.hash(password,10));
	User.create({name:name,email:email,phone:phone,password:encryptPassword});
	res.status.json({success:true,message:'successfully register'});
}

exports.getUsers=async(req,res)=>{
	const users=await User.findAll();
	res.status(200).json(users);
}