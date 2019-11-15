console.log("Load script.js");

// Instantiating the global app object
var app = {};


var game = {
    user: '',
    computer: '',
    turn: null,
    userTurn: false,
    win: false
};

var startModal = document.getElementById('start');
var winModal = document.getElementById('you-win');
var loseModal = document.getElementById('you-lose');
var tieModal = document.getElementById('you-tie');
var sqList = document.getElementsByClassName('square');
var playList = document.getElementsByClassName('playable');
var xList = document.getElementsByClassName('x-play');
var oList = document.getElementsByClassName('o-play');
var startBtn = document.getElementsByClassName('new-game');
var winSet = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] 
];
var userSquares = [];
var compSquares = [];

//document.getElementById('x').onclick = function(){selectPlyr('x')};
//document.getElementById('o').onclick = function(){selectPlyr('o')};
document.getElementById('first').onclick = function(){selectPlyr('first')};
document.getElementById('second').onclick = function(){selectPlyr('second')};
document.getElementById('start-new').onclick = newGame;
for (let i = 0; i < startBtn.length; i++) {
    startBtn[i].addEventListener('click', newGame);
}


function attachClickEvent() {
    var i = 0;
    for (; i < sqList.length; i++) {
        sqList[i].addEventListener('click', clickSquare);
    }
}

function newGame() {
    startModal.style.display = 'block';
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    tieModal.style.display = 'none';
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

function selectPlyr(id) {
    startModal.style.display = 'none';
    game.win = false;
    if (document.getElementById('x').checked) {
        game.user = 'x';
        game.computer = 'o';
    } else if (document.getElementById('o').checked) {
        game.user = 'o';
        game.computer = 'x';
    }
    if (id === 'second') {        
        setTimeout(computerMove, 400);
    }
    console.log('start ' + id);
};

function computerMove() {
    var randomPlay = Math.floor((Math.random() * playList.length));
    var compPlay = playList[randomPlay];
    var icon = compPlay.childNodes;
    var compPlayId = compPlay.id;
    if (game.win === false) {
        compSquares.push(parseInt(compPlayId));
        compPlay.removeEventListener('click', clickSquare);
        compPlay.classList.toggle('playable');
        game.turn = 1;
        game.userTurn = true;
        if (game.computer === 'x') {
            icon[0].style.display = 'inline-block';
        } else if (game.computer === 'o') {
            icon[1].style.display = 'inline-block';
        }
        console.log('Square: ' + compPlay.classList);
        console.log('Compsquare: ' + compSquares.sort());
        console.log(checkWinner(compSquares));
        checkWinner(compSquares);
    }
}

function clickSquare(e) {
    var elId = e.target.id;
    var icon = e.target.childNodes;
    userSquares.push(parseInt(elId));
    if (e.target.classList.contains('playable')) {
        e.target.removeEventListener('click', clickSquare);
        e.target.classList.toggle('playable');        
        setTimeout(computerMove, 400);
        if (game.user === 'x') {
            icon[0].style.display = 'inline-block';
        } else if (game.user === 'o') {
            icon[1].style.display = 'inline-block';
        }
    }
    game.turn = 2;
    game.userTurn = false;
    console.log('Square: ' + e.target.classList);
    console.log('Usersquares: ' + userSquares.sort());
    console.log(checkWinner(userSquares));
    checkWinner(userSquares);
}

function checkWinner(squares) {
    var i = 0;
    function showModal(modal) {
        return modal.style.display = 'block';
    }
    for (; i < winSet.length; i++) {
        game.win = winSet[i].every(element => squares.indexOf(element) !== -1);
        if (game.win) {
            win = winSet[i];
            if (game.turn === 1 ? setTimeout(showModal(loseModal), 400) : setTimeout(showModal(winModal), 400));
            break;
        } else if (!game.win && playList.length === 0) {
            setTimeout(showModal(tieModal), 400);
        }
    }
    return game.win;
}

window.onload = attachClickEvent;