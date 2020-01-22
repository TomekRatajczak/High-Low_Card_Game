const messageScore = document.querySelector(".messageScore");
const message = document.querySelector(".message");
const messageResult = document.querySelector(".messageResult");
const score = document.querySelector(".score");
const button = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");

let curCardValue = 0;
let scoreValue = 7;
let deck = [];
const ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
const suits = ["hearts","diams","clubs","spades"];

for(let i=0;i<button.length;i++){
    button[i].addEventListener("click",playGame);
}

function playGame(e){
    let temp = e.target.innerText;
    let myCard = drawCard();
    let win = false;
    if(temp=="Start"){
        message.innerHTML = "<hr>Higher or Lower?";
        messageScore.innerHTML = "Strikes left: ";
        score.innerHTML = scoreValue;
        messageResult.innerHTML = "";
        //score.style.display = "inline-block";
        gameplay.innerHTML = "";
        makeCard(myCard);
        toggleButtons();
        return;
    }
    if(myCard.value == curCardValue){
        win = "draw";
        message.innerHTML = "Draw!";
    }else{
        if((temp=="Higher" && (myCard.value>curCardValue)) || (temp=="Lower" && (myCard.value<curCardValue))){
            win = true;
            scoreValue--;
            score.innerHTML = scoreValue;
            message.innerHTML = "<hr>Correct! What Next?";
        }else{
            message.innerHTML = "<hr>Wrong!";
            messageResult.innerHTML = "<b>YOU LOSE!!</b>";
            toggleButtons();
            scoreValue = 7;
        }
    }
    makeCard(myCard);
    if(scoreValue < 1){
        messageResult.innerHTML = "<b>YOU WIN!!</b>";
        toggleButtons();
        scoreValue = 7;
    }
}

function drawCard(){
    if (deck.length > 0){
        let randomIndex = Math.floor(Math.random()*deck.length);
        let card = deck.splice(randomIndex,1)[0];
        return card;
    }else{
        makeDeck();
        return drawCard();
    }
}

function makeDeck(){
    deck = [];
    for(let i=0;i<suits.length;i++){
        for(let j=0;j<ranks.length;j++){
            let card = {};
            card.suit = suits[i];
            card.rank = ranks[j];
            card.value = (j+1);
            deck.push(card);
        }
    }
}

function makeCard(card){
    console.log(card);
    let html1 = card.rank+"&"+card.suit+";";
    let html2 = card.rank+"<br>&"+card.suit+";";
    let curCards = document.querySelectorAll(".card");

    let div = document.createElement("div");
    div.setAttribute("class","card");
    div.style.left = (curCards.length*25)+"px";
    curCardValue = card.value;
    if (card.suit === "hearts" || card.suit === "diams") {
        div.classList.add("red");
    }

    let span1 = document.createElement("span");
    span1.setAttribute("class","tiny");
    span1.innerHTML = html1;
    div.appendChild(span1);

    let span2 = document.createElement("span");
    span2.setAttribute("class","big");
    span2.innerHTML = html2;
    div.appendChild(span2);

    gameplay.appendChild(div);
}

function toggleButtons(){
    for(let i=0;i<button.length;i++){
        button[i].classList.toggle("hideButton");
    }
}