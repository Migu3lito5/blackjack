var userName = sessionStorage.getItem("userName");
var initMoney = sessionStorage.getItem("initMoney");
var playerBalance = parseInt(initMoney);
var currBet = 0;

var playerHand = document.getElementById('player-hand');
var dealerHand = document.getElementById('dealer-hand');

var playerCount = []
var dealerCount = []


const onStart = () => {
   document.getElementById('bet-button').disabled = false;
    
   Swal.fire({
    title: 'Welcome!',
    text: "To officialy start, place a bet! Good Luck!",
    confirmButtonColor: 'rgb(84, 101, 86)',
    color: 'white',
    background: '#232524',
});

   document.getElementById('start').remove();


}

const generateValueForCard = () => {
    let suit = Math.floor(Math.random() * 4) + 1;
    let number = Math.floor(Math.random() * 10) + 1;

    let card = {
        suit : suit,
        number : number,
    }
   
    return card;
}

const generateCard = (id) => {
    let playerHand = document.getElementById(id);
    let cardValues = generateValueForCard();

    let card = document.createElement('div');
    let cardHeader = document.createElement('div');
    let cardBody = document.createElement('div');

    let cardSuit = document.createElement('i');
    let cardNum = document.createElement('h1');
    
    cardSuit.className = assignSuit(cardValues.suit);
    cardBody.appendChild(cardSuit);


    cardNum.innerText = cardValues.number;
    cardHeader.appendChild(cardNum);


    card.className = "card";
    cardHeader.className = "card-header";
    cardBody.className = "card-body";

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    updateCount(id, cardValues.number);
    playerHand.appendChild(card);


}

const assignSuit = (suit) => {
    switch(suit) {
        case 1:
            return "bi bi-suit-spade-fill";
        case 2:
            return "bi bi-suit-diamond-fill";
        case 3:
            return "bi bi-suit-heart-fill";
        case 4:
            return "bi bi-suit-club-fill"
        default:
            return "bi bi-suit-spade-fill";
      }
}


const generateStartingPlayerHand = () => {
    generateCard(playerHand.id);
    generateCard(playerHand.id);

}

const generateDealerStartingHand = () => {
    generateCard(dealerHand.id);
    generateCard(dealerHand.id);

    dealerHand.childNodes[0].childNodes[0].innerText = '?';
    dealerHand.childNodes[0].childNodes[0].style.color = '#232524';
 
}


const updateCount = (id, number) => {
    if (id === 'player-hand'){
        playerCount.push(number);
    }
    else {
        dealerCount.push(number);
    }
}


const resetBoard = () => {
    let playerSide = document.getElementById('player-hand');
    let dealerSide = document.getElementById('dealer-hand');
    playerSide.innerHTML = "";
    dealerSide.innerHTML = "";
   
}


const updateValues = (money) => {
    let bal = document.getElementById('player-bal');
    if (money >= 0) {
        playerBalance = playerBalance + money;
    } else {
        // weird behavior, dont know how it works but it works, becuase doing playerBalance = playerBalance - money -> adds instead of subtraction
        // but this below does the intended behavior 
        money = money * -1
        playerBalance = (playerBalance - money)
    }

    bal.innerText = "$" + playerBalance;
}


const startRound = () => {
    let gameBoard = document.getElementById('gameboard');
    let betValue = document.getElementById('bet-amount').value

    betValue = parseInt(betValue);

    if(betValue > playerBalance) {
        alert('please bet with money you have available!')
        
    } else {
        currBet = betValue;
        resetBoard();
        generateDealerStartingHand();
        generateStartingPlayerHand();
        gameBoard.style.visibility = "visible"

        document.getElementById('bet-button').disabled = true;
        document.getElementById('hit-btn').disabled = false;
        document.getElementById('stay-btn').disabled = false;

    }
}

const stay = () => {
    console.log('stay')
    calculateWinner();
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stay-btn').disabled = true;
    document.getElementById('bet-button').disabled = false;
}

const hit = () => {
    let playerScore = playerCount.reduce((a, b) => a + b, 0);

    if(dealerScore <= 16){
        generateCard(dealerHand.id);
    }

    if(playerScore > 21) {
        stay();
    } else {
        generateCard(playerHand.id); 
        console.log('hit')
    }
}

const calculateWinner = () => {

   let playerScore = playerCount.reduce((a, b) => a + b, 0);
   let dealerScore = dealerCount.reduce((a, b) => a + b, 0);

   if(dealerScore <= 16) {
        generateCard(dealerHand.id);
        dealerScore = dealerCount.reduce((a, b) => a + b, 0);
    }
   
   // reset their hand value 
   playerCount = []
   dealerCount = []

   if((dealerScore > 21 && playerScore > 21) || (playerScore <= 21 && dealerScore <= 21 && playerScore === dealerScore)){
    Swal.fire({
        title: 'You tied!',
        text: `Your Hand:  ${playerScore} , and the dealer's Hand: ${dealerScore}`,
        confirmButtonColor: 'rgb(84, 101, 86)',
        color: 'white',
        background: '#232524',
    });
    updateValues(0);
   } else if ((dealerScore <= 21 && playerScore > 21) || (playerScore <= 21 && dealerScore <= 21 && dealerScore > playerScore)) {
    Swal.fire({
        title: 'You Lost!',
        text: `Your Hand:  ${playerScore} , and the dealer's Hand: ${dealerScore}`,
        confirmButtonColor: 'rgb(84, 101, 86)',
        color: 'white',
        background: '#232524',
    });
    updateValues(-currBet);
   } else {
    Swal.fire({
        title: 'You Won!',
        text: `Your Hand:  ${playerScore} , and the dealer's Hand: ${dealerScore}`,
        confirmButtonColor: 'rgb(84, 101, 86)',
        color: 'white',
        background: '#232524',
    });
    updateValues(currBet * 2);
   }

    loseCondition()
}


const loseCondition = () => {

    let gameBoard = document.getElementById('gameboard');
    gameBoard.style.visibility = 'hidden'
    currBet = 0;

    if (playerBalance <= 0){

        document.getElementById('hit-btn').disabled = true;
        document.getElementById('stay-btn').disabled = true;
        document.getElementById('bet-button').disabled = true; 
        Swal.fire({
            title: 'You Lost all your money!',
            text: "You don't have any more money, therefore back to the lobby :)",
            confirmButtonColor: 'rgb(84, 101, 86)',
            color: 'white',
            background: '#232524',
        });

        setTimeout(() => {
            sessionStorage.clear();
            window.location.href = "index.html";
        }, 5000)
    }
}

const init = () => {

    let bal = document.getElementById('player-bal');
    let pname = document.getElementById('player-name');

    pname.innerHTML = userName;
    bal.innerHTML = "$" + playerBalance;

    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stay-btn').disabled = true;
    document.getElementById('bet-button').disabled = true; 
}



document.getElementById('start').addEventListener('click', onStart);
document.getElementById('hit-btn').addEventListener('click', hit);
document.getElementById('stay-btn').addEventListener('click', stay);
document.getElementById('bet-button').addEventListener('click', startRound);


init();

//Todos: 
    // Make dealer draw until he has atleast 16 
    // Convert 1 to 11 OR 11 to 1 if it seems fit
    // 



