let x = 1;
document.addEventListener('contextmenu', event => event.preventDefault());


function help(){
    
  
    if(x% 2 === 1){
        document.getElementById("doThis").innerHTML = 'The creators of this minesweeper game are Diego Gonzalez and Edelio Taboada. They both attend Doral Academy Charter High and plan on studying computer science in the near future.';
        x++;
    }
    else{
        document.getElementById("doThis").innerHTML = '';
        x++;
    }
    
    

}