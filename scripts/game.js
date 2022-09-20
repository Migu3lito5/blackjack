var userName = sessionStorage.getItem("userName");
var initMoney = sessionStorage.getItem("initMoney");

var playerHand = document.getElementById('player-hand');
var dealerHand = document.getElementById('dealer-hand');

var playerCount = []
var dealerCount = []


const onStart = () => {
   let gameBoard = document.getElementById('gameboard');
   gameBoard.style.visibility = "visible"

   let name = document.getElementById('player-name');
   name.innerHTML = userName;
   let bal = document.getElementById('player-bal');
   bal.innerHTML = "$" + initMoney;

    generateCard(playerHand.id);
    generateCard(dealerHand.id);

    generateCard(playerHand.id);
    generateCard(dealerHand.id);

    document.getElementById('start').remove();


}

const generateValueForCard = () => {

    let suit = Math.floor(Math.random() * 4) + 1;
    let number = Math.floor(Math.random() * 11) + 1;

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

const updateCount = (id, number) => {
    if (id === 'player-hand'){
        playerCount.push(number);
    }
    else {
        dealerCount.push(number);
    }
}


const deleteBoard = () => {

}


const updateValues = () => {

}


document.getElementById('start').addEventListener('click', onStart);
