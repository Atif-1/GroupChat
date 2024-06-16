const form=document.getElementsByTagName('form');
const submitBtn=document.getElementById('submit-btn');

submitBtn.addEventListener('click',sendUserDetails);

async function sendUserDetails(e){
	e.preventDefault();
	try{
	const Name=document.getElementById('name').value;
	const Email=document.getElementById('email').value;
	const Phone=document.getElementById('phone').value;
	const Password=document.getElementById('password').value;
	if(Password.length<6){
		alert("password length should be greater than or equal to 6");
	}
	else{
	const UserDetails={
		name:Name,
		email:Email,
		phone:Phone,
		password:Password
	};
	const msg=await axios.post('http://localhost:3000/user/signup',UserDetails);
	console.log(msg);
	alert(msg.data.message);
	
	}}
	catch(err){
		console.log(err);
	}
}