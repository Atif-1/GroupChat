const submitBtn=document.getElementById('submit-btn');

submitBtn.addEventListener('click',userLogin);


async function userLogin(e){
	try{
	e.preventDefault();
	const email=document.getElementById('email').value;
	const password=document.getElementById('password').value;
	const UserDetail={"email":email,"password":password};
	const result=await axios.post("http://localhost:3000/user/login",UserDetail);
	console.log(result.data);	
	localStorage.setItem("token",result.data);
	window.location.assign('http://127.0.0.1:5500/view/Frontend/ChatApp/chat.html')
	}
	catch(err){
		console.log(err);
	}
}