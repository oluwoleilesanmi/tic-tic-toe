let players = function (){}
let app = function (){}

let Model = (() => {
    let board = {1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:''}
    
    let getValue = (key) => {
      return board[key];
    }
    
    let setValue = (key, value) => {
      return board[key] = value;
    }
    
    let isWinner = () => {
      let player = [Const.playerX, Const.playerO]
      for(let i = 0; i < player.length; i++){
        for(let j = 0; j <= Const.winPositions.length; j++){
          if(board[Const.winPositions[j][0]] === player[i] && 
             board[Const.winPositions[j][1]] === player[i] && 
             board[Const.winPositions[j][2]] === player[i]){
             return player[i];
            }
          }
        }
       return false;
      }
    }
    
    let isTie = () => {
      return (!isWinner() && !isValEmpty) ? true : false;
    }
    
    let isValEmpty = () => {
      let boardArr = Object.entries(board)
      for (const [key, value] of boardArr) {
        return (value === '') ? true : false;
      }             
    }
    
    let resetBoard = () => {
      for (let index = 1; index <= Const.mapLength ; index++){
        board[index] = '';
      }
    }
    
})();

const Const = {
    winPositions: [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                   [1, 4, 7], [2, 5, 8], [3, 6, 9],
                   [1, 5, 9], [3, 5, 7]],
    playerX: 'X',
    playerO: 'O',
    mapLength: 9
}