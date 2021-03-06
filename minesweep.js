
let haveLost = false;
let haveWon = false;
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
    this.reset = false;
    this.board = []
    this.probability = []
    this.mineCount = 10;
    this.squareCount = 81;
    this.unsweepedsquare = 81;
    this.solverBombCount =10;
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
    this.checkSquare = (square)=>{
        
        square.sweeped = true;
            if(square.isBomb){
                this.loss();       
            }
            else{
                this.unsweepedsquare--;
            }
            if(square.adjBombCount == 0){
                for(let i = 0; i<square.adjMines.length;i++){
                    if(!square.adjMines[i].sweeped){
                        this.checkSquare(square.adjMines[i]);
                    }
                    
                }
                
            }
            
        }
    
    this.flagSquare = ()=>{
        for(let i = 0; i<81; i++){
            if(graph.mouseOnMine(this.board[i]) && !this.board[i].sweeped){
                this.board[i].flagged = !this.board[i].flagged;
            }
    }
   

}
    this.loss = () => {
        
        if(!haveLost){
            alert("try again... loser");
            haveLost = true;
        }
        for(let i = 0; i<81; i++){
            if(this.board[i].isBomb){
                graph.discoveredBombs.push(this.board[i])
            }
        }
    }
    this.win = () =>{
        if(graph.clearedSquares.length == 71 && !haveWon){
            alert("WINNER WINNER CHICKEN DINNER")
            haveWon = true;
        }
        console.log(graph.clearedSquares.length)
        
    }
    this.nextMove =  () =>{



        let listy = [];
        for(let i = 0; i < 81; i++){
            let x = 1;

            listy[i] = this.solverBombCount/81;

            let unsweepedandnotflagged = 0;
            for(let p = 0; p < this.board[i].adjMines.length; p++){
                if(!this.board[i].adjMines[p].sweeped && this.board[i].sweeped && this.board[i].adjBombCount>0 && !this.board[i].flagged && !this.board[i].adjMines[p].flagged){
                    unsweepedandnotflagged++;
                }




            }

            if(unsweepedandnotflagged==this.board[i].adjBombCount && this.board[i].adjBombCount>0 ){

                console.log("There is a bombs all around the squares of " + (i+1));
                return(i+1);
                break;

            }
            if(this.board[i].adjBombCount>0 && !this.board[i].sweeped && unsweepedandnotflagged>0){


            listy[i] = (this.board[i].adjBombCount / unsweepedandnotflagged)
            }




        }
        if(listy[0] == listy[listy.length-1]){
            return("ANY")
        }


        console.log(listy)
        return (listy.indexOf(min(listy))+1)




    }

    

}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


    

