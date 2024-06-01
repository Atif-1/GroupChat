const Chat=require('../model/chat.js');
const User=require('../model/user.js');

exports.postMessage=async(req,res)=>{
	try{
	const id=req.params.id;
	const msg=req.body.message;
	console.log(msg);
	console.log(id);
	Chat.create({message:msg,userId:id});
	res.status(200).json({success:true,message:"successfully send"});
	}
	catch(err){
		console.log(err);
	}
}

exports.getMessages=async(req,res)=>{
	try{
	const chats=await Chat.findAll();
 	res.status(200).json(chats);
	}
	catch(err){
		res.status(400).json({success:false,message:"server error"});
		console.log(err);
	}
}