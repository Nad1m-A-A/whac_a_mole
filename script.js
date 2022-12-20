const gridDOM = document.querySelector('.grid');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const scoreDOM = document.querySelector('.score');
const bestDOM = document.querySelector('.best');
const timeLeftDOM = document.querySelector('.time-left');

let timeLeft = 60;
let score = 0;
let best = 0;
let target;
let generaterID;
let timeLeftID;

(function (){ // Create elements and add events
    for(let i = 1; i < 10; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        gridDOM.append(square);
    };

    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    pauseBtn.setAttribute('disabled', 'disabled');
})();

function startGame(){
    if(timeLeft === 0){ // if time is out reset values
        score = 0;
        timeLeft = 60;
    } 

    scoreDOM.innerHTML = score;
    const squares = gridDOM.querySelectorAll('.square');

    generaterID = setInterval(() => generateTarget(squares), 600);
    timeLeftID = setInterval(() => timer(), 1000);

    toggleButtons();
};

function pauseGame(){
    if(target){
        target.removeEventListener('click', increaseScore);
        target.classList.remove('target');
    };

    clearInterval(generaterID);
    clearInterval(timeLeftID);

    toggleButtons();
};

function generateTarget(squares) {
    const randomNum = Math.floor(Math.random() * squares.length);
    target = squares[randomNum];

    squares.forEach(square => {
        square.classList.remove('target');
        square.removeEventListener('click', increaseScore);
    });

    target.classList.add('target');
    target.addEventListener('click', increaseScore);
};

function increaseScore() {
    score++;
    scoreDOM.innerHTML = score;
    this.removeEventListener('click', increaseScore);
    if(score > best ){
        best = score;
        bestDOM.innerHTML = best;
    } 
}

function timer(){
    if(timeLeft === 0){
        pauseGame();
        return;
    }
    timeLeft--;
    timeLeftDOM.innerHTML = timeLeft;
};

function toggleButtons() {
    pauseBtn.toggleAttribute('disabled');
    startBtn.toggleAttribute('disabled');
}

// BUGS :
// 1) image does not fade

// 1) target is undefined if the player clicks pause right after start  SOLVED
// 2) after pause and resume the score will be set to 0                 SOLVED
// 3) game does not reset                                               SOLVED
// 4) there is no best result                                           SOLVED
// 5) player can pause and click target and get point                   SOLVED