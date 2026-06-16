
const API_URL =
"https://script.google.com/macros/s/AKfycbxvVvQfULdZO4KsbmyQ-mS8nZAZ3QNtcrHavVyCMIr8Z1zw2w8qQIx0KHi3rAK2Ymkf/exec";

window.onload = () => {

    const user = localStorage.getItem("user");

    if(user){
        showMenu(user);
    }

};

async function login(){

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try{

        const response = await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"login",
                username,
                password
            })
        });

        const result = await response.json();

        if(result.success){

            localStorage.setItem(
                "user",
                result.username
            );

            showMenu(result.username);

        }else{

            document.getElementById("loginMsg")
                .innerHTML = result.message;

        }

    }catch(err){

        document.getElementById("loginMsg")
            .innerHTML = "Gagal terhubung";

        console.error(err);

    }

}

function showMenu(user){

    document.getElementById("loginBox")
        .classList.add("hidden");

    document.getElementById("menuBox")
        .classList.remove("hidden");

    document.getElementById("welcome")
        .innerHTML = "Selamat datang, " + user;

}

function showInput(){

    document.getElementById("inputBox")
        .classList.remove("hidden");

}

function logout(){

    localStorage.clear();

    location.reload();

}
