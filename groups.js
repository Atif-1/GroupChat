const express=require('express');
const router=express.Router();

const {getGroups,createGroup,addUsers,removeUsers,makeAdmin}=require('../controller/groups.js');
const {authenticate}=require('../middleware/authentication.js');

router.get('/getgroups',authenticate,getGroups);
router.post('/creategroup',authenticate,createGroup);
router.post('/addUsers/:groupId',authenticate,addUsers);
router.post('/removeUsers/:groupId',authenticate,removeUsers);
router.post('/adminUsers/:groupId',authenticate,makeAdmin);

module.exports=router;