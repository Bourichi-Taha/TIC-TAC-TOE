//selecting elements
const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".playerX");
const selectOBtn = selectBox.querySelector(".playerO");
playBoard = document.querySelector(".play-board");
resultBox = document.querySelector(".result-box");
wonText = document.querySelector(".won-text");
replayBtn = resultBox.querySelector(".btn-replay");
allBox = document.querySelectorAll("section span");
players = document.querySelector(".players");
let playerXIcon = "fas fa-times";//X icon
let playerOIcon = "far fa-circle";//O icon
let playerSign = "";
let botSign = "";
let nbrMoves=5;

window.onload = ()=>{//once window load do
    for (let i = 0;i < allBox.length; i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXBtn.onclick = ()=>{//once X btn clicked do
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players playerX");
        playerSign="X";
        botSign="O";
    }
    selectOBtn.onclick = ()=>{//once O btn clicked do
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active playerO");
        playerSign="O";
        botSign="X";
    }
    replayBtn.onclick = ()=>{
        window.location.reload(true);
    }

    
}


function clickedBox(element){
    if(!element.classList.contains("clicked")){
        if(players.classList.contains("playerO")){
            element.innerHTML = `<i class="${playerOIcon}"></i>`;//set clicked box to O
            players.setAttribute("class","players playerX");
            element.classList.add("clicked");
            element.id="O";
        }else if(players.classList.contains("playerX")){
            element.innerHTML = `<i class="${playerXIcon}"></i>`;//set clicked box to X
            players.setAttribute("class","players playerO active");
            element.classList.add("clicked");
            element.id="X";
        }
        let randomDelayTime = ((Math.random()*1000)+200).toFixed();
        setTimeout(()=>{
            systemTurn();
        },randomDelayTime);
    }else{
        console.log("try with an empty box");
    }
    
}

function systemTurn(){
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random()*array.length)];
    if (array.length>0) {
        if(players.classList.contains("playerO")){
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;//set clicked box to O
            players.setAttribute("class","players playerX");
            allBox[randomBox].classList.add("clicked");
            allBox[randomBox].id="O";
        }else if(players.classList.contains("playerX")){
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;//set clicked box to X
            players.setAttribute("class","players playerO active");
            allBox[randomBox].classList.add("clicked");
            allBox[randomBox].id="X";
        }
        nbrMoves++;
    }
    if ( selectWinner()==playerSign || selectWinner()==botSign) {
        // selectWinner();
    }else if (nbrMoves==9 && selectWinner()!=playerSign && selectWinner()!=botSign) {
        draw();
    }
}
 function getID(idName){
     return document.querySelector(".box"+idName).id;
 }

 function checkThreeIds(val1,val2,val3,sign){
     if (getID(val1)===sign && getID(val2)===sign && getID(val3)===sign) {
         return true;
     }
 }

 function selectWinner(){
     if (checkThreeIds(1,2,3,playerSign) || checkThreeIds(4,5,6,playerSign) || checkThreeIds(7,8,9,playerSign) || checkThreeIds(1,4,7,playerSign) || checkThreeIds(2,5,8,playerSign) || checkThreeIds(3,6,9,playerSign) || checkThreeIds(1,5,9,playerSign) || checkThreeIds(3,5,7,playerSign)) {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        wonText.innerHTML=`Player<p>"${playerSign}"</p>won the game!`;

        return playerSign;
     }else if (checkThreeIds(1,2,3,botSign) || checkThreeIds(4,5,6,botSign) || checkThreeIds(7,8,9,botSign) || checkThreeIds(1,4,7,botSign) || checkThreeIds(2,5,8,botSign) || checkThreeIds(3,6,9,botSign) || checkThreeIds(1,5,9,botSign) || checkThreeIds(3,5,7,botSign)) {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        wonText.innerHTML=`Player<p>"${botSign}"</p>won the game!`;
        return botSign;
     }
     
 }

 function draw(){
    playBoard.classList.remove("show");
    resultBox.classList.add("show");
    wonText.innerHTML="it is a <p>draw</p>";
 }