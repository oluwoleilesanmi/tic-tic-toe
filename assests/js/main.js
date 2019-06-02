const Consts = (() => {
  const playerSymbx = "X";
  const playerSymbo = "O";
  const arrLen = 9;
  const winPos = 
      [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
       [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  return { winPos, playerSymbo, playerSymbx, arrLen };
})();

let Game = (() => {
  let playerA = null, playerB = null,
       gameEnded = false, whoClicked = "";
  
  let initialize = (a, b) => {
    playerA=  Player(a);
    playerB = Player(b);
    whoClicked = playerA.getName();
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
    
  let attachboardListener = () => {
    document.addEventListener("click", displaySymbol);
  };
    
  let removeboardListener = () => {
    document.removeEventListener("click", displaySymbol, false);
  };
    
  let gamePlayResult = () => {
    if (Board.isWinner()) {
      if (playerA.getSymbol() === Board.isWinner()) {
        alert("Winner is " + playerA.getName());
        gameEnd()
      } else {
        alert("Winner is " + playerB.getName());
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
        if (whoClicked === playerA.getName()) {
           e.target.textContent = playerA.getSymbol();
           Board.setValue(boardPosClicked, playerA.getSymbol());
           whoClicked = playerB.getName();
        } else { 
           e.target.textContent = playerB.getSymbol();
           Board.setValue(boardPosClicked, playerB.getSymbol());
           whoClicked = playerA.getName();
        }
      } else if (e.target.matches(".box") && !Board.allTilesFilled()) {
           alert("Click another tile!!!");
      }
      gamePlayResult();
  }

  let attachSymbol = () => {
    playerA.setSymbol(SymbolGen.getRandSymbol());
    playerA.getSymbol() === Consts.playerSymbx ? playerB.setSymbol(Consts.playerSymbo) : playerB.setSymbol(Consts.playerSymbx);
  };

  return { attachboardListener, attachSymbol, reset, initialize, removeboardListener };
})();


let Board = (() => {
  let tiles = Array.from([9]);

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
    return bol = tiles.some(item => item === "");
  };

  let resetBoard = () => {
    for (let index = 0; index < Consts.arrLen; index++) {
      tiles[index] = "";
    }
  };
    
  let isWinner = () => {
    let player = [Consts.playerSymbx, Consts.playerSymbo];
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
  let flag = 0;
  
  let init = () => {
    attachStartListener()
    attachResetListener()
  };
    
  let attachStartListener = () => {
    startButton = document.querySelector(".start")
    startButton.addEventListener("click", promptUser)
  };
    
  let attachResetListener = () => {
    resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", reset);
  };
    
  let reset = () => {
    Game.removeboardListener();
    flag= 0
    Game.reset();
  }
    
  let promptUser = () => {
    if (flag == 0){
      let nameA = prompt(), nameB = prompt();
      if (nameA !== null && nameB !== null && nameA !== "" && nameB !== "") {
        Game.initialize(nameA, nameB)
        Game.attachSymbol();
        Game.attachboardListener();
      }else {
         Game.removeboardListener();
         flag = -1;
      }
    }
      Game.reset();
      ++flag
  }
  return { init };
})();

let SymbolGen = (() => {
  let getRandSymbol = function() {
    return (Math.floor(Math.random() * Math.floor(2)) === 0) ? 
        Consts.playerSymbo : Consts.playerSymbx
  };
  return { getRandSymbol };
})();

let Player = name => {
  let map = new Map();
  let setSymbol = symbol => {map.set(name, symbol);};
  let getSymbol = () => {return map.get(name);};
  let getName = () => {return name;};
  return { setSymbol, getSymbol, getName };
};

App.init();