
function Mines(index, bomb){
    this.indX = index%9;
    this.indY = Math.trunc(index/9);
    this.isBomb = bomb;
    this.adjMines = [];
    this.sweeped = false;
    this.flagged = false;
    this.setAdjMines = () =>{
        this.sweeped;
    }
}
function Board(){
    this.reset = false;
    this.board = []
    this.probability = []
    this.mineCount = 10;
    this.squareCount = 81;
    this.unsweepedsquare = 81;
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
            else{
                this.unsweepedsquare--;
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
        this.reset()
    }

    function nextMove(){
    
        

        let listy = [];
        for(let i = 0; i < 81; i++){
            let x = 1;
            listy[i] = .99;
            let unsweepedandnotflagged = 0;
            for(let p = 0; p < this.board[i].AdjMines.length; p++){
                if(!this.board[i].adjMines[p].sweeped){
                    unsweepedandnotflagged++;
                }

                
    
    
            }
            if(unsweepedandnotflagged==this.board[i].adjBombCount){

                console.log("There is a bombs all around the squares of " + (i+1));
                break;

            }
    
            listy[i] = (this.mineCount / unsweepedandnotflagged)
    
    
    
    
    
        }
        console.log(listy.indexOf(min(listy))+1)
    
    
    
    
    
    }

    
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



