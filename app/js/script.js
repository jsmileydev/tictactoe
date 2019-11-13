console.log("Load script.js");

// Instantiating the global app object
var app = {};


var game = {
    user: '',
    computer: '',
    turn: null,
    userTurn: false
};

var startModal = document.getElementById('start');
var sqList = document.getElementsByClassName('square');
var playList = document.getElementsByClassName('playable');
var xList = document.getElementsByClassName('x-play');
var oList = document.getElementsByClassName('o-play');
var winSet = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] 
];
var userSquares = [];
var compSquares = [];

document.getElementById('x').onclick = function(){selectPlyr('x')};
document.getElementById('o').onclick = function(){selectPlyr('o')};
document.getElementById('start-new').onclick = newGame;


function newGame() {
    startModal.style.display = 'block';
    var icon = document.getElementsByClassName('icon');
    var i = 0;
    var k = 0;
    for (; i < icon.length; i++) {
        icon[i].style.display = 'none';
        console.log('hide icons');
    }
    for(; k < sqList.length; k++) {
        sqList[k].classList.add('playable');
        console.log('set squares to playable');
    }
    console.log('new game');
    game.user = '';
    game.computer = '';
    compSquares = [];
    userSquares = [];
    attachClickEvent();
}

function attachClickEvent() {
    var i = 0;
    for (; i < sqList.length; i++) {
        sqList[i].addEventListener('click', clickSquare);
    }
}

function computerMove() {
    var randomPlay = Math.floor((Math.random() * playList.length));
    var compPlay = playList[randomPlay];
    var icon = compPlay.childNodes;
    var compPlayId = compPlay.id;
    console.log('Square: ' + compPlay.classList);
    compSquares.push(parseInt(compPlayId));
    console.log('Compsquare: ' + compSquares.sort());
    if (game.computer === 'x') {
        icon[0].style.display = 'inline-block';
        compPlay.removeEventListener('click', clickSquare);
        compPlay.classList.toggle('playable');
    } else if (game.computer === 'o') {
        icon[1].style.display = 'inline-block';
        compPlay.removeEventListener('click', clickSquare);
        compPlay.classList.toggle('playable');
    }
    game.turn = 1;
    game.userTurn = true;
    console.log(checkWinner(compSquares));
    checkWinner(compSquares);
}

function selectPlyr(id) {
    startModal.style.display = 'none';
    if (id === 'x') {
        game.user = 'x';
        game.computer = 'o';
    } else if (id === 'o') {
        game.user = 'o';
        game.computer = 'x';
    }
    console.log('start ' + id);
    setTimeout(computerMove, 400);
};

function clickSquare(e) {
    var elId = e.target.id;
    var icon = e.target.childNodes;
    console.log('Square: ' + e.target.classList);
    userSquares.push(parseInt(elId));
    console.log('Usersquares: ' + userSquares.sort());
    if (game.user === 'x' && e.target.classList.contains('playable')) {
        icon[0].style.display = 'inline-block';
        e.target.removeEventListener('click', clickSquare);
        e.target.classList.toggle('playable');
        setTimeout(computerMove, 400);
    } else if (game.user === 'o' && e.target.classList.contains('playable')) {
        icon[1].style.display = 'inline-block';
        e.target.removeEventListener('click', clickSquare);
        e.target.classList.toggle('playable');
        setTimeout(computerMove, 400);
    }
    game.turn = 2;
    game.userTurn = false;
    console.log(checkWinner(userSquares));
    checkWinner(userSquares);
}

function checkWinner(squares) {
    var win = false;
    var i = 0;
    for (; i < winSet.length; i++) {
        win = winSet[i].every(element => squares.indexOf(element) > -1);
        if (win) {
            win = winSet[i];
            break;
        }
    }
    return win;
}

window.onload = attachClickEvent;