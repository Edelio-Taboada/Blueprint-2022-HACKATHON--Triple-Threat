
function Mines(index){
    this.indX = index%9;
    this.indY = Math.trunc(index/9);
    this.isBomb = false;
}
