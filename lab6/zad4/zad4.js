function moveCircle(event) {
    event.stopPropagation();
    
    event.stopPropagation();
    var div = document.getElementById('error-text');
    var txt = "";
    div.innerText = txt;
    
    var circle = document.getElementById('circle');
    var gameArea = document.getElementById('game-area');

    
    var x = event.clientX - gameArea.offsetLeft - circle.offsetWidth / 2;
    var y = event.clientY - gameArea.offsetTop - circle.offsetHeight / 2;

    // circle.style.transform = `translate(${x}px, ${y}px)`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    

}

function wrongPlace(event) {
    event.stopPropagation();
    var div = document.getElementById('error-text');
    var txt = "Naciśnij tutaj!";
    div.innerText = txt;
}