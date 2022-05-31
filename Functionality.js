let colors = [];
let square = document.querySelectorAll(".square");
let pickedColor;
let messageDisplay = document.querySelector("#message");
let numberOfSquares = 6; // hard by default selection
let resetBtn = document.querySelector("#resetBtn");
let colorDisplay = document.querySelector("#colorDisplay");
let h1 = document.querySelector("h1");
let modeBtn = document.querySelectorAll(".mode");


gameInitializer();

function gameInitializer() {
    setMode();
    listenSquares();
    reset();
}


function setMode() {
    for (let index = 0; index < modeBtn.length; index++) {
        modeBtn[index].addEventListener("click", function(){
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numberOfSquares = 3;
            } else {
                numberOfSquares = 6;
            }
            reset();
        })
    }
}


function listenSquares() {
    for (let index = 0; index < square.length; index++) {
        square[index].addEventListener("click", function () {
            let clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play again";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try again";
            }
        })
    }
}


// This function is to put all squares in the same winning color
function changeColors(color) {
    for (let index = 0; index < square.length; index++) { 
        square[index].style.background = color;
    }
}


// This is a function to randomly assign a color in RGB format to pickedColor variable.
function pickColor() {
    let position = Math.floor(Math.random()*(colors.length));
    return colors[position];
}


// This is a function to generate a random color in RGB format
function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);

    return `rgb(${red}, ${green}, ${blue})`;
}


// This is a function that will populate the colors array with the 6 or the 3 colors, respectively 
function generateRandomColors(numberOfColors) {
    let randomColors = [];
    for (let index = 0; index < numberOfColors; index++) {        
        randomColors.push(randomColor());
    }
    return randomColors;
}



function reset() {
    colors = generateRandomColors(numberOfSquares);    
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let index = 0; index < square.length; index++) { 
        if (colors[index]) {
            square[index].style.background = colors[index];
            square[index].style.display = "block";            
        } else {
            square[index].style.display = "none";
        }
    }
    h1.style.background = "deepskyblue";
    messageDisplay.textContent = "";
    resetBtn.textContent = "New colors";

}

// This is to add the event listener to the "reset" button.
resetBtn.addEventListener("click", function () {
    reset();
})