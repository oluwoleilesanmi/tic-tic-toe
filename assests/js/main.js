const Consts = (() => {
  const playerIdx = "X";
  const playerIdo = "O";
  const arrLen = 9;
  const winPos = 
      [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
       [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  return { winPos, playerIdo, playerIdx, arrLen };
})();

let SymbolGen = (() => {
  let getRandSymbol = function() {
    return (Math.floor(Math.random() * Math.floor(2)) === 0) ? 
        Consts.playerIdo : Consts.playerIdx
  };
  return { getRandSymbol };
})();


let Game = (() => {
  let playerA = null, playerB = null,
       gameEnded = false, whoClicked = "";
  
  let initialize = (a, b) => {
    playerA=  Player(a);
    playerB = Player(b);
    whoClicked = playerA.getPlayerName();
  }
  
  let reset = () => {
    Board.resetBoard();
    resetView();
  };
    
  let gameEnd = () => {
    reset();
    gameEnded = true;
  }
  
  let resetView = () => {
    let box = document.querySelectorAll(".box");
    for (let index = 0; index < box.length; index++) {
      box[index].innerHTML = "";
    }
  };
    
  let gamePlayResult = () => {
    if (Board.isWinner()) {
      if (playerA.getSymbol() === Board.isWinner()) {
        alert("Winner is " + playerA.getPlayerName());
        gameEnd()
      } else {
        alert("Winner is " + playerB.getPlayerName());
        gameEnd()
      }
    } else if (Board.isTie()) {
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
           Board.setValue(boardPosClicked, playerA.getSymbol());
           whoClicked = playerB.getPlayerName();
        } else { 
           e.target.textContent = playerB.getSymbol();
           Board.setValue(boardPosClicked, playerB.getSymbol());
           whoClicked = playerA.getPlayerName();
        }
      } else if (e.target.matches(".box") && !Board.allTilesFilled()) {
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
    playerA.setSymbol(SymbolGen.getRandSymbol());
    playerA.getSymbol() === Consts.playerIdx ? playerB.setSymbol(Consts.playerIdo) : playerB.setSymbol(Consts.playerIdx);
  };

  return { attachboardListener, attachSymbol, reset, initialize, removeboardListener };
})();


let Board = (() => {
  let tiles = ["", "", "", "", "", "", "", "", ""];

  let getValue = key => {
    return tiles[key];
  };

  let setValue = (key, value) => {
    return (tiles[key] = value);
  };
    
  let isTie = () => {
    return !isWinner() && !allTilesFilled() ? true : false;
  };

  let allTilesFilled = () => {
    let bol = false;
    tiles.forEach(item => {
      if (item === "") bol = true;
    });
    return bol;
  };

  let resetBoard = () => {
    for (let index = 0; index < Consts.arrLen; index++) {
      tiles[index] = "";
    }
  };
    
  let isWinner = () => {
    let player = [Consts.playerIdx, Consts.playerIdo];
    for (let i = 0; i < player.length; i++) {
      for (let j = 0; j < Consts.winPos.length; j++) {
        if (tiles[Consts.winPos[j][0]] == player[i] && tiles[Consts.winPos[j][1]] 
            == player[i] && tiles[Consts.winPos[j][2]] == player[i]
        ) {
          return player[i];
        }
      }
    }
    return false;
  };
  return { getValue, setValue, isTie, resetBoard, isWinner, allTilesFilled };
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
            Game.removeboardListener();
            flag= 0
            Game.reset();
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

App.init();

