
function Mines(index){
    this.indX = index%9;
    this.indY = Math.trunc(index/9);
    this.isBomb = false;
}
function Board(){
    this.board = []
    for(let i = 0; i<81; i++){
        this.board[i] = new Mines(i);
    }
}