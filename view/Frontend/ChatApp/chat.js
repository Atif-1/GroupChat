const chatList=document.getElementById('chat-list');
const onlineUser=[];
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