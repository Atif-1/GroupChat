const chatList=document.getElementById('chat-list');
const submitBtn=document.getElementById('submit-btn');
submitBtn.addEventListener('click',sendMessage);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const token=localStorage.getItem("token");
window.addEventListener('DOMContentLoaded',async()=>{
	try{
		setInterval(async function() {
			chatList.innerHTML="";
			const li=document.createElement('li');
			li.appendChild(document.createTextNode("You Joined"));
			chatList.appendChild(li);
			const messages=await axios.get('http://localhost:3000/chat/messages');
			console.log(messages.data);
			for(let message of messages.data){
				showMsg(message);
			}
			console.log(messages.data);
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
	console.log(parsedToken);
	const userId=parsedToken.userId;
	const result =await axios.post(`http://localhost:3000/chat/send/${userId}`,{"message":message},{headers:{"Authorization":token}});
	console.log(result);
	}
	catch(err){
		console.log(err);
	}

}
