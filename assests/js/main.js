let app = () => {};

let Random = () => {
  let getRandomInt = function() {
    if (Math.floor(Math.random() * Math.floor(2)) === 0) {
      return Const.playerIdo;
    } else {
      return Const.playerIdx;
    }
  };
  return { getRandomInt };
};

let Player = playerName => {
  let map = new Map();
  let setSymbol = symbol => {
    map.set(playerName, symbol);
  };
  let getSymbol = () => {
    return map.get(playerName);
  };
  return { setSymbol, getSymbol };
};

const Constants = () => {
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
    let player = [Const.playerIdx, Const.playerIdo];
    for (let i = 0; i < player.length; i++) {
      for (let j = 0; j <= Const.winPositions.length; j++) {
        if (
          board[Const.winPositions[j][0]] === player[i] &&
          board[Const.winPositions[j][1]] === player[i] &&
          board[Const.winPositions[j][2]] === player[i]
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
    for (let index = 1; index <= Const.mapLength; index++) {
      board[index] = "";
    }
    return;
  };
})();
