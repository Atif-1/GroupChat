const { Op, where } = require('sequelize');
const Chat=require('../model/chat.js');
const User=require('../model/user.js');

exports.postMessage=async(req,res)=>{

	try{
	Chat.create({message:req.body.message,groupId:req.params.groupId,userId:req.user.userId});
	res.status(200).json({success:true,message:"successfully send"});
	}
	catch(err){
		console.log(err);
	}
}

exports.getMessages = async (req, res) => {
	try {
	  const { groupId, msgId } = req.query;
  
	  
	  if (!groupId) {
		return res.status(400).json({ success: false, message: 'Group ID is required' });
	  }
  
	  const whereConditions = { groupId };
  
	  if (msgId && msgId !== '-1') {
		whereConditions.id = { [Op.gt]: msgId }; 
	  }
  
	  const chats = await Chat.findAll({
		where: whereConditions,
		include: [{
		  model: User,
		  attributes: ['name']  
		}]
	  });
	 
	  const msg = chats.map(chat => ({
		id: chat.id,
		user: chat.user.name,
		message: chat.message
	  }));
	  return res.status(200).json(msg);
	} catch (err) {
	  console.error(err);
	  return res.status(500).json({ success: false, message: 'Server error' });
	}
  };