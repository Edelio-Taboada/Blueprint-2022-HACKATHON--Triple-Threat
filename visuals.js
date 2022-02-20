
let graph;
let boardy;
let mineAsset
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
    boardy.win();

}

function Graph() {
    this.board = [];
    this.clearedSquares = [];
    this.flaggedSquares = [];
    this.discoveredBombs = [];
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
        this.drawAdjBombCounts();
        //draw flags
        for(let i = 0; i<this.flaggedSquares.length; i++){
            let square = this.flaggedSquares[i];
            this.drawFlag(square.indX, square.indY);
        }
        this.drawBombs();
    }
    
    this.drawBombs = () =>{
        for(let i = 0; i<this.discoveredBombs.length; i++){
            
            let b = this.discoveredBombs[i]
            fill(255,0,0);
            stroke(92, 4, 4)
            
            rect(this.margin + b.indX * this.squareWidth, this.margin + b.indY * this.squareWidth, this.squareWidth, this.squareWidth, 5);
            image(mineAsset, this.margin + b.indX * this.squareWidth - 15, this.margin+b.indY * this.squareWidth, this.squareWidth+30, this.squareWidth);
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
        strokeWeight(0);
        fill(0);
        rect(this.margin + x * this.squareWidth + this.squareWidth/2 - 2,
            this.margin + y * this.squareWidth + this.squareWidth *1.1/3,
            6,
            this.squareWidth*1/3+ 3)
        rect(this.margin + x * this.squareWidth + this.squareWidth/4,
            this.margin + y * this.squareWidth + this.squareWidth *1.1/3 + this.squareWidth*1/3 +2,
            this.squareWidth*1/2,
            4
            )
        fill(255,0,0);
        triangle(this.margin + x * this.squareWidth + this.squareWidth/4,
             this.margin + y * this.squareWidth + this.squareWidth/2  - 7.5,
             this.margin + x * this.squareWidth + this.squareWidth/2 + 5,
             this.margin + y * this.squareWidth + this.squareWidth/4 - 5,
             this.margin + x * this.squareWidth + this.squareWidth/2 + 4,
             this.margin + y * this.squareWidth + this.squareWidth* 3/4 -5)
        
    }
    this.drawAdjBombCounts = ()=>{
        textAlign(CENTER);
        textSize(32)
        fill(26, 147, 111);
        stroke(17, 75, 95);
        for(let i = 0; i<this.clearedSquares.length; i++){
            if(this.clearedSquares[i].adjBombCount != 0){
            let square = this.clearedSquares[i];
            
            
            text(square.adjBombCount,
                 this.margin + square.indX * this.squareWidth + 0.5*this.squareWidth,
                 this.margin + square.indY * this.squareWidth + 0.5*this.squareWidth + 10)
            }
        }
    }
    this.populateBoard = ()=>{
        this.board = boardy.getBoardArray();
    }
    this.clearedSquaresUpdate = () =>{
        let b = []
        for(i = 0; i<81; i++){
            if(this.board[i].sweeped){
                b.push(this.board[i]);
            }
        }
        this.clearedSquares = b;
    }
    this.flaggedSquaresUpdate = () => {
        flaggy = []
        for(i = 0; i<81; i++){
            if(this.board[i].flagged){
                flaggy.push(this.board[i]);
            }
        }
        this.flaggedSquares = flaggy;
    }
}

function mouseClicked() {
    if(haveLost){
        location.reload();
    }else{
        if(mouseButton == LEFT){
            for(let i = 0; i<81; i++){
                if(graph.mouseOnMine(boardy.board[i])){
                    boardy.checkSquare(boardy.board[i]);
                }
            }
            graph.populateBoard();
            graph.clearedSquaresUpdate();
        }
    }


}

function mousePressed(){
    if(mouseButton == RIGHT){
        console.log("RIGHT CLCIKED!")
        boardy.flagSquare();
        graph.populateBoard();
        graph.flaggedSquaresUpdate();
        
        
    }
}

function preload(){
    mineAsset = loadImage('./assets/minesweeper-free-mine-sweeper-mono-android-game-png-favpng-71eWcNDpe4Gys8amaQKTYUaAx.png')
}



