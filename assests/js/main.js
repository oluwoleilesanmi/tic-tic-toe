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

let Random = (() => {
  let getRandSymbol = function() {
    return (Math.floor(Math.random() * Math.floor(2)) === 0) ? Consts.playerIdo : Consts.playerIdx
  };
  return { getRandSymbol };
})();

let Controller = (nameA, nameB) => {
  let playerA = Player(nameA), playerB = Player(nameB), 
       whoClicked = playerA.getPlayerName(), restart = false, gameEnded = false;
    
  let reset = () => {
    Model.resetBoard();
    resetView();
  };
    
  let setGameEnded = (bol) => {
      gameEnded = bol;
  }
  let setRestart = (bol) => {
      restart = bol;
  }
  
  let getRestart = () => {
      return restart;
  }
    
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
       
  let attachboardListener = () => {
    document.addEventListener("click", e => {
      let boardPosClicked = e.target.getAttribute("position"),
        userInput = e.target.textContent;

      userInput = Number(userInput);
      boardPosClicked = Number(boardPosClicked);
      if (e.target.matches(".box") && !isNaN(userInput) && !gameEnded) {
        if (whoClicked === playerA.getPlayerName()) {
          e.target.textContent = playerA.getSymbol();
          Model.setValue(boardPosClicked, playerA.getSymbol());
          whoClicked = playerB.getPlayerName();
        } else {
          e.target.textContent = playerB.getSymbol();
          Model.setValue(boardPosClicked, playerB.getSymbol());
          whoClicked = playerA.getPlayerName();
        }
      } else if (e.target.matches(".box")) {
        if (!restart) {
          alert("Click another tile!!!");
        }
      }
      gamePlayResult();
    });
  };

  let attachSymbol = () => {
    playerA.setSymbol(Random.getRandSymbol());
    playerA.getSymbol() === Consts.playerIdx ? playerB.setSymbol(Consts.playerIdo) : playerB.setSymbol(Consts.playerIdx);
  };

  return { attachboardListener, attachSymbol, reset, setGameEnded, setRestart, getRestart };
};


let Model = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let getValue = key => {
    return board[key];
  };

  let setValue = (key, value) => {
    return (board[key] = value);
  };
    
  let isTie = () => {
    return !isWinner() && !isTileEmpty() ? true : false;
  };

  let isTileEmpty = () => {
    let bol = false;
    board.forEach(item => {
      if (item === "") bol = true;
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
  return { getValue, setValue, isTie, resetBoard, isWinner };
})();

const Consts = (() => {
  let playerIdx = "X";
  let playerIdo = "O";
  let arrLen = 9;
  let winPos = 
      [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  return { winPos, playerIdo, playerIdx, arrLen };
})();

let App = (() => {
    let controller = Controller("wole", "ile");
  let init = () => {
    startButtonListener();
  };
    
  let startButtonListener = () => {
    let e = document.querySelector(".start");
    e.addEventListener("click", () => {
      if (controller.getRestart()){
        controller.reset();
        controller.setGameEnded(false);
        controller.attachboardListener();
      }else{
        controller = Controller(prompt(), prompt());
        controller.attachSymbol();
        controller.setGameEnded(false);
        controller.attachboardListener();
        controller.reset();
        controller.setRestart(true); 
      }
      
    });
  };
  return { init };
})();

App.init();

