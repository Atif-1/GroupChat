const express=require('express');
const router=express.Router();

const chatController=require('../controller/chat.js');

router.post('/send/:id',chatController.postMessage);

module.exports=router;