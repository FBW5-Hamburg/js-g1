/* ********************************************************************** FUNCTIONS ********************************************************************** */
// create hill
function createHill_1(canvas, ground, hillWidth, counter) {
    setTimeout(() => {       
            setInterval(() => {
            canvas.clearRect(counter, 120, hillWidth + 6, 40)
            canvas.beginPath()
            canvas.moveTo(counter, ground + 1)
            canvas.bezierCurveTo(counter, ground + 1, counter + 10, ground + 6, counter + 30, ground - 4)
            canvas.bezierCurveTo(counter + 50, ground - 25, counter + 60, ground - 25, counter + 80, ground - 6)
            canvas.bezierCurveTo(counter + 90, ground, counter + 90, ground - 2, counter + hillWidth, ground + 1)
            canvas.closePath()
            canvas.fillStyle = 'green'
            canvas.fill()
            canvas.stroke()
            counter -=  5
        }, 120)
    }, Math.round(Math.random()) * 1000)
}
// create floor
function setFloor(canvas, floorY) {
    canvas.beginPath()
    canvas.fillStyle = 'green'
    canvas.fillRect(0, floorY, game.width, 40)
    // lawn
    canvas.beginPath()
    canvas.fillStyle = '#70AC00'
    canvas.fillRect(0, floorY + 2, game.width, 3)
    canvas.beginPath()
    canvas.strokeStyle = '#70AC00'
    canvas.setLineDash([3,3])
    canvas.moveTo(0, floorY+5)
    canvas.lineTo(game.width, floorY+5)
    canvas.moveTo(0, floorY+6)
    canvas.lineTo(game.width, floorY+6)
    canvas.stroke()
    canvas.setLineDash([3,11])
    canvas.moveTo(0, floorY+7)
    canvas.lineTo(game.width, floorY+7)
    // black stroke
    canvas.beginPath()
    canvas.fillStyle = 'black'
    canvas.fillRect(0, floorY, game.width, 1)
}
// create hearts
function setHeart(canvas, heartX, heartY, heartWidth, heartHeight) {
    let heart = document.createElement('img')
    heart.src = './img/heart.png'
    heart.onload = function() {
        canvas.clearRect(heartX, heartY, heartWidth, heartHeight)
        // set hearts
        for(let i = gameNum; i > 0; i--) {
            canvas.clearRect(heartX, heartY, heartWidth, heartHeight)
            canvas.drawImage(heart, heartX, heartY, heartWidth, heartHeight)
            heartX += 20
        }
    }    
}
// control input
function controlInput(input, playerArr, canvas1, canvas2, canvas3, canvas4, canvas5, sound) {
    let regex = new RegExp(/[a-z A-Z_]*/)
    input.onchange = () => {
        // clear error message
        canvas5.clearRect(245, 140, 80, 20)
        if(regex.test(input.value) === true) {
            // restart game
            window.onkeypress = function(e) {
                if(e.key === 'Enter') {
                    // highscore list
                    let name = input.value
                    if(!name) {
                        name = '---'
                    }
                    // player
                    let player = {
                        'id': name.toUpperCase(),
                        'score': parseInt(localStorage.getItem('score'))
                    }
                    // top ten
                    if(playerArr.length > 10) {
                        playerArr.pop()
                    }
                    playerArr.push(player)
                    localStorage.setItem('highscore', JSON.stringify(playerArr.sort((a, b) => {return b.score - a.score})))
                    localStorage.removeItem('score')
                    canvas5.clearRect(245, 140, 80, 20)
                    document.body.removeChild(input)
                    restartGame(canvas1, canvas2, canvas3, canvas4, canvas5, sound)
                }
            }
        } else {
            canvas5.fillStyle = 'red'
            canvas5.font = '18px Arial'
            canvas5.fillText('Only letters!', 245, 140)
        }
    }
}
// print highscore list
let highscore = {
    stop: false,
    top10: "",
    printHighscore: function (canvas, playerArr, x, y) {
        canvas.fillStyle = 'black'
        canvas.font = '18px Arial'
        canvas.fillText('Highscore', 240, 120)
        canvas.font = '12px Arial'
        canvas.fillText('No.', 212, 140)
        canvas.fillText('Score', 272, 140)
        canvas.fillText('ID', 332, 140)
        canvas.font = '16px Arial'
        let page = true
        if(playerArr.length <= 5) {
            for (let i = 0; i < playerArr.length; i++) {
                canvas.fillText(i + 1, x, y)
                x += 60
                canvas.fillText(playerArr[i].score, x, y)
                x += 60
                canvas.fillText(playerArr[i].id, x, y)
                x = 210
                y += 20
            }
        } else {
            // split in pages
            for (let i = 0; i < 5; i++) {
                canvas.fillText(i + 1, x, y)
                x += 60
                canvas.fillText(playerArr[i].score, x, y)
                x += 60
                canvas.fillText(playerArr[i].id, x, y)
                x = 210
                y += 20
            }
            let top10 = setInterval(() => {
                if(page === true) {
                    canvas.clearRect(200, 140, 180, 260)
                    y = 160
                    for (let i = 5; i < playerArr.length; i++) {
                        canvas.fillText(i + 1, x, y)
                        x += 60
                        canvas.fillText(playerArr[i].score, x, y)
                        x += 60
                        canvas.fillText(playerArr[i].id, x, y)
                        x = 210
                        y += 20
                    }
                    page = false
                } else {
                    canvas.clearRect(200, 140, 180, 260)
                    y = 160
                    for (let i = 0; i < 5; i++) {
                        canvas.fillText(i + 1, x, y)
                        x += 60
                        canvas.fillText(playerArr[i].score, x, y)
                        x += 60
                        canvas.fillText(playerArr[i].id, x, y)
                        x = 210
                        y += 20
                    }
                    page = true
                }
                console.log(top10);
                
                // stop highscore
                if(this.stop === true) {
                    console.log(this.stop);
                    console.log(this.top10);
                    
                    clearInterval(this.top10)
                    canvas.clearRect(160, 120, 300, 300)
                }
                console.log('Hi');
                
            }, 5000)
        }
    }

}
// create sound
function sound(src) {
    let sound = document.createElement('audio')
    sound.src = src
    sound.setAttribute("preload", "auto")
    sound.setAttribute("controls", "none")
    sound.setAttribute("autoplay", "autoplay")
    let soundID = src.substring(src.lastIndexOf('/') + 1)
    sound.setAttribute("id", soundID)
    sound.style.display = "none"
    document.body.appendChild(sound)    
}
// press enter
function pressEnter(canvas) {
    canvas.fillStyle = 'red'
    canvas.font = '18px Arial'
    canvas.clearRect(250, 110, 80, 40)
    canvas.fillText("Press 'Enter'", 245, 110)
}
// restart game
function restartGame(canvas1, canvas2, canvas3, canvas4, canvas5, sound) {
    gameNum = 3
    highscore.stop = false
    canvas1.clearRect(0, 0, background_1.width, background_1.height)
    canvas2.clearRect(0, 0, background_2.width, background_2.height)
    canvas3.clearRect(0, 0, rock.width, rock.height)
    canvas4.clearRect(0, 0, game.width, game.height)
    canvas5.clearRect(0,0, UI.width, UI.height)
    sound.remove()
    startGame()
}              
/* ********************************************************************** GAME ********************************************************************** */

let gameNum = 3
let playerArr = []
// start game
function startGame() { 
/* ************************************************************** CANVAS & COORDINATES ************************************************************** */    
    // backround_1
    let background_1 = document.querySelector('#background_1')
    let ctxBG_1 =  background_1.getContext('2d')
    // backround_2
    let background_2 = document.querySelector('#background_2')
    let ctxBG_2 =  background_2.getContext('2d')
    // stone
    let rock = document.querySelector('#rock')
    let ctxR =  rock.getContext('2d')
    // game
    let game = document.querySelector('#game')
    let ctxG = game.getContext('2d')
    // UI
    let UI = document.querySelector('#UI')
    let ctxUI =  UI.getContext('2d')
    // coordinates
    let charWidth = 48
    let charHeight = 60
    let imgLength = 480
    let charLength = 48
    let floorY = game.height - 40
    let leftX = 10

    let hillWidth_1 = 110
    let hillCount_1 = background_1.width
    let hillHeight_1 = 40
    let hillWidth_2 = 210
    let hillCount_2 = background_2.width
    let hillHeight_2 = 60
    
    let stoneWidth = 30
    let stoneHeight = 20
    let jumpCount = game.width
    let jumpSpeed = 4

    let highScoreX = 212
    let highScoreY = 160
/* ********************************************************************** START ********************************************************************* */
    // hill 1
    let hillStart_1 = 400
    ctxBG_1.beginPath()
    ctxBG_1.moveTo(hillCount_1 - hillStart_1, floorY + 1)
    ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1, floorY + 1, hillCount_1 - hillStart_1 + 10, floorY + 6, hillCount_1 - hillStart_1 + 30, floorY-4)
    ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1 + 50, floorY - 25, hillCount_1 - hillStart_1 + 60, floorY - 25, hillCount_1 - hillStart_1 + 80, floorY-6)
    ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1 + 90, floorY, hillCount_1 - hillStart_1 + 90, floorY - 2, hillCount_1 - hillStart_1 + hillWidth_1, floorY+1)
    ctxBG_1.closePath()
    ctxBG_1.fillStyle = 'green'
    ctxBG_1.fill()
    ctxBG_1.stroke()
    // hill 2
    let hillStart_2 = 260
    ctxBG_2.beginPath()
    ctxBG_2.moveTo(hillCount_2 - hillStart_2, floorY+1)
    ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2, floorY, hillCount_2 -hillStart_2 + 15, floorY - 2, hillCount_2 - hillStart_2 + 30, floorY-10)
    ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2 + 90, floorY - 60, hillCount_2 - hillStart_2 + 110, floorY - 60, hillCount_2 - hillStart_2 + 180, floorY-10)
    ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2 + 200, floorY, hillCount_2 - hillStart_2 + 200, floorY - 2, hillCount_2 - hillStart_2 + hillWidth_2, floorY+1)
    ctxBG_2.closePath()
    ctxBG_2.fillStyle = 'green'
    ctxBG_2.fill()
    ctxBG_2.stroke()
    // floor
    setFloor(ctxG, floorY)
    // runner
    let img = document.createElement('img')
    img.src = './img/player_big.png'
    img.onload = function() {
        ctxG.drawImage(img, imgLength - 96, 0, charWidth, charHeight, 10, floorY - charHeight, charWidth, charHeight)
    }
    // write start
    ctxUI.fillStyle = 'red'
    ctxUI.font = '24px Arial'
    ctxUI.fillText("Press 'Enter' to start!", 180, 60)
    ctxUI.font = '18px Arial'
    ctxUI.fillText("Press 'Space' to jump!", 198, 90)
    // game sound
    gameSound = document.getElementById('random silly chip song.ogg')
    if(gameSound) {
        gameSound.remove()
        sound('./sound/random silly chip song.ogg')
        gameSound = document.getElementById('random silly chip song.ogg')
        gameSound.setAttribute('loop', 'loop')
    } else {
        sound('./sound/random silly chip song.ogg')
        gameSound = document.getElementById('random silly chip song.ogg')
        gameSound.setAttribute('loop', 'loop')
    }
    // print highscore list
    if(localStorage.getItem('highscore') && gameNum === 3) {                                     
        playerArr = JSON.parse(localStorage.getItem('highscore'))
        highscore.printHighscore(ctxUI, playerArr, highScoreX,highScoreY)
    }
/* ****************************************************************** ACTION START ****************************************************************** */           
    // press 'Enter' to start
    window.onkeypress = function(e) {
        if(e.key === 'Enter') {
            // clear highscore
            highscore.stop = true
            // clear user interface
            ctxUI.clearRect(160, 20, 240, 300)
            // clear backround
            ctxBG_1.clearRect(0, 0, game.width, game.height)
            ctxBG_2.clearRect(0, 0, game.width, game.height)
            // clear game
            ctxG.clearRect(0, 0, game.width, game.height)
/* ********************************************************************* FLOOR ********************************************************************** */
            setFloor(ctxR, floorY)
/* ****************************************************************** BACKGROUND 1 ****************************************************************** */
            let hillInterval_1 = setInterval(() => {
                ctxBG_1.clearRect(hillCount_1 - hillStart_1,  floorY - hillHeight_1, hillWidth_1 + 20, hillHeight_1)
                ctxBG_1.beginPath()
                ctxBG_1.moveTo(hillCount_1 - hillStart_1, floorY + 1)
                ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1, floorY + 1, hillCount_1 - hillStart_1 + 10, floorY + 6, hillCount_1 - hillStart_1 + 30, floorY-4)
                ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1 + 50, floorY - 25, hillCount_1 - hillStart_1 + 60, floorY - 25, hillCount_1 - hillStart_1 + 80, floorY-6)
                ctxBG_1.bezierCurveTo(hillCount_1 - hillStart_1 + 90, floorY, hillCount_1 - hillStart_1 + 90, floorY - 2, hillCount_1 - hillStart_1 + hillWidth_1, floorY+1)
                ctxBG_1.closePath()
                ctxBG_1.fillStyle = 'green'
                ctxBG_1.fill()
                ctxBG_1.stroke()
                hillCount_1 -=  3
                // loop
                if(hillCount_1 - hillStart_1 <= -hillWidth_1) {
                    hillStart_1 = 0
                    hillCount_1  = background_1.width
                }
            }, 80)
/* ****************************************************************** BACKGROUND 2 ****************************************************************** */
            let hillInterval_2 = setInterval(() => {
                ctxBG_2.clearRect(hillCount_2 - hillStart_2, floorY - hillHeight_2, hillWidth_2 + 20, hillHeight_2)
                ctxBG_2.clearRect(0, 0, background_2.width, background_2.heigth)
                ctxBG_2.beginPath()
                ctxBG_2.moveTo(hillCount_2 - hillStart_2, floorY + 1)
                ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2, floorY, hillCount_2 - hillStart_2 + 15, floorY - 2, hillCount_2 - hillStart_2 + 30, floorY-10)
                ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2 + 90, floorY - 60, hillCount_2 - hillStart_2 + 110, floorY - 60, hillCount_2 - hillStart_2 + 180, floorY-10)
                ctxBG_2.bezierCurveTo(hillCount_2 - hillStart_2 + 200, floorY, hillCount_2 - hillStart_2 + 200, floorY - 2, hillCount_2 - hillStart_2 + hillWidth_2, floorY+1)
                ctxBG_2.closePath()
                ctxBG_2.fillStyle = 'green'
                ctxBG_2.fill()
                ctxBG_2.stroke()
                hillCount_2 -=  5
                // loop
                if(hillCount_2 - hillStart_2 <= -hillWidth_2) {
                    hillStart_2 = 0
                    hillCount_2 = background_2.width
                }
            }, 80)
/* ********************************************************************** STONE ********************************************************************** */
            let flag = false
            ctxR.beginPath()
            let stoneInterval = setInterval(() => {
                ctxR.clearRect(jumpCount, floorY - stoneHeight, stoneWidth, stoneHeight)
                let stone = document.createElement('img')
                stone.src = './img/stone.png'
                ctxR.drawImage(stone, jumpCount - stoneWidth + 10, floorY - stoneHeight, stoneWidth, stoneHeight)
                // count jumps
                if(jumpCount + 10 >= 0) {
                    jumpCount -= jumpSpeed
                    // increase speed
                    if(localStorage.getItem('score') !== 0 && localStorage.getItem('score') % 10 === 0 && flag === false) {
                        jumpSpeed++
                        flag = true
                    }
                    if(localStorage.getItem('score') !== 0 && localStorage.getItem('score') % 10 !== 0 && flag === true) {
                        flag = false
                    }
                } else {
                    jumpCount = game.width
                }
            }, 30)
/* ********************************************************************* HEART ********************************************************************** */                     
            let heartX = 100
            let heartY = 10
            let heartWidth = 20
            let heartHeight = 20
            setHeart(ctxUI, heartX, heartY, heartWidth, heartHeight)
/* ********************************************************************* RUNNER ********************************************************************* */
            img.src = './img/player_big.png'
            img.onload = function() {
                let runCount = 0
                let score = 0
                let runnerInterval = setInterval(() => {
                    ctxG.clearRect(0, floorY - charHeight - 20, charWidth + leftX, charHeight + 20)
                    if(running === true) {
                        // running
                        ctxG.drawImage(img, runCount, 0, charWidth, charHeight, leftX, floorY - charHeight, charWidth, charHeight) 
                    } else {
                        // jumping
                        ctxG.drawImage(img, charLength - charWidth, 0, charWidth, charHeight, leftX, floorY - charHeight - 20, charWidth, charHeight)
                    }
                    // running loop
                    if(runCount === imgLength  - charWidth * 2) {
                        runCount = 0
                    } else {
                        runCount += 48
                    }
                    // stop
                    let crash = false
                    if(jumpCount <= charWidth + leftX && jumpCount >= leftX  && running === true) {
                        crash = true
                        // stop animation
                        clearInterval(stoneInterval)
                        clearInterval(hillInterval_1)
                        clearInterval(hillInterval_2)
                        clearInterval(runnerInterval)
                        // write 'Crash'
                        ctxUI.fillStyle = 'red'
                        ctxUI.font = '40px Arial'
                        ctxUI.fillText('Crash!', 240, 80)
                    }
                    // score jumps
                    if(localStorage.getItem('score')) {
                        score = localStorage.getItem('score')
                    }
                    ctxUI.clearRect(10, 12, 90, 12)
                    ctxUI.font = '12px Arial'
                    ctxUI.fillStyle = 'black'
                    ctxUI.fillText('Score: ' + score, 20, 23)
                    // write jumps
                    if(jumpCount <= charWidth && jumpCount >= leftX  && running === false) {
                        ctxUI.clearRect(10, 12, 90, 12)
                        score++
                        localStorage.setItem('score', score)
                        ctxUI.font = '12px Arial'
                        ctxUI.fillStyle = 'black'
                        ctxUI.fillText('Score: ' + localStorage.getItem('score'), 20, 23)
                    }
                    // crash
                    if(crash === true) {
                        gameSound.remove()
                        sound('./sound/death.wav')                        
                        setTimeout(() => {
                            let sound = document.getElementById('death.wav')
                            sound.remove()
                        }, 800)
                        let crashCount = 6
                        let crashRun = setInterval(function() {
                            // blink
                            if(crashCount > 0) {
                                ctxG.drawImage(img, runCount - charWidth, 0, charWidth, charHeight, leftX, floorY - charHeight, charWidth, charHeight) 
                                crashCount--
                                if(crashCount % 2 !== 0) {
                                    ctxG.clearRect(0, floorY - charHeight - 20, charWidth + leftX, charHeight + 20)
                                }
                            } else {
                                clearInterval(crashRun)
                                // game over
                                if(gameNum === 1) {
                                    ctxUI.clearRect(0, 0,UI.width, UI.height)
                                    ctxG.clearRect(250, 10, 120, 40)
                                    ctxUI.fillStyle = 'red'
                                    ctxUI.font = '40px Arial'
                                    ctxUI.fillText('Game Over', 190, 80)
                                    sound('./sound/round_end.wav')
                                    // entry
                                    if(score > 0) {
                                        let input = document.createElement('input')
                                        input.type = 'text'
                                        input.setAttribute('maxlength', 3)
                                        if(playerArr.length < 10) {
                                            pressEnter(ctxUI)
                                            // set input to page
                                            document.body.append(input)
                                            controlInput(input, playerArr, ctxBG_1, ctxBG_2, ctxR, ctxG, ctxUI, gameSound)
                                        } else {
                                            playerArr.forEach(item => {
                                                if(score > item.score) {
                                                    pressEnter(ctxUI)
                                                    // set input to page
                                                    document.body.append(input)
                                                    controlInput(input, playerArr, ctxBG_1, ctxBG_2, ctxR, ctxG, ctxUI, gameSound)
                                                    return
                                                } /////////////////////////////////////////////////// else?
                                            })
                                        }
                                    } else {
                                        setTimeout(() => {
                                            // restart Game
                                            restartGame(ctxBG_1, ctxBG_2, ctxR, ctxG, ctxUI, gameSound)
                                        }, 2000)
                                    }
                                } else {
                                    // restart
                                    ctxBG_1.clearRect(0, 0, background_1.width, background_1.height)
                                    ctxBG_2.clearRect(0, 0, background_2.width, background_2.height)
                                    ctxR.clearRect(0, 0, rock.width, rock.height)
                                    ctxG.clearRect(0, 0, game.width, game.height)
                                    ctxUI.clearRect(100, 5, 120, heartHeight)
                                    ctxUI.clearRect(180, 20, 180, 80)
                                    gameNum--
                                    setHeart(ctxUI, heartX, heartY, heartWidth, heartHeight)
                                    gameSound.remove()
                                    startGame()
                                }
                            }
                        }, 200)
                    }
                }, 120)
            }
/* ****************************************************************** ACTION JUMP ****************************************************************** */           
            // press 'Space' to jumpcreateS
            let running = true
            window.onkeypress = function(e) {
                if(e.key === ' ') {
                    running = false
                    sound('./sound/apricotjumpbounce-jump.ogg')
                    // switch back                          
                    setTimeout(() => {
                        running = true
                    }, 456);
                    // remove jump sound                         
                    setTimeout(() => {
                        let sound = document.getElementById('apricotjumpbounce-jump.ogg')
                        sound.remove()
                    }, 800);
                }
            }
        }
    }
}

window.onload = function() {
    startGame()
    // game sound
    sound('./sound/random silly chip song.ogg')
}