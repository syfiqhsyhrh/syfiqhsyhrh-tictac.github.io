console.log("JS Connected");

let ticplayer="X";
var originalBoard;
let currentTurn=1;
let moveMade=0;


const winSet = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[9,5,1]];
const button = document.getElementById('my-button');

button.onclick = function () {
location.reload();
}

let box = document.querySelectorAll('.grid-cell');

start();

function start(){
    
    originalBoard = Array.from(Array(9).keys());
    console.log(originalBoard);
    

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', clicked, false); 
    }

}

function clicked(square){
    doneclicked(square.target.id, ticplayer);
}

function doneclicked(squareId, players){
// console.log(squareId.target.id);
moveMade++;
console.log("Move: ", moveMade);

console.log("Turn", currentTurn);
originalBoard[squareId] = players;
console.log("Read: ", players);


let box = document.getElementById(squareId);

if(box.innerHTML != ""){
    alert("box is taken")        
}

    if(currentTurn==1){
        console.log("First: ", players);
        box.innerHTML = players;
        box.style.color='red';
        currentTurn++;    

    }else if(currentTurn!=1){
        console.log("Second: ", players);
        box.innerHTML = players;
        box.style.color='green';
        currentTurn--;
    }
   
    
    let gameWon = checkForWinner(originalBoard, ticplayer);
    if(gameWon){gameOver(gameWon);
    notiWin(gameWon.Player)}
    ticplayer = ticplayer === "X" ? "O":"X";
}

function checkForWinner(board, Player){

    let plays = board.reduce((a,e,i) => //a=total, e=amount, i=index
    (e===Player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of winSet.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, Player: Player};
            break;
        }
        else if(moveMade == 9 && !(win.every(elem => plays.indexOf(elem) > -1))){
          draw();
          break;
        }
        
    }
    return gameWon;
}


function gameOver(gameWon){
    for(let index of winSet[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
        gameWon.Player == "X" ? "black" : "blue";  
    }
    for (let i = 0; i < box.length; i++) {
        box[i].removeEventListener('click', clicked, false); 
       
    }

}



function notiWin(lastPlayer){

    alert('You WIN this game!');
    let win = document.getElementById("win");
    win.innerHTML = "Congratulations !!! Player " + lastPlayer;
 

      
}

function draw(){
    window.alert('TIE');
    for (let i = 0; i < box.length; i++) {
        box[i].removeEventListener('click', clicked, false); 
       
    }

}


    



