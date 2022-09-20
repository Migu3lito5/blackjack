var userName = sessionStorage.getItem("userName");
var initMoney = sessionStorage.getItem("initMoney");

var playerCount = []
var dealerCount = []


const onStart = () => {
   let gameBoard = document.getElementById('gameboard');
   gameBoard.style.visibility = "visible"
   

   let playerHand = document.getElementById('player-hand');
   let dealerHand = document.getElementById('dealer-hand');


    
   playerHand.appendChild(generateCard());
   dealerHand.appendChild(generateCard());


    


    


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

const generateCard = () => {

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

    return card;

}

const assignSuit = (value) => {
    switch(value) {
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

const giveCard = () => {

}


const deleteBoard = () => {

}

const gameLoop = () => {

}


document.getElementById('start').addEventListener('click', onStart);
