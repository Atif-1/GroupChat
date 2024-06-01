const express=require('express');
const router=express.Router();

const chatController=require('../controller/chat.js');
const userAuthentication=require('../middleware/authentication.js');

router.post('/send/:id',userAuthentication.authenticate,chatController.postMessage);
router.get('/messages',chatController.getMessages);

module.exports=router;