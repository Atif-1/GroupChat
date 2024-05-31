const express=require('express');
const cors=require('cors');
const sequelize = require('./util/database.js');
const app=express();

app.use(cors({origin:"http://127.0.0.1:5500"}));
app.use(express.json());

const Chat=require('./model/chat.js');
const User=require('./model/user.js');

const userRoutes=require('./routes/user.js');
const chatRoutes=require('./routes/chat.js');

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync().then(()=>{
	app.listen(3000);
}).catch((err)=>{console.log(err);})
