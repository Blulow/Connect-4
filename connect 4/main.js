const turns = document.getElementById('turns');
const winner = document.getElementById('winner');

let grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

let turn = false;

if(Math.floor(Math.random() * 2) == 0) {
    turn = true;
}

if(turn) {
    turns.innerText = 'Blue\'s turn';
} else {
    turns.innerText = 'Red\'s turn';
}

function changeTurn() {
    if(turn) {
        turn = false;
    } else {
        turn = true;
    }
}

function checkLine(a,b,c,d) {
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function checkWin(bd) {
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 7; c++) {
            if (checkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c])) {
                return bd[r][c];
            }
        }
    }

    for (r = 0; r < 6; r++) {
        for (c = 0; c < 4; c++) {
            if (checkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3])) {
               return bd[r][c];
            }
        }
    }

    for (r = 0; r < 3; r++) {
        for (c = 0; c < 4; c++) {
            if (checkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3])) {
                return bd[r][c];
            }
        }
    }
    
    for (r = 3; r < 6; r++) {
        for (c = 0; c < 4; c++) {
            if (checkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3])) {
                return bd[r][c];
            }
        }
    }

    return 0;
}

let colIndex = {
    0: 5,
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
}

onclick = (e) => {
    if(e.target.className == 'cell') {
        if(turn) {
            turns.innerText = 'Red\'s turn';
        } else {
            turns.innerText = 'Blue\'s turn';
        }
        let index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        if(e.target.parentNode.children[(index%7)+colIndex[index%7]*7].innerHTML == '') {
            let obj = document.createElement('div');
            if(turn) {
                grid[colIndex[index%7]][index%7] = 1;
                obj.classList.add('blue');
            } else {
                grid[colIndex[index%7]][index%7] = 2;
                obj.classList.add('red');
            }
            changeTurn();
            e.target.parentNode.children[(index%7)+colIndex[index%7]*7].append(obj);
        }
        colIndex[index%7]--;
    }

    if(checkWin(grid) == 1) {
        winner.style.display = 'flex';
        winner.children[0].innerText = 'Blue Won!';
    } else if(checkWin(grid) == 2) {
        winner.style.display = 'flex';
        winner.children[0].innerText = 'Red Won!';
    }
}

winner.children[1].onclick = () => {
    window.location.reload();
}