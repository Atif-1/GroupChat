const express=require('express');
const router=express.Router();
const userController=require('../controller/user.js');
const userAuthentication=require('../middleware/authentication.js');

router.get('/getUsers',userAuthentication.authenticate,userController.getUsers);
router.post('/signup',userController.userSignup);
router.post('/login',userController.userLogin);
router.post('/logout/:id',userController.userLogout);

module.exports=router;