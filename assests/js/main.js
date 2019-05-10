const Consts = (() => {
  let winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let playerIdx = "X";
  let playerIdo = "O";
  let mapLength = 9;
  return { winPositions, playerIdo, playerIdx, mapLength };
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

let Random = (() => {
  let getRandSymbol = function() {
    if (Math.floor(Math.random() * Math.floor(2)) === 0) {
      return Consts.playerIdo;
    } else {
      return Consts.playerIdx;
    }
  };
  return { getRandSymbol };
})();

let App = (nameA, nameB) => {
  let playerA = Player(nameA);
  let playerB = Player(nameB);
  let whoClicked = playerA.getPlayerName();
  let restart = false;
  let gameEnded = false;

  let startButtonListener = () => {
    let e = document.querySelector(".start");
    e.addEventListener("click", () => {
      gameEnded = false;
      attachboardListener();
      reset();
      restart = true;
    });
  };

  let reset = () => {
    Model.resetBoard();
    resetView();
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

  let gamePlayResult = () => {
    if (Model.isWinner()) {
      if (playerA.getSymbol() === Model.isWinner()) {
        alert("Winner is " + playerA.getPlayerName());
        reset();
        gameEnded = true;
      } else {
        alert("Winner is " + playerB.getPlayerName());
        reset();
        gameEnded = true;
      }
    } else if (Model.isTie()) {
      alert("its a tie");
      reset();
      gameEnded = true;
    }
  };

  let attachSymbol = () => {
    playerA.setSymbol(Random.getRandSymbol());
    playerA.getSymbol() === Consts.playerIdx
      ? playerB.setSymbol(Consts.playerIdo)
      : playerB.setSymbol(Consts.playerIdx);
  };

  let resetView = () => {
    let box = document.querySelectorAll(".box");
    for (let index = 0; index < box.length; index++) {
      box[index].innerHTML = "";
    }
  };

  return {
    attachboardListener,
    attachSymbol,
    startButtonListener
  };
};

let Exec = (() => {
  let init = () => {
    let app = App("wole", "ile");
    app.startButtonListener();
    app.attachSymbol();
  };
  return { init };
})();

Exec.init();

let Model = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  let getValue = key => {
    return board[key];
  };

  let setValue = (key, value) => {
    return (board[key] = value);
  };

  let isWinner = () => {
    let player = [Consts.playerIdx, Consts.playerIdo];
    for (let i = 0; i < player.length; i++) {
      for (let j = 0; j < Consts.winPositions.length; j++) {
        if (
          board[Consts.winPositions[j][0]] === player[i] &&
          board[Consts.winPositions[j][1]] === player[i] &&
          board[Consts.winPositions[j][2]] === player[i]
        ) {
          return player[i];
        }
      }
    }
    return false;
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
    for (let index = 0; index < Consts.mapLength; index++) {
      board[index] = "";
    }
  };
  return { getValue, setValue, isTie, resetBoard, isWinner };
})();
