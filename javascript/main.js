var cells = document.querySelectorAll(".boardCell"),    // HTML objects
    nextMoveTitle = document.querySelector(".nextMoveTitle"),
    retryButton = document.querySelector(".retryButton");
    // InGame objects
    board = [0,1,2,3,4,5,6,7,8],    // Matrix for in-game logic
    move = "X", 
    gameIsRunning = true,
    counter = 1;

retryButton.disabled = true;
nextMoveTitle.textContent = "Next move: " + move;

cells.forEach(function(item,i){
    item.addEventListener('click', function(){
        if(!gameIsRunning)
            return;
        
        if(board[i] == "X" || board[i] == "O")
            return;
        
        board[i] = move;
        this.textContent = move;
        counter++;
        let winner = checkOnWin();

        if(winner == "X" || winner == "O"){
            nextMoveTitle.textContent = '"' + move + '" is winner!';
            gameIsRunning = false;
            retryButton.disabled = false;
        }else if(counter == 10){
            gameIsRunning = false;
            retryButton.disabled = false;
            nextMoveTitle.textContent = "Draw";
        }else{
            swapMove();
            nextMoveTitle.textContent = "Next move: " + move;
        }
    });
});

retryButton.onclick = function(){
    board.forEach(function(item, i, array){
        array[i] = i;
    });

    cells.forEach(function(item){
        item.textContent = "";
    });

    gameIsRunning = true;
    counter = 1;
    nextMoveTitle.textContent = "Next move: " + move;
    this.disabled = true;
}

function swapMove(){
    move = move == "X" ? "O" : "X";
}

function checkOnWin(){
    if(checkBoardLine(0, 1, 2)){       // Checking the rows
        return board[0];
    }else if(checkBoardLine(3, 4, 5)){ 
        return board[3];
    }else if(checkBoardLine(6, 7, 8)){ 
        return board[6];
    }else if(checkBoardLine(0, 3, 6)){ // Check the columns
        return board[0];
    }else if(checkBoardLine(1, 4, 7)){ 
        return board[1];
    }else if(checkBoardLine(2, 5, 8)){
        return board[2];
    }else if(checkBoardLine(0, 4, 8)){ // Check the diagonals
        return board[0];
    }else if(checkBoardLine(2, 4, 6)){
        return board[2];
    }
}

function checkBoardLine(first, second, third){
    return board[first] == board[second] && board[second] == board[third];
}