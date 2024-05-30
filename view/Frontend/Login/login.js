const submitBtn=document.getElementById('submit-btn');

submitBtn.addEventListener('click',userLogin);

async function userLogin(e){
	try{
	e.preventDefault();
	const email=document.getElementById('email').value;
	const password=document.getElementById('password').value;
	const UserDetail={"email":email,"password":password};
	const resullt=await axios.post("http://localhost:3000/user/login",UserDetail);
	}
	catch(err){
		console.log(err);
	}
}