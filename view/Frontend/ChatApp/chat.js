const chatList=document.getElementById('chat-list');
const submitBtn=document.getElementById('submit-btn');
submitBtn.addEventListener('click',sendMessage);
const onlineUser=[];
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const token=localStorage.getItem("token");
const userId=parseJwt(token);
window.addEventListener('DOMContentLoaded',()=>{
	const li=document.createElement('li');
	li.append(document.createTextNode("You Joined"));
	chatList.appendChild(li);
	for(let user of onlineUser){
		const li=document.createElement('li');
		li.append(document.createTextNode(`${user.name} joined`));
		chatList.appendChild(li);
	}
})

async function sendMessage(e){
	try{
	e.preventDefault();
	const message=document.getElementById('user-message').value;
	console.log(userId);
	console.log(message);
	const result =await axios.post(`http://localhost:3000/chat/send/${userId}`,{"message":message});
	console.log(result);
	}
	catch(err){
		console.log(err);
	}

}
