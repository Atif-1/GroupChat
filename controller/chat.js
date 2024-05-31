const Chat=require('../model/chat.js');

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