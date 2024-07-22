let nameField=document.getElementById("name")
let emailField=document.getElementById("email")
let passwordField=document.getElementById("password")
let users=[]

if(localStorage.getItem("users")===null){
    users=[]
}
else{
    users=JSON.parse(localStorage.getItem("users"))
}



function register(){
    if(registerValidation()){
        let user={
        name:nameField.value,
        email:emailField.value,
        password:passwordField.value
        }
        users.push(user)
        localStorage.setItem("users",JSON.stringify(users))
        window.open("./login.html")
    }
}

function isEmailValid(){
    let email=emailField.value
    let emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRegex.test(email)){
        return true
    }
    else{
        document.getElementById("error").innerHTML="email is invalid"
        return false
    }
}

function isnameValid(){
    let nameRegex=/^[a-zA-Z ]{3,12}$/
    let name=nameField.value
    if(nameRegex.test(name)){
        return true
    }
    else{
        document.getElementById("error").innerHTML="name is invalid"
        return false
    }
}

function isEmailUnique(){
    let email=emailField.value
    for(let i=0;i<users.length;i++){
        if(users[i].email==email){
            document.getElementById("error").innerHTML="email is already Exists"
            return false
        }
    }
    return true
    
}
function isPasswordvalid(){
    let passwordRegex=/^[a-zA-Z0-9 ]{5,12}$/
    let password=passwordField.value
    if(passwordRegex.test(password)){
        return true
    }
    else{
        document.getElementById("error").innerHTML="password is invalid"
        return false
    }
}

function isAllFieldsFilled(){
    let email=emailField.value
    let password=passwordField.value
    let name=nameField.value
    if(email===""||password===""||name===""){
        document.getElementById("error").innerHTML="please fill all fields"
        return false;
    }
    return true
}
function registerValidation(){
    
    if(isAllFieldsFilled()&&isEmailUnique()&&isEmailValid()&&isnameValid()&&isPasswordvalid()){
        return true
    }
    return false
}

function loginValidation(){
    let email=emailField.value
    let password=passwordField.value
    if(email===""||password===""){
        document.getElementById("error").innerHTML="please fill all fields"
        return false;
    }
    for(let i=0;i<users.length;i++){
        if(users[i].email==email&&users[i].password==password){
            localStorage.setItem("currentuser",users[i].name)
            return true;
        }
    }
    document.getElementById("error").innerHTML="user not found"
    return false;
}

function login(){
    if(loginValidation()){
        window.open("./profile.html")
    }
}
function logOut(){
    localStorage.removeItem("currentuser")
    window.open("./login.html")
}