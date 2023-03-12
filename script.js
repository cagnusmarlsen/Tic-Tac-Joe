const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    const changeBoardX = (j) => {
        board[j] = 'X';
    }
    const changeBoardO = (k) => {
        board[k] = 'O';
    }
    return {board,changeBoardX,changeBoardO};
})();

const players = (name,sign) => {
    const getName = () => {
        return name;
    }
    const getSign = () => {
        return sign;
    }

    return {getName, getSign};
}

const displayController = (() => {
    
    const boxes = document.querySelectorAll('.box');
    const text = document.querySelector('.message');
    let win = false;
    
    const updateBoard = () => {
        for(let i = 0; i < 9; i++) {
            boxes[i].textContent = gameBoard.board[i];
        }
    }
    updateBoard();   

    const playRound = () => {
        let turn = 1;
        text.textContent = "PLAYER 1's TURN";
        boxes.forEach(box => {
            box.addEventListener('click', placeMarker)
        })
    
        function placeMarker (e) {
            if(turn & 1 && e.target.textContent === '') {
                text.textContent = "PLAYER 2's TURN";
                gameBoard.changeBoardX(e.target.id);
                updateBoard();
                turn++;
            }
            else if (!(turn & 1) && e.target.textContent === ''){
                text.textContent = "PLAYER 1's TURN";
                gameBoard.changeBoardO(e.target.id);
                updateBoard();
                turn++;
            }
            checkWin(turn);

            if(turn === 10) {
                text.textContent = "IT'S A TIE!";
            }
            // Remove event listener if won
            if(win) {
                boxes.forEach(box => {
                    box.removeEventListener('click',placeMarker)
                })
            }
        }
        
    }
    playRound();

    function checkWin(turn) {
        
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        winConditions.forEach(item => {
            if(gameBoard.board[item[0]] === gameBoard.board[item[1]] && gameBoard.board[item[1]] === gameBoard.board[item[2]] && gameBoard.board[item[1]] != '') {
                win = true;
                if(turn & 1) {
                    console.log('Player O Wins!');
                    text.textContent = 'PLAYER 2 WINS!';
                }
                else {
                    console.log('Player X Wins!');
                    text.textContent = 'PLAYER 1 WINS!';
                }
            }
        })
    }

})()
