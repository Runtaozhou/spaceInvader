let welcome = document.querySelector("#welcome")//access h2 welcome tag
let curLevel = document.querySelector("#curLevel")// get the h2 current level tag  
let score = document.querySelector("#score")// get the span score tag
let health = document.querySelector("#health")// get the div health tag(player)
//remove the space bar in the health component so that it is completely empty 
health.removeChild(health.firstChild)
health.style.display="none" // hide the health bar in the beginning. 
let gameboard = document.querySelector(".gameboard")// access the div gameboard component
gameboard.style.visibility="hidden"// hide the gameboard at the beginning phase.
let startbtn = document.querySelector("#start_btn")// access the button start component => start the game
let nextbtn = document.querySelector("#next_level")// access the button next component => go to the next level
nextbtn.addEventListener("click",nextLevel)// add eventlistener click onto the next button
nextbtn.style.display = "none"// we don't want to display the next button at the beginning of the game 
startbtn.addEventListener("click",renderGame)// add evenlistener click onto the start button as well
const baseText  = "Score: "// this is the base text for the score span 
const baseCur  ="Level "// this is the base text for the current level h2 tag
let randIndex
makeBoard()// call make board function to generate the gameboard 
let squares = gameboard.querySelectorAll("div")
const width = 20// the width of out board is 20 we will use it to go up and down the board
let healthPoints 
let CSI // =>(current shooter index)
let CII // =>(current invader index)
let takenDown//=> invader index that we have taken down
let result 
let direction // direction we move our invaders 
let interval
let currentLevel
let gameStatus =false
let aliensLevel = ["alien","alien2","alien3"]
let curAlien
let attackInterval
let currentShooter 
let alienShotList=["shot","shot1","shot2","shot3","shot5","shot6","shot7","shot8","shot9"]
let shooterList = ["shooter","shooter1","shooter2","shooter3"]
// create a bunch of sounds to play for special situations
let backgroundSound = document.createElement("audio")
backgroundSound.src = "background.mp3"
backgroundSound.setAttribute("loop","true")
let shootingSound = document.createElement("audio")
shootingSound .src = "shoot.mp3"
let exploSound = document.createElement("audio")
exploSound.src = "explosion.mp3"
let hurtSound = document.createElement("audio")
hurtSound.src = "hurt.mp3"
let shootingMode = false
// make board function generates the game board divs
function makeBoard(){
    for(let i=0;i<400;i++){
        let temp = document.createElement("div")
        temp.setAttribute("id",i)
        gameboard.appendChild(temp)
    }
}
// renderGame function will initiallize all the setups for the 1st level 
function renderGame(){
    currentLevel = 1
    healthPoints =3
    clearHeart()
    createHeart()
    squares.forEach(element =>element.classList.remove("alien","boom",shooterList[currentShooter]))
    currentShooter = 0
    health.style.display = "flex"
    CSI = 390
    CII = 0
    result = 0
    curLevel.textContent = baseCur+currentLevel
    score.textContent = baseText+result
    takenDown = []
    // we first have to remove the gameboard background image,
    // then we remove welcome tag
    // then display the gameboard
    // finally hide the startbtn 
    gameboard.style.backgroundImage = "none"
    welcome.style.display = "none"
    gameboard.style.visibility="initial"
    startbtn.style.display ="none"
    direction =1 
    backgroundSound.play()
    invaders = invaderGeneration()
    // draw aliens
    gameStatus = true
    invaders.forEach(inv => squares[CII+inv].classList.add("alien"))
    //draw shooter 
    squares[CSI].classList.add(shooterList[currentShooter])
    document.addEventListener("keydown",MoveShooter)
    interval = setInterval(moveAlien, 400); 
    

}
// render Game 2 functin will iniitalize the setups for the 2nd level
function renderGame2(){
    currentLevel = 2
    healthPoints =3
    clearHeart()
    createHeart()
    squares.forEach(element =>element.classList.remove("alien","boom",shooterList[currentShooter]))
    currentShooter =0
    CSI = 390
    CII = 0
    result = 0
    curLevel.textContent = baseCur+currentLevel
    score.textContent = baseText+result
    takenDown = []
    // we need to hide the next&start buttons and make the gamebaord visible 
    nextbtn.style.display = "none"
    gameboard.style.visibility="initial"
    startbtn.style.display ="none"
    direction =1 
    backgroundSound.play()
    invaders = invaderGeneration2()
    // draw aliens
    invaders.forEach(inv => squares[CII+inv].classList.add("alien2"))
    //draw shooter 
    squares[CSI].classList.add(shooterList[currentShooter])
    document.addEventListener("keydown",MoveShooter)
    gameStatus =true
    interval = setInterval(moveAlien, 300); 

}
function renderGame3(){
    currentLevel = 3
    healthPoints =3
    clearHeart()
    createHeart()
    squares.forEach(element =>element.classList.remove("alien","boom",shooterList[currentShooter]))
    currentShooter =0
    CSI = 390
    CII = 0
    result = 0
    curLevel.textContent = baseCur+currentLevel
    score.textContent = baseText+result
    takenDown = []
    // we need to hide the next&start buttons and make the gamebaord visible 
    nextbtn.style.display = "none"
    gameboard.style.visibility="initial"
    startbtn.style.display ="none"
    direction =1 
    backgroundSound.play()
    invaders = invaderGeneration3()
    // draw aliens
    invaders.forEach(inv => squares[CII+inv].classList.add("alien3"))
    //draw shooter 
    squares[CSI].classList.add(shooterList[currentShooter])
    document.addEventListener("keydown",MoveShooter)
    gameStatus =true
    interval = setInterval(moveAlien, 300); 
    attackInterval = setInterval(alienAttack, 300)

}
// generate the invaders for the first level 
function invaderGeneration(){
    arr = []
    for(let i=0;i<10;i++){
        arr.push(i)
    }
    for(let i=20;i<30;i++){
        arr.push(i)
    }
    for(let i=40;i<50;i++){
        arr.push(i)
    }
    for(let i=60;i<70;i++){
        arr.push(i)
    }
    return arr
}
//generate the invaders for the second level 
function invaderGeneration2(){
    arr = []
    for(let i=0;i<=10;i++){
        arr.push(i)
    }
    for(let i=20;i<=30;i+=2){
        arr.push(i)
    }
    for(let i=40;i<=50;i++){
        arr.push(i)
    }
    for(let i=60;i<=70;i+=2){
        arr.push(i)
    }
    for(let i=80;i<=90;i++){
        arr.push(i)
    }
    for(let i=100;i<=110;i+=2){
        arr.push(i)
    }
    return arr
}
function invaderGeneration3(){
    arr = []
    for(let i=0;i<=20;i+=2){
        arr.push(i)
    }
    return arr
}

// handles keyboard press event 
function MoveShooter(e){
    squares[CSI].classList.remove("shooter")
    switch(e.keyCode){
        case 37://left
            if(CSI%width!==0)CSI--
            break
        case 39://right
            if(CSI%width<width-1)CSI++
            break
        case 32://space bar 
            shoot()
            break
    }
    squares[CSI].classList.add("shooter")
    
    
}
// move aliens 
function moveAlien(){
    
    // check edge cases 
    const leftEdge = invaders[0]%width===0
    const rightEdge = invaders[invaders.length-1]%width === width-1
    randIndex = Math.floor(Math.random()*20)
    alienShoot()
    // make aliens movement based on the current location. 
   if(leftEdge&&direction===-1||rightEdge&&direction===1){
        direction ===width
   }
   else if(direction===width){
       leftEdge===true?direction=1:direction=-1
    }
    if(currentLevel===1){
        curAlien = aliensLevel[0]
    }
    else if(currentLevel===2){
        curAlien = aliensLevel[1]
    }
    else if(currentLevel===3){
        curAlien = aliensLevel[2]
    }

        // seperate the aliens by each level 
        // first clear all the tags for the current aliens 
        for(let i =0;i<invaders.length;i++){
            squares[invaders[i]].classList.remove(curAlien)
         }
         // move the aliens to the desired locations 
         for(let i =0;i<invaders.length;i++){
             invaders[i]+=direction
         } 
         // reassign aliens with new tags 
         for(let i =0;i<invaders.length;i++){
             if(!takenDown.includes(i)){
                 squares[invaders[i]].classList.add(curAlien)
             }  
         }
         // check wether the game have end or not 
         if(squares[squares.length-width].classList.contains(curAlien)||healthPoints===0){
            health.style.display="none"
            score.textContent = "You are Dead!"
             squares[CSI].classList.add("boom")
             exploSound.play()
             clearInterval(interval)
             gameStatus = false
             // make the startbtn appear again so that player can choose to go back 
             startbtn.style.display ="initial"
             document.removeEventListener("keydown",MoveShooter) 
             backgroundSound.pause()
             backgroundSound.currentTime=0
         }
         // case where user clear the current level
         else if(result===invaders.length){
             score.textContent = "you have cleared level "+currentLevel+" !"
             exploSound.play()
             clearInterval(interval)
             gameStatus = false
             gameboard.style.backgroundImage = "url(\"temp_pic.png\")"
             if(currentLevel===3){
                startbtn.style.display ="initial"
                clearInterval(attackInterval)
             }
             else{
                startbtn.style.display ="initial"
                nextbtn.style.display = "initial"
             }
             document.removeEventListener("keydown",MoveShooter) 
             backgroundSound.pause()
             backgroundSound.currentTime=0
         }
}
// functino to generate the alien shots to make the game harder
function alienShoot(){
    let curAlienShot = Math.floor(Math.random()*10)
    let shootId = setInterval(moveLaser,100)
    let alienLaserIndex =randIndex
    function moveLaser(){
        squares[alienLaserIndex].classList.remove(alienShotList[curAlienShot])
        alienLaserIndex+=width
        if(alienLaserIndex>399){
            clearInterval(shootId)
        }
        else if(gameStatus === false){
            clearInterval(shootId)
        }
        else{
            squares[alienLaserIndex].classList.add(alienShotList[curAlienShot])
            if(squares[alienLaserIndex].classList.contains("shooter")){
                console.log("got hit")
                squares[alienLaserIndex].classList.remove(alienShotList[curAlienShot])
                decrementHeart()
                healthPoints--
                if(healthPoints!=0){
                    hurtSound.play()
                }
                console.log("health points"+healthPoints)
                clearInterval(shootId)
            }
        }   
    }
}
function shoot(){
    if(shootingMode ===false){
        shootingMode=true
        shootingSound.play()
        let laserId = setInterval(moveLaser,20)
        let currentLaserIndex = CSI
        function moveLaser(){
            squares[currentLaserIndex].classList.remove("laser")
            currentLaserIndex-=width
            if(currentLaserIndex<0){
                clearInterval(laserId)
                shootingMode=false
            }
            else{
                squares[currentLaserIndex].classList.add("laser")
                if(squares[currentLaserIndex].classList.contains("alien")||
                squares[currentLaserIndex].classList.contains("alien2")||
                squares[currentLaserIndex].classList.contains("alien3")){
                    console.log("hit")
                    if(currentLevel===1){
                        squares[currentLaserIndex].classList.remove("alien")
                    }
                    else if(currentLevel===2){
                        squares[currentLaserIndex].classList.remove("alien2")
                    }
                    else if(currentLevel===3){
                        
                       squares[currentLaserIndex].classList.remove("alien3")
                    }
                    
                    squares[currentLaserIndex].classList.remove("laser")
                    squares[currentLaserIndex].classList.add("boom")
                    exploSound.play()
                    setTimeout(()=>{
                        squares[currentLaserIndex].classList.remove("boom")
                        currentLaserIndex=CSI
                            },100)
                    takenDown.push(invaders.indexOf(currentLaserIndex))
                    result++
                    clearInterval(laserId)
                    score.textContent = baseText+result
                    shootingMode=false
                }
            }   
        }
    }
    
}
function nextLevel(){
    if(currentLevel===1){
        gameboard.style.backgroundImage = "none"
        clearInterval(interval)
        renderGame2()
    }
    else if(currentLevel===2){
        gameboard.style.backgroundImage = "none"
        clearInterval(interval)
        renderGame3()
    }
    else if(currentLevel===3){
        gameboard.style.backgroundImage = "none"

        clearInterval(interval)

    }
}
function createHeart(){
    for(let i =0;i<3;i++){
        let temp = document.createElement("img")
        temp.setAttribute("src","heart.png")
        health.appendChild(temp)
    }
    console.log(health.childNodes)
}
function decrementHeart(){
    health.removeChild(health.firstChild)
    console.log(health.childNodes.length)
}
function clearHeart(){
    while(health.firstChild){
        health.removeChild(health.firstChild)
    }
}
function alienAttack(){
    let alive = []
    for (let i=0;i<invaders.length;i++){
        if(!takenDown.includes(i)){
            alive.push(i)
        }
    }
    let curAlien = Math.floor(Math.random()*alive.length)
    let alienLaserIndex =invaders[alive[curAlien]]
    let attackId = setInterval(moveLaser,100)
    function moveLaser(){
        squares[alienLaserIndex].classList.remove("shot4")
        alienLaserIndex+=width
        if(alienLaserIndex>399){
            clearInterval(attackId)
        }
        else if(gameStatus === false){
            clearInterval(attackId)
        }
        else{
            squares[alienLaserIndex].classList.add("shot4")
            if(squares[alienLaserIndex].classList.contains("shooter")){
                console.log("got hit")
                squares[alienLaserIndex].classList.remove("shot4")
                decrementHeart()
                healthPoints--
                if(healthPoints!=0){
                    hurtSound.play()
                }
                console.log("health points"+healthPoints)
                clearInterval(attackId)
            }
        }   
    }
    
}
