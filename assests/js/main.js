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

  let attachboardListener = () => {};

  let setPlayerSymbol = () => {
    playerA.setSymbol(Random.getRandSymbol());
    playerA.getSymbol() === Consts.playerIdx
      ? playerB.setSymbol(Consts.playerIdo)
      : playerB.setSymbol(Consts.playerIdx);
  };
  return { attachboardListener, setPlayerSymbol };
};

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
      for (let j = 0; j <= Consts.winPositions.length; j++) {
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
    return !isWinner() && !isValEmpty ? true : false;
  };

  let isValEmpty = () => {
    let boardArr = Object.entries(board);
    for (const [key, value] of boardArr) {
      return value === "" ? true : false;
    }
  };

  let resetBoard = () => {
    for (let index = 1; index <= Consts.mapLength; index++) {
      board[index] = "";
    }
    return;
  };
})();
