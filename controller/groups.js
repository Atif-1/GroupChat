const { Op, where } = require('sequelize');
const Chat=require('../model/chat.js');

const Groups=require('../model/groups.js');
const userGroups=require('../model/groupUsers.js');

exports.getGroups=async(req,res)=>{
	try{
    const groups=await userGroups.findAll({where:{userId:req.user.userId}});
	let groupIds=[];
	for(let g of groups){
		groupIds.push(g.groupId);
	}
    const data=await Groups.findAll({where:{id:{[Op.in]:groupIds}}});
	res.status(200).json(data);
	}
	catch(err){
		console.log(err);
	}
}

exports.createGroup=async(req,res)=>{
	try{
		const newGroup=await Groups.create({
			name:req.body.groupName,
			admin:req.user.userId,
			createdBy:req.user.name
		});
		await newGroup.addUsers(req.user.userId);
	res.status(200).json({success:true,message:"group successfully created"});
	}
	catch(err){
		console.log(err);
	}
}

exports.addUsers=async(req,res)=>{
		const  groupId  = req.params.groupId; 
		const userIds = req.body.userIds; 

		if (!Array.isArray(userIds) || userIds.length === 0) {
		  return res.status(400).json({ message: 'Please provide an array of user IDs.' });
		}
	  
		try {
		  const addedUsers = userIds.map(userId => ({
			groupId: groupId,
			userId: userId
		  }));

		  await userGroups.bulkCreate(addedUsers);
	  
		  return res.status(200).json({ message: 'Users added to the group successfully!' });
		} catch (error) {
		  console.error('Error adding users to group:', error);
		  return res.status(500).json({ message: 'An error occurred while adding users to the group.' });
		}
}



