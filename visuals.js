let graph;
function setup(){
    createCanvas(600, 600);
    graph = new Graph()
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
        
        stroke(128, 128, 128);
        strokeCap(ROUND);
        strokeWeight(4);
        //vertical lines
        for(let i = 0; i<=9; i++){
            line(this.margin + this.squareWidth * i, this.margin, this.margin + this.squareWidth * i, 600-this.margin);
            stroke(220, 220, 220);
            line(this.margin + this.squareWidth*(i) + 4, this.margin, this.margin + this.squarewWidth*(i) + 4, 600-this.margin);
        }
        stroke(128, 128, 128);
        strokeCap(ROUND);
        strokeWeight(4);
        //horizontal lines
        for(let i = 0; i<=9; i++){
            line(this.margin, this.margin + this.squareWidth * i, 600-this.margin, this.margin + this.squareWidth * i);
        }
    }
}