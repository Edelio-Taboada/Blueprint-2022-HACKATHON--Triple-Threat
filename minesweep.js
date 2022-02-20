
function Mines(index, bomb){
    this.indX = index%9;
    this.indY = Math.trunc(index/9);
    this.isBomb = bomb;
    this.adjMines = [];
    this.adjBombCount = -1;
    this.sweeped = false;
    this.flagged = false;
    this.setAdjMines = () =>{
        for(let i = 0; i<81; i++){
            let cMine = boardy.board[i];
            if(this.indX==cMine.indX || this.indX == cMine.indX + 1 || this.indX == cMine.indX - 1){
                if(this.indY==cMine.indY || this.indY == cMine.indY + 1 || this.indY == cMine.indY - 1){
                    if(!(this.indX == cMine.indX && this.indY == cMine.indY))
                    this.adjMines.push(cMine);
                }
            }
        }
    }
    this.setAdjBomb = () =>{
        for(let i = 0; i<this.adjMines.length; i++){
            if(this.adjMines[i].isBomb){
                if(this.adjBombCount == -1){
                    this.adjBombCount = 1;
                }else{
                    this.adjBombCount++;
                }
                
            }
        }
        if(this.adjBombCount == -1){
            this.adjBombCount = 0;
        }
    }
}
function Board(){
    
    this.board = []
    this.populateBoard = ()=>{
        this.mineCount = 10;
        this.squareCount = 81;
        for(let i = 0; i<81; i++){


            let bomby = getRandomInt(this.squareCount) < this.mineCount;
            if(bomby) {
                this.mineCount -=1;
            }
                this.squareCount -= 1;
                this.board[i] = new Mines(i, bomby);
        }
        for(let i = 0; i<81; i++){
            this.board[i].setAdjMines();
            this.board[i].setAdjBomb();
        }
    }
    this.getBoardArray = ()=>{
        return this.board;
    }
    this.checkSquare = ()=>{
        for(let i = 0; i<81; i++){
            if(graph.mouseOnMine(this.board[i])){
                this.board[i].sweeped = true;
                if(this.board[i].isBomb){
                    this.loss();
            }
        }
    }
    }
    this.flagSquare = ()=>{
        for(let i = 0; i<81; i++){
            if(graph.mouseOnMine(this.board[i]) && !this.board[i].sweeped){
                this.board[i].flagged = true;
            }
    }
   

}
    this.loss = () => {
        console.log("YOU FAILED!")
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

