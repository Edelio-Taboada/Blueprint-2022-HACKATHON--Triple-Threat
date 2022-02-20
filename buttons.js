let x = 1;
document.addEventListener('contextmenu', event => event.preventDefault());


function help(){
    let image = document.getElementById('social');
  
    if(x% 2 === 1){
        document.getElementById("doThis").innerHTML = 'The creators of this minesweeper game are Diego Gonzalez and Edelio Taboada. They both attend Doral Academy Charter High and plan on studying computer science in the near future. They have both participated in competitive programming but only Edelio has dived into Web Development. This is a way to show off our new skills that we learned and display our love for Minesweeper. Here is a picture of the Two!';
        x++;
     
        image.src = "Assets/pic1.jpeg"
      
        
    }
    else{
        document.getElementById("doThis").innerHTML = '';
        x++;

       
        image.src = "Assets/large.jpg"
        
         
        
    }
    
    

}
function helpme(){
    
    alert("Try to click or Flag around  "  + boardy.nextMove() + ". This is not a perfect solver, but it does help!")
    

}