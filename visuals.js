
let graph;
let boardy;
function setup(){
    createCanvas(600, 600);
    graph = new Graph();
    boardy = new Board();
    boardy.populateBoard();
    graph.populateBoard();
    console.log(graph.board);
}
function draw() {
    background(192,192,192);
    graph.draw();

}

function Graph() {
    this.board = [];
    this.clearedSquares = [];
    this.flaggedSquares = [];
    this.margin = 20;
    this.squareWidth = (600-this.margin*2)/9
    this.draw = ()=> {
        for(let i = 0; i<81; i++){
            if(this.mouseOnMine(this.board[i])){
                let mine = this.board[i];
                fill(241, 213, 46);
                rect(this.margin + mine.indX * this.squareWidth,
                     this.margin + mine.indY * this.squareWidth,
                     this.squareWidth,
                     this.squareWidth)
            }
        }
        fill(0);

        strokeCap(ROUND);
        strokeWeight(4);
        stroke(280,280,280)
        //highlights
        for(let i = 0; i<=9; i++){
            
            line(this.margin+4, this.margin + this.squareWidth*(i-1)+4, 600-this.margin-4, this.margin + this.squareWidth * (i-1)+4)
            line(this.margin + this.squareWidth * (i-1)+4, this.margin,this.margin+this.squareWidth * (i-1) + 4, 600-this.margin);
        }
        
        stroke(128, 128, 128);
        strokeCap(ROUND);
        strokeWeight(4);
        //grid lines
        for(let i = 0; i<=9; i++){
            line(this.margin, this.margin + this.squareWidth * i, 600-this.margin, this.margin + this.squareWidth * i);
            line(this.margin + this.squareWidth * i, this.margin, this.margin + this.squareWidth * i, 600-this.margin);
        }

        //draw the sweeped squares
        fill(169, 169, 169)
        for(let i = 0; i<this.clearedSquares.length; i++){
            let mine = this.clearedSquares[i];
            
            rect(this.margin + mine.indX * this.squareWidth,
                this.margin + mine.indY * this.squareWidth,
                this.squareWidth,
                this.squareWidth
                )
        }
        //draw flags
        for(let i = 0; i<this.flaggedSquares.length; i++){
            let square = this.flaggedSquares[i];
            this.drawFlag(square.indX, square.indY);
        }
    }
    this.mouseOnMine = (square) => {
        let bombInd = -1;
        for(let i = 0; i<81; i++){
            if(square == this.board[i]){
                bombInd = i;
            }
        }
        bombIndX = bombInd%9;
        bombIndY = Math.trunc(bombInd/9);
        if(mouseX == constrain(mouseX, 
            this.margin + bombIndX *this.squareWidth,
            this.margin + (bombIndX + 1)*this.squareWidth)
            && mouseY == constrain(mouseY, 
            this.margin + bombIndY*this.squareWidth,
            this.margin + (1+bombIndY)*this.squareWidth)){
                return true;
            }
    }
    this.drawFlag = (x, y)=>{
        fill(0);
        rect(this.margin + x * this.squareWidth + this.squareWidth/2 - 4,
            this.margin + y * this.squareWidth + this.squareWidth/3,
            8,
            this.squareWidth*2/3)
        fill(255,0,0);
        triangle(this.margin + x * this.squareWidth + this.squareWidth/4,
             this.margin + y * this.squareWidth + this.squareWidth/2,
             this.margin + x * this.squareWidth + this.squareWidth/2,
             this.margin + y * this.squareWidth + this.squareWidth/4,
             this.margin + x * this.squareWidth + this.squareWidth/2,
             this.margin + y * this.squareWidth + this.squareWidth/2)
        
    }
    this.populateBoard = ()=>{
        this.board = boardy.getBoardArray();
    }
    this.clearedSquaresUpdate = () =>{
        for(i = 0; i<81; i++){
            if(this.board[i].sweeped){
                this.clearedSquares.push(this.board[i]);
            }
        }
    }
    this.flaggedSquaresUpdate = () => {
        for(i = 0; i<81; i++){
            if(this.board[i].flagged){
                this.flaggedSquares.push(this.board[i]);
            }
        }
    }
}

function mouseClicked() {
    if(mouseButton == LEFT){
        boardy.checkSquare();
        graph.populateBoard();
        graph.clearedSquaresUpdate();
    }else{
        console.log("RIGHT CLCIKED!")
        graph.populateBoard();
        graph.flaggedSquaresUpdate();
        
    }
    
}

