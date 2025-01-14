const express=require('express');
const cors=require('cors');
const session=require('express-session');
const sequelize = require('./util/database.js');
const app=express();
const path=require("path");

app.use(cors({origin:"*"}));//* allows all requests origins
app.use(express.json());

const Messages=require('./model/chat.js');
const User=require('./model/user.js');
const Groups=require('./model/groups.js');
const GroupUser=require('./model/groupUsers.js');

const userRoutes=require('./routes/user.js');
const chatRoutes=require('./routes/chat.js');
const groupRoutes=require('./routes/groups.js');

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use('/groups',groupRoutes);
app.use((req,res)=>{
	res.sendFile(path.join(__dirname,`/view/Frontend/${req.url}`));
})

Groups.hasMany(Messages);
Messages.belongsTo(Groups);

User.hasMany(Messages);
Messages.belongsTo(User);

User.belongsToMany(Groups,{through:GroupUser});
Groups.belongsToMany(User,{through:GroupUser});

sequelize.sync().then(()=>{
	app.listen(3000);
}).catch((err)=>{console.log(err);})
