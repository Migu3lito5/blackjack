
var userName = "";
var initMoney = 0;

// document.getElementById("demo").addEventListener("click", myFunction);

const verifyValues = () => {
    userName = document.getElementById('username').value;
    initMoney = document.getElementById('initMoney').value;

    initMoney = parseInt(initMoney);

    initMoney > 1 && initMoney < 1001 && userName.length > 0 ?  toPlayPage() : showInvalidInput();
    
}

const showInvalidInput = () => {
    Swal.fire({
        title: 'Invalid input',
        text: 'Please make sure your starting money is less than 1000 and bigger than 0',
        icon: 'error',
        confirmButtonColor: 'rgb(84, 101, 86)',
        color: 'white',
        background: '#232524',
    });
}


const toPlayPage = () => {

    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("initMoney", initMoney);
    window.location.href = "game.html";
}

document.getElementById('submit').addEventListener('click', verifyValues);
