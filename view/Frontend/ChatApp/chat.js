const chatList=document.getElementById('chat-list');
const submitBtn=document.getElementById('submit-btn');
const logoutBtn=document.getElementById('logout-btn');
submitBtn.addEventListener('click',sendMessage);
logoutBtn.addEventListener('click',logOut);

const token=localStorage.getItem("token");
if(token==null || token==undefined){
	window.location.assign("http://127.0.0.1:5500/view/Frontend/login/login.html");
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
localStorage.setItem("msg",null);
const li=document.createElement('li');
li.appendChild(document.createTextNode("You Joined"));
li.style.color="red";
chatList.appendChild(li);

axios.get("http://localhost:3000/user/getUsers").then((result) => {
	let Users=[];
	for(let user of result){
		Users.push(user.data);
		}
		localStorage.setItem("Users",JSON.stringify(Users));
		const userToken=parseJwt(token);
		const userid=userToken.userId;
		const userObj=JSON.parse(localStorage.getItem("Users"));
		for(obj of userObj){
			if(obj.id!=userid){
				if(obj.isOnline==true || obj.isOnline==false){
					const li=document.createElement('li');
					li.appendChild(document.createTextNode(`${obj.name} joined`));
					li.style.color="red";
					chatList.appendChild(li);
				}
			}
		}
}).catch((err) => {
	
});

window.addEventListener('DOMContentLoaded',async()=>{
	try{
		setInterval(async()=>{
			let groupMsgs=[];
			let storedMessage=JSON.parse(localStorage.getItem
				("msg"));
			if(storedMessage==null){
				msgId=-1;
			}
			else{
				groupMsgs=[...storedMessage];
				lastMsg=groupMsgs[groupMsgs.length-1];
				msgId=lastMsg.id;
			}
			const messages=await axios.get('http://localhost:3000/chat/messages/'+msgId);
			for(let msg of messages.data){ 
				showMsg(msg);
				groupMsgs.push(msg);
				if(groupMsgs.length==11){
					groupMsgs.shift();
				}
			}
			console.log(groupMsgs);
			localStorage.setItem("msg",JSON.stringify(groupMsgs));
		},1000);
			
	}catch(err){
		console.log(err);
	}
});
function showMsg(obj){
	const li=document.createElement('li');
	li.appendChild(document.createTextNode(`${obj.message}`));
	chatList.appendChild(li);
}

async function sendMessage(e){
	try{
	e.preventDefault();
	const message=document.getElementById('user-message').value;
	const parsedToken=parseJwt(token);
	const userId=parsedToken.userId;
	const result =await axios.post(`http://localhost:3000/chat/send/${userId}`,{"message":message},{headers:{"Authorization":token}});
	console.log(result);
	const msges=localStorage.getItem("msg");
	for(let obj of msges){
		console.log(obj);
	}
	}
	catch(err){
		console.log(err);
	}
}
function logOut(){
	const parsedToken=parseJwt(token);
	const userId=parsedToken.userId;
	axios.post(`http://localhost:3000/user/logout/${userId}`);
	localStorage.removeItem("token");
	localStorage.removeItem("msg");
	window.location.assign('http://127.0.0.1:5500/view/Frontend/login/login.html');
}