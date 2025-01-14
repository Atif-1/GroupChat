window.addEventListener('DOMContentLoaded',async()=>{
const userJoin=document.getElementById('user-join');
const chatbox=document.getElementById('chats');
const submitBtn=document.getElementById('submit-btn');
const logoutBtn=document.getElementById('logout-btn');
const groupBox=document.getElementById('groups-box');
const userList=document.getElementById('user-list');

logoutBtn.addEventListener("click",logOut);

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
localStorage.setItem("group",null);
let msgId;
let groupId=-1;
let groupMsgs=[];
const parsedToken=parseJwt(token);
const userId=parsedToken.userId;
	try{
		axios.get(`http://localhost:3000/groups/getgroups`,{headers:{"Authorization":token}}).then((result) => {
			showGroups(result.data);
		}).catch((err) => {
			console.log(err);
		});;
	}catch(err){
		console.log(err);
	}


function showMsg(obj){
	const p=document.createElement('p');
	p.appendChild(document.createTextNode(`${obj.user}:${obj.message}`));
	chatbox.appendChild(p);
}
function showGroups(obj){
	for(let res of obj){
		const btn=document.createElement('button');
		btn.textContent=`${res.name}`;
		btn.setAttribute('data-created-by', res.createdBy);
		btn.setAttribute('data-created-at', res.createdAt);
		btn.id= res.id;
		groupBox.append(btn);	
	}
}


function logOut(){
	axios.post(`http://localhost:3000/user/logout/${userId}`).then((result) => {
		localStorage.removeItem("token");
		localStorage.removeItem("msg");
		window.location.assign('../Login/login.html');	
	}).catch((err) => {
		console.log(err);
	});;
}
document.getElementById('openMemberForm').onclick = function() {
    document.getElementById('popupMemberForm').style.display = 'block';
	getMembers();
}
document.getElementById('openForm').onclick = function() {
    document.getElementById('popupForm').style.display = 'block';
}

 
var memberCloseButton = document.querySelector("#memberFormClose");
var groupCloseButton = document.querySelector("#groupFormClose");

memberCloseButton.onclick = function() {
  document.getElementById("popupMemberForm").style.display = 'none';
}
groupCloseButton.onclick = function() {
	document.getElementById("popupForm").style.display = 'none';
}


window.onclick = function(event) {
    if (event.target === document.getElementById("popupMemberForm")) {
		document.getElementById("popupMemberForm").style.display = 'none';
	  }
	if (event.target === document.getElementById('popupForm')) {
		document.getElementById('popupForm').style.display = 'none';
	}
}

document.getElementById('form').onsubmit = async function(event) {
    event.preventDefault(); 
	const gName=document.getElementById("group-name").value;
	const resp=await axios.post(`http://localhost:3000/groups/creategroup`,{groupName:gName},{headers:{"Authorization":token}});
    document.getElementById('popupForm').style.display = 'none'; 
}

groupBox.addEventListener('click', function(event) {
	
	if (event.target.tagName === 'BUTTON') {
	localStorage.removeItem("msg");
	groupId=event.target.id;
	localStorage.setItem("group",groupId);
	const buttons = groupBox.getElementsByTagName('button');
	for (let button of buttons) {
		button.classList.remove('active');
	}

	event.target.classList.add('active');

	const paragraphs = chatbox.getElementsByTagName('p');
	while (paragraphs.length > 0) {
		paragraphs[0].remove();
	}
		const groupElements=document.getElementsByClassName('group-element');
		for(let groupElem of groupElements){
			groupElem.style.display="block";
		}
		submitBtn.addEventListener('click',sendMessage);
		groupId=event.target.id;
	}
	async function sendMessage(e){
		try{
		e.preventDefault();
		const message=document.getElementById('message').value;
		await axios.post(`http://localhost:3000/chat/send/${groupId}`,{"message":message},{headers:{"Authorization":token}});
		document.getElementById('message').value='';
		}
		catch(err){
			console.log(err);
		}
	}
	getMessages();
});

async function getMessages() {
	setInterval(async()=>{
			let storedMessage=JSON.parse(localStorage.getItem("msg"));
			if(storedMessage==null || storedMessage==undefined){
				msgId=-1;
			}
			else{
				groupMsgs=[...storedMessage];
				lastMsg=groupMsgs[groupMsgs.length-1];
				msgId=lastMsg.id;
			}
			console.log(msgId);
			const messages=await axios.get(`http://localhost:3000/chat/messages?msgId=${msgId}&groupId=${groupId}`,{headers:{"Authorization":token}});
			for(let msg of messages.data){
				showMsg(msg);
				groupMsgs.push(msg);
				if(groupMsgs.length>10){
					groupMsgs.shift();
				}
			}
			localStorage.setItem("msg",JSON.stringify(groupMsgs));
			console.log("repeating......");
		},5000)
}

async function getMembers(){
	const users=await axios.get(`http://localhost:3000/user/getUsers`,{headers:{"Authorization":token}})
	for(let user of users.data){
		let listItem=document.createElement('li');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';  
		checkbox.setAttribute('data-id', user.id);
		const label = document.createElement('span');
		label.textContent = user.name;
		listItem.appendChild(checkbox);
      	listItem.appendChild(label);
		userList.appendChild(listItem);
	}
}

document.getElementById("m-submit-btn").addEventListener("click",async()=>{
	const addedMemberIds=getCheckedUserIds();
	const data = {
		userIds: addedMemberIds
	  };
	console.log(addedMemberIds);
	const resp=await axios.post(`http://localhost:3000/groups/addUsers/${groupId}`,data,{headers:{"Authorization":token}});
	alert(resp.data.message);
	document.getElementById('popupMemberForm').style.display = 'none';
	
})

function getCheckedUserIds() {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const checkedUserIds = Array.from(checkedCheckboxes).map(checkbox => checkbox.getAttribute('data-id'));
    return checkedUserIds;
}

});
