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
    
})();

const Const = {
    winPositions: [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                   [1, 4, 7], [2, 5, 8], [3, 6, 9],
                   [1, 5, 9], [3, 5, 7]],
    playerX: 'X',
    playerO: 'O',
    mapLength: 9
}