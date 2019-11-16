console.log("Load script.js");

// Instantiating the global app object
var app = {};


var game = {
    user: '',
    computer: '',
    turn: null,
    userTurn: false,
    win: false,
    userWins: 0,
    compWins: 0,
    ties: 0
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

document.getElementById('first').onclick = function(){selectPlyr('first')};
document.getElementById('second').onclick = function(){selectPlyr('second')};
document.getElementById('reset-wins').onclick = function(){resetWinTotals()};
document.getElementById('start-new').onclick = newGame;
var i = 0;
for (; i < startBtn.length; i++) {
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
        sqList[k].style.color = 'black';
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
        game.turn = 2;
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
        if (game.computer === 'x') {
            icon[0].style.display = 'inline-block';
        } else if (game.computer === 'o') {
            icon[1].style.display = 'inline-block';
        }
        console.log('Square: ' + compPlay.classList);
        console.log('Compsquare: ' + compSquares.sort());
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
    console.log('Square: ' + e.target.classList);
    console.log('Usersquares: ' + userSquares.sort());
    checkWinner(userSquares);
}

function checkWinner(squares) {
    var i = 0;
    function showModal(modal) {
        return modal.style.display = 'block';
    }
    for (; i < winSet.length; i++) {
        var win = winSet[i].every(function (element) {
            return squares.indexOf(element) !== -1;
          });
        if (win) {
            game.win = true;
            win = winSet[i];
            document.getElementById(win[0]).style.color = 'green';
            document.getElementById(win[1]).style.color = 'green';
            document.getElementById(win[2]).style.color = 'green';
            if (game.turn === 1) {
                setTimeout(function() {showModal(loseModal) } , 600);
                console.log(game.compWins);
                game.compWins += 1;
                document.getElementById('comp-wins').textContent = game.compWins; 
                console.log(game.compWins);
                break;
            }  else if (game.turn === 2) {
                setTimeout(function() {showModal(winModal)} , 600);
                console.log(game.userWins);
                game.userWins += 1;
                document.getElementById('user-wins').textContent = game.userWins;
                console.log(game.userWins);
                break;
            }
        } else if (!game.win && playList.length === 0) {
            console.log(game.win);
            setTimeout(function() {showModal(tieModal)}, 600);
            console.log(game.ties);
            game.ties += 1;
            document.getElementById('ties').textContent = game.ties;
            console.log(game.ties);
            break;
        }
    }
    return game.win;
}

function resetWinTotals() {
    game.userWins = 0;
    document.getElementById('user-wins').textContent = game.userWins;
    game.compWins = 0;    
    document.getElementById('comp-wins').textContent = game.compWins; 
    game.ties = 0;
    document.getElementById('ties').textContent = game.ties;
}

window.onload = attachClickEvent;