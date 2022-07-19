
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

let result;
let names =[];
let winsCount = [];
let lossesCount = [];
if(!( window.localStorage.result==undefined)) {
    // console.log(window.localStorage.result)
names.push(window.localStorage.names);
    console.log(names);
}

let timerElement = document.querySelector(".timer");
let gameControl = document.querySelector(".control-buttons");
let theName;
let seconds = 60;
let gameCounter = 0;
document.querySelector(".control-buttons span").onclick = function () {

    let countDown;

    if (theName == undefined) {
        theName = prompt("What is your name?");
       
    }
    if (theName == "" || theName == null) {
        document.querySelector(".info-container .name span").textContent = "Unknown";
    }
    else {
        document.querySelector(".name span").textContent = theName;
        //   result.push(theName,0,0);
    names.push(theName);
    window.localStorage.names=names;

        
        
    }
    gameControl.style.visibility = "hidden";
    let music = document.querySelector(".music");
    // music.play();
    music.loop = true;
    seconds = 60;
    time();
}


// Order function
function order() {

    shuffle(orderRange);

    // Add order property to game blocks
    blocks.forEach(function (block, index) {
        block.style.order = orderRange[index];


    });

}


blocks.forEach(function (block) {

    block.addEventListener("click", function () {
        flipBlock(block);
    });
});

// flipped block function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (flippedBlocks.length == 2) {
        stopClickig();

        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
}


// Shuffle function

function shuffle(array) {
    let current = array.length,
        temp,
        randam;

    while (current > 0) {
        randam = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[randam];

        current[randam] = temp;

    }

    return array;
}


function stopClickig() {
    blocksContainer.classList.add('no-clicking');


    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}



function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.getAttribute("pname") === secondBlock.getAttribute("pname")) {
        // console.log(secondBlock.pname);
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-matched");
        secondBlock.classList.add("has-matched");
        document.querySelector(".success").play();

        //check if all blocks matched

    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.querySelector(".fail").play();


    }
}


function replay(result) {
    clearInterval(countDown);

    gameControl.style.visibility = "visible";
    document.querySelector(".control-buttons .result").innerHTML = result;
    document.querySelector(".control-buttons .start").innerHTML = "Play Again";
    blocks.forEach((block) => block.classList.remove("has-matched"));
    order();

}

function time() {

    function secondsPass() {

        timerElement.innerHTML = 00 + ":" + 00 + ":" + seconds;
        if (seconds > 0) {
            seconds = seconds - 1;
            let flippendBlocksCounter =
                blocks.filter((block) => block.classList.contains("has-matched"));

            if (flippendBlocksCounter.length == blocks.length) {

                replay("YUO WIN!");
                clearInterval(countDown);
                // storeResult(theName,true);
            }
        }
        else if (seconds == 0) {

            replay("YOU LOSE THE GAME!");
            clearInterval(countDown);
            // storeResult(theName,false);


        }
    }

    countDown = setInterval(function () {
        // "use strict";
        secondsPass();
    }, 1000);

}



// window.localStorage.result=[["osama",0,0]];
function storeResult(name, result) {
 

    if (!(name === undefined || name === null)) {
        window.localStorage.result.forEach((n, index) => {
            if (n[index][0] == name) {
                if (result == true) {
                    n[index][1]++;
                }
                else if (result == false) {
                    n[index][2]++;
                }
            }
            else {
                ar = [name, 0, 0];
                if (result == true) {
                    ar[1]++;
                }
                else if (result == false) {
                    ar[2]++;
                }
                n.push(ar);
            }
        })
    }

}


