
let graph;
function setup(){
    createCanvas(600, 600);
    graph = new Graph();
    graph.populateBoard();
}
function draw() {
    background(192,192,192);
    graph.draw();

}

function Graph() {
    this.board = [];
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

    this.populateBoard = ()=>{
        for(let i = 0; i<81; i++){
            this.board[i] = new Mines(i);
        }
    }
}
