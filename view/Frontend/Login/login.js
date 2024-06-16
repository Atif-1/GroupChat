const submitBtn=document.getElementById('submit-btn');

submitBtn.addEventListener('click',userLogin);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
async function userLogin(e){
	try{
	e.preventDefault();
	const email=document.getElementById('email').value;
	const password=document.getElementById('password').value;
	const UserDetail={"email":email,"password":password};
	const result=await axios.post("http://localhost:3000/user/login",UserDetail);
	const token=result.data.token;	
	localStorage.setItem("token",token);
	window.location.assign('http://127.0.0.1:5500/view/Frontend/ChatApp/chat.html');
	}
	catch(err){
		console.log(err);
		alert('Something went wrong');
	}
}