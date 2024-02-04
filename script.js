const options = {
    variable: "Storage location",
    loop: "Iterative structure",
    function: "Reusable code block",
    array: "Ordered collection",
    algorithm: "Step-by-step procedure",
    class: "Blueprint for objects",
    inheritance: "Code reuse",
    database: "Persistent storage",
    debugging: "Finding errors",
    boolean: "True or false",
    exception: "Error handling",
    compiler: "Code translator",
    recursion: "Self-reference",
    git: "Version control",
    syntax: "Code structure",
    framework: "Pre-built structure",
    interface: "Interaction point"
};
//Initial Rferences
const message = document.getElementById("message");
const hintRef=document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("userinput");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord ="",
    randomHint="";
let winCount = 0,
    lossCount=0;


//Generate Random Value
const generateValue = (array) => Math.floor(Math.random()* array.length);

//Block all the buttons
const blocker = () => {
    let lettersButtons= document.querySelectorAll(".letters");

    stopGame();
};

//start Game
startBtn.addEventListener("click", ()=>{
    controls.classList.add("hide");
    init();
});

//Stop Game
const stopGame = () => {
    controls.classList.remove("hide")
}


//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    //For creating letter buttons
    for(let i = 65; i < 91 ; i++){
        let button= document.createElement('button')
        button.classList.add("letters");

        //Number to ASCII(A_Z)
        button.innerText = String.fromCharCode(i);

        //Character button onclick
        button.addEventListener("click",() => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            //If array contains clicked value replace the matched Dash with Letter
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //If character in array is same as clicked button
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        //Replace dash with letter
                        inputSpace[index].innerText = char;
                        //increment counter
                        winCount += 1;
                        //If winCount equals word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "Amazing, You won!!!  🤩";
                            startBtn.innerText = "🔄 Restart";
                            //block all buttons
                            blocker();
                        }
                    }
                });
            } else {
                //lose count
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById(
                "chanceCount"
                ).innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over! You Lost 😞";
                    blocker();
                }
            }
            //Disable clicked buttons
            button.disabled = true;
        });
        //Append generated buttons to the letters container
        letterContainer.appendChild(button);
    
    }
};
window.onload = () => {
  init();
};
    
//Generate word function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText="";
    randomWord=words[generateValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML= `<div id="wordHint">
    <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};


