const express=require('express');
const router=express.Router();
const userController=require('../controller/user.js');
const userAuthentication=require('../middleware/authentication.js');

router.post('/signup',userController.userSignup);
router.post('/login',userController.userLogin);

module.exports=router;