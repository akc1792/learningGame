score = 0
cross = true

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 100);
document.onkeydown = function(e){
    // console.log(e)
    if(e.keyCode==38){//uparrow keycode is 38
        dino = document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700)
        // console.log(dino)
    }
    if(e.keyCode==39){//right arrow keycode is 38
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX+120+'px'
    }
    if(e.keyCode==37){//left arrow keycode is 38
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinoX-120)+'px'
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    reload = document.querySelector('#reloadGame');
    //getComputedStyle this will fetch all style property of that element , 
    //and for getting property value of particular property , it can fetch from getPropertyValue fucntion.
    // here it will give in px left and top value , that have to change into integer that's why doing parseInt here.
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    
    //console.log("dx: ",dx ," dy: ",dy)

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    //console.log("ox: ",ox ," oy: ",oy)
    
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    reload.onclick = function(){
        location.reload()
    }

    if(offsetX < 73 && offsetY < 52){ //Game over condition
        gameOver.style.visibility = 'visible';
        reload.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni')
        audiogo.play()
        setTimeout(() => {
            audiogo.pause()
            audio.pause() 
        }, 1000);
        cross=false;
    }else if(cross && offsetX < 70){
        score += 1
        updateScore(score)
        cross=false;
        setTimeout(() => {
            cross = true
        }, 1000);
        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDuration = aniDuration - 0.1
            obstacle.style.animationDuration = newDuration + 's'
        }, 600);
    }

}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your Score is: " + score
}



