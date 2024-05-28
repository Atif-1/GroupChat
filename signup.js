const form=document.getElementsByTagName('form');
const submitBtn=document.getElementById('submit-btn');

submitBtn.addEventListener('click',sendUserDetails);

function sendUserDetails(e){
	e.preventDefault();
	const Name=document.getElementById('name').value;
	const Email=document.getElementById('email').value;
	const Phone=document.getElementById('phone').value;
	const Password=document.getElementById('password').value;
	const UserDetails={
		name:Name,
		email:Email,
		phone:Phone,
		password:Password
	};
	console.log(UserDetails);
}