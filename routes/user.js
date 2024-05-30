const express=require('express');
const router=express.Router();
const userController=require('../controller/user.js');

router.post('/signup',userController.userSignup);
router.get('/getDetails',userController.getUsers);

module.exports=router;