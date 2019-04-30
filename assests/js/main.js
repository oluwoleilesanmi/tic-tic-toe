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