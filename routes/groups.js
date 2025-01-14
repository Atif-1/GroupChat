const express=require('express');
const router=express.Router();

const {getGroups,createGroup,addUsers}=require('../controller/groups.js');
const {authenticate}=require('../middleware/authentication.js');

router.get('/getgroups',authenticate,getGroups);
router.post('/creategroup',authenticate,createGroup);
router.post('/addUsers/:groupId',authenticate,addUsers);

module.exports=router;