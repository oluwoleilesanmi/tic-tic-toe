let Random = (() => {
  let getRandSymbol = function() {
    return (Math.floor(Math.random() * Math.floor(2)) === 0) ? 
        Consts.playerIdo : Consts.playerIdx
  };
  return { getRandSymbol };
})();


let Player = playerName => {
  let map = new Map();
       
  let setSymbol = symbol => {
    map.set(playerName, symbol);
  };
  let getSymbol = () => {
    return map.get(playerName);
  };
  let getPlayerName = () => {
    return playerName;
  };
  return { setSymbol, getSymbol, getPlayerName };
};


let Game = (() => {
  let playerA = null, playerB = null,
       gameEnded = false, whoClicked = "";
    
  let initialize = (a, b) => {
    playerA=  Player(a);
    playerB = Player(b);
    whoClicked = playerA.getPlayerName();
  }
  
  let reset = () => {
    Model.resetBoard();
    resetView();
  };
    
  let gameEnd = () => {
    reset();
    gameEnded = true;
  }
  
  let hasEnded = () => {
    return gameEnded;
  }
  
  let resetView = () => {
    let box = document.querySelectorAll(".box");
    for (let index = 0; index < box.length; index++) {
      box[index].innerHTML = "";
    }
  };
    
  let gamePlayResult = () => {
    if (Model.isWinner()) {
      if (playerA.getSymbol() === Model.isWinner()) {
        alert("Winner is " + playerA.getPlayerName());
        gameEnd()
      } else {
        alert("Winner is " + playerB.getPlayerName());
        gameEnd()
      }
    } else if (Model.isTie()) {
      alert("its a tie");
      gameEnd()
    }
  };
    
  let displaySymbol =  e => {
    let boardPosClicked = e.target.getAttribute("position"),
      userInput = e.target.textContent;
      userInput = Number(userInput);
      boardPosClicked = Number(boardPosClicked);
      if (e.target.matches(".box") && !isNaN(userInput)) {
        if (whoClicked === playerA.getPlayerName()) {
           e.target.textContent = playerA.getSymbol();
           Model.setValue(boardPosClicked, playerA.getSymbol());
           whoClicked = playerB.getPlayerName();
        } else { 
           e.target.textContent = playerB.getSymbol();
           Model.setValue(boardPosClicked, playerB.getSymbol());
           whoClicked = playerA.getPlayerName();
        }
      } else if (e.target.matches(".box") && !Model.allTilesFilled()) {
           alert("Click another tile!!!");
      }
      gamePlayResult();
  }
  
  let attachboardListener = () => {
    document.addEventListener("click", displaySymbol);
  };
    
  let removeboardListener = () => {
    document.removeEventListener("click", displaySymbol, false);
  }

  let attachSymbol = () => {
    playerA.setSymbol(Random.getRandSymbol());
    playerA.getSymbol() === Consts.playerIdx ? playerB.setSymbol(Consts.playerIdo) : playerB.setSymbol(Consts.playerIdx);
  };

  return { attachboardListener, attachSymbol, reset, initialize, removeboardListener, hasEnded};
})();


let Model = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let getValue = key => {
    return board[key];
  };

  let setValue = (key, value) => {
    return (board[key] = value);
  };
    
  let isTie = () => {
    return !isWinner() && !allTilesFilled() ? true : false;
  };

  let allTilesFilled = () => {
    let bol = false;
    board.forEach(item => {
      if (item === "") bol = true;
    });
    return bol;
  };
    
  let allTilesEmpty = () => {
    let bol = true;
    board.forEach(item => {
      if (item != "") bol = false;
    });
    return bol;
  };

  let resetBoard = () => {
    for (let index = 0; index < Consts.arrLen; index++) {
      board[index] = "";
    }
  };
    
  let isWinner = () => {
    let player = [Consts.playerIdx, Consts.playerIdo];
    for (let i = 0; i < player.length; i++) {
      for (let j = 0; j < Consts.winPos.length; j++) {
        if (board[Consts.winPos[j][0]] == player[i] && board[Consts.winPos[j][1]] 
            == player[i] && board[Consts.winPos[j][2]] == player[i]
        ) {
          return player[i];
        }
      }
    }
    return false;
  };
  return { getValue, setValue, isTie, resetBoard, isWinner, allTilesEmpty, allTilesFilled };
})();


const Consts = (() => {
  let playerIdx = "X";
  let playerIdo = "O";
  let arrLen = 9;
  let winPos = 
      [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
       [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  return { winPos, playerIdo, playerIdx, arrLen };
})();


let App = (() => {
  let playerA = "", playerB = "", flag = 0;
  
  let init = () => {
    attachStartListener()
      attachResetListener()
  };
    
  let attachStartListener = () => {
    startButton = document.querySelector(".start")
    startButton.addEventListener("click", promptUser)
  };
    
  let attachResetListener = () => {
     let resetButton = document.querySelector(".reset");
       resetButton.addEventListener("click",() => {
         if(!Model.allTilesEmpty()){
            Game.removeboardListener();
            flag= 0
            Game.reset();
          }
        })
  };
    
  let promptUser = () => {
    if (flag == 0){
      playerA = prompt();
      playerB = prompt();
      if (playerA != "" && playerB != "") {
        Game.initialize(playerA, playerB)
        Game.attachSymbol();
        Game.attachboardListener();
      }else if(playerA == "" || playerB == "") {
         Game.removeboardListener();
         flag = -1;
      }
    }
      Game.reset();
      ++flag
  }
    
  return { init };
})();

App.init();

