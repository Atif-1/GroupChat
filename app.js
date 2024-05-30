const express=require('express');
const cors=require('cors');
const sequelize = require('./util/database.js');
const app=express();

app.use(cors({origin:"http://127.0.0.1:5500"}));
app.use(express.json());

const userRoutes=require('./routes/user.js');

app.use('/user',userRoutes);
sequelize.sync().then(()=>{
	app.listen(3000);
}).catch((err)=>{console.log(err);})
