const size = 20;
var l_player = [];
var l_win=[];
var CPlayer = 0;
const countMax = 5;
var mode = 0;

function loaded() {

    CPlayer=0;
    l_player=[],l_win=[];

    //create Table
    var table = document.getElementById('table');
    var row = document.getElementsByClassName('row');
    var square = document.getElementsByClassName('square');

    table.innerHTML = '';
    for (y = 0; y < size; y++) {
        table.innerHTML += '<tr class="row"></tr>';

        for (x = 0; x < size; x++) {
            var div = '<div class="square" onClick="clickM(id)" onMouseOver="mouseOver(id)" onMouseOut="mouseOut(id)"></div>';
            row.item(y).innerHTML += '<td class="col">' + div + '</td>';
            square.item(x + y * size).setAttribute("id", (x + y * size).toString());
            square.item(x + y * size).setAttribute('player', '-1');
        }
    }
}



function clickM(id) {

    var square = document.getElementsByClassName('square');
    var pos = parseInt(id);

    if (square.item(pos).getAttribute('player') != '-1') return;
    var path = "url(Images/Opng.png)";
    if (CPlayer == 1) path = "url(Images/Xpng.png)";
    square.item(pos).style.backgroundImage = path;
    square.item(pos).setAttribute('player', CPlayer.toString());
    l_player.push(pos);

    if (CPlayer == 0) {
        CPlayer = 1;
    } else {
        CPlayer = 0;
    }

    var win = winGame();
    var pWin = CPlayer;

    if (win) {
        var message = 'Play with "X" win';
        if (pWin == 1) message = 'Player with "O" win';
        alert(message);
    }
}

function mouseOver(id) {
    var square = document.getElementsByClassName('square');
    var pos = parseInt(id);
    square.item(pos).style.backgroundColor = '#3F3';
}

function mouseOut(id) {
    var square = document.getElementsByClassName('square');
    var pos = parseInt(id);
    square.item(pos).style.backgroundColor = '#fff';
}

function playGame(){
    loaded();
}

function minab(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

function winGame() {
    
    var result = false;
    var Board = getBoard();
    for (x = 0; x < size; x++) {
        for (y = 0; y < size; y++) {
            if ( winHor(x,y,Board) || winVer(x,y,Board) || winCross1(x,y,Board) || winCross2(x,y,Board)) {
                var square = document.getElementsByClassName('square');
                for (i = 0; i < l_win.length; i++) {
                    square.item(l_win[i]).style.backgroundColor = '#FF0';
                }
                result = true;
            }
        }
    }
    return result;
}

function getBoard() {
    var tBoard = [];
    var sqr = document.getElementsByClassName('square');
    for (i = 0; i < size * size; i++) {
        tBoard.push(parseInt(sqr.item(i).getAttribute('player')));
    }
    return tBoard;
}

function winHor(x, y, Board) {
    l_win = [];
    var count = 0, counto = 0;
    var player = Board[x + y * size];
    if (player == -2) return false;

    if (x > 0) {
        var p = Board[x - 1 + y * size];
        if (p != player && p != -1) counto++;
    }

    for (i = x; i < size; i++) {
        var p = Board[i + y * size];
        if (p == player && p != -1) {
            count++;
            l_win.push(i + y * size);
        } else if (p != -1) {
            counto++;
            break;
        }
    }

    if (count >= countMax) {
        if (mode == 0) {
            return true;
        } else {
            if (counto >= 2) {
                return false;
            } else {
                return true;
            }
        }
    }
    return false;
}

function winVer(x, y, Board) {
    l_win = [];
    var count = 0;
    var counto = 0;
    var player = Board[x + y * size];

    if (player == -1) return false;

    if (y > 0) {
        var p = Board[x + (y - 1) * size];
        if (p != player && p != -1) counto++;
    }

    for (i = y; i < size; i++) {
        var p = Board[x + i * size];
        if (p == player && p != -1) {
            count++;
            l_win.push(x + i * size);
            
        }
        else if (p != -1) {
            counto++;
            break;
        }
    }

    if (count >= countMax) {
        if (mode == 0) {
            return true;
        } else {
            if (counto >= 2) {
                return false;
            } else {
                return true;

            }
        }
    }
    return false;
}

function winCross1(x, y, Board) {
    l_win = [];
    if (x > size - countMax || y < countMax - 1) return false;

    var count = 0,counto = 0;
    var player = Board[x + y * size];

    if (player == -1) return false;

    if (y < size - 1 && x > 0) {
        var p = Board[x - 1 + (y + 1) * size];
        if (p != player && p != -1) counto++;
    }

    for (i = 0; i <= minab(size - x, y); i++) {
        var p = Board[(x + i) + (y - i) * size];
        if (p == player && p != -1) {
            count=count+1;
            l_win.push((x + i) + (y - i) * size);
        }
        else if (p != -1){
            counto++; 
            break;
        } 
    }

    if (count >= countMax) {
        if (mode == 0) {
            return true;
        } else {
            if (counto >= 2) {
                return false;
            } else {
                return true;
            }
        }
    }
    return false;
}

function winCross2(x, y, Board) {
    l_win = [];
    if (x > size - countMax || y > size - countMax) return false;

    var count = 0;
    var counto = 0;
    var player = Board[x + y * size];

    if (player == -1) return false;

    if (y > 0 && x > 0) {
        var p = Board[x - 1 + (y - 1) * size];
        if (p != player && p != -1) counto++;
    }

    for (i = 0; i < minab(size - x, size - y); i++) {
        var p = Board[(x + i) + (y + i) * size];
        if (p == player && p != -1) {
            count++;
            l_win.push((x + i) + (y + i) * size);
        } else if (p != -1){
            counto++;
            break;
        } 
    }

    if (count >= countMax) {
        if (mode == 0) {
            return true;
        } else {
            if (counto >= 2) {
                return false;
            } else {
                return true;
            }
        }
    }
    return false;
}