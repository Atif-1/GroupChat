const express=require('express');
const router=express.Router();
const userController=require('../controller/user.js');

router.get('/getUsers',userController.getUsers);
router.post('/signup',userController.userSignup);
router.post('/login',userController.userLogin);
router.post('/logout',userController.userLogout);

module.exports=router;