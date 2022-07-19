let diceArray = [null, null,null, null, null,]
let player1Board = [], player2Board = [], loserStreak = [];
let loser, finalLoser
let player1DiceArray,player2DiceArray



let startButton = document.querySelector('.start-button')
let rerollButton = document.querySelector('#reroll-button')
let loserDeclaration = document.querySelector('.loser-declaration')

let player2BoardBase = document.querySelector('.player2-board')
let player1BoardBase = document.querySelector('.player1-board')

let player2DiceBase = document.querySelector('.player2-base')
let player1DiceBase = document.querySelector('.player1-base')


let player1PoolBase = document.querySelector('.player1-pool')
let player2PoolBase = document.querySelector('.player2-pool')


const players = {
    player1:[player1PoolBase,player1Board,player1DiceBase,player1DiceArray,player1BoardBase,'player1'],
    player2:[player2PoolBase,player2Board,player2DiceBase,player2DiceArray,player2BoardBase,'player2'],
}


startButton.addEventListener('click', function(){

    if(diceArray[0]) return;

    initializor(players.player2);
    initializor(players.player1);
    renderLoser();
    
})



rerollButton.addEventListener('click', function() {

    rerollButton.classList.remove(`${loser[5]}-reroll-button`)

    if(finalLoser) return;
     
    if(!loser[3][0]) {
        loser[1]=[]
        initializor(loser)
       }
    else rerollDice()

    renderLoser()
    getFinalLoser()
    
})


function diceImg(arr1,arr2) {
    arr2.innerHTML = ''
    for(i = 0; i < arr1.length; i++) {
        arr2.innerHTML += `<img class="dice" src="img/${arr1[i]}.png" alt="">
        ` 
    }
}

function rollDice(arr) {
    for (i = 0; i < arr.length; i++) {
       arr[i] = Math.floor(Math.random() * 6) + 1
    }   
}


function initializor(arr) {
    
    rollDice(diceArray);
    diceImg(diceArray,arr[0])
    getBase(arr);
}



function duplicateDice(arr) {
    let sortedArray = arr.sort()
    
    for(i = sortedArray.length - 1; i >= 0; i--) {
        for(j = 0; j < i; j++) {
            if(sortedArray[j] === sortedArray[i]) 
            return j, i
        } 
    }
}

function getPoolDice(arr1, arr2, arr3) {


    for(i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[0]) {
           arr3.push(arr1[i])
        }
    }
}

function getBase(arr) {

    duplicateDice(diceArray)
    arr[3] = diceArray.slice(j,i+1)
    getPoolDice(diceArray, arr[3], arr[1])
    diceImg(arr[3],arr[2])
    diceImg(arr[1],arr[4])

}






function renderLoser() {
    loser = getLoser()
    rerollButton.classList.add(`${loser[5]}-reroll-button`)
    loserStreak.push(loser[5])
}

function getLoser() {
    if(players.player2[3].length > players.player1[3].length) {
       return loser = players.player1
    } else if (players.player2[3].length === players.player1[3].length) {
        if (players.player2[3] > players.player1[3]) { 
          return   loser = players.player1 
        } else {
           return loser = players.player2
        }
    } else {
       return loser = players.player2
    }
}

function getFinalLoser() {
    let lastLoser = loserStreak.length -1
    if(loserStreak[lastLoser] === loserStreak[lastLoser - 2] && 
       loserStreak[lastLoser] === loserStreak[lastLoser - 1] )
    return finalLoser = loserStreak[lastLoser], 
           loserDeclaration.innerHTML = `Sorry ${finalLoser}, today is not your luck day, you drink`, 
           rerollButton.classList.remove(`${loser[5]}-reroll-button`)
}

function rerollDice() {

    diceImg(loser[1],loser[0])
    rollDice(loser[1])
    
    loser[1].sort()
    let start = loser[1].indexOf(loser[3][0])
    let end = loser[1].lastIndexOf(loser[3][0])
    let time = end - start

    while(time>=0 && start !== -1) {
        loser[3].push(loser[1].splice(start,1)[0])
        time--;
    }
    
    diceImg(loser[3], loser[2])
    diceImg(loser[1],loser[4])
}

