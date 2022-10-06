//Questions to be asked--Using an array to prompt questions
const questions = [{
    question: "Arrays in JavaScript can be used to store...",
    answers: [ "Booleans",  "Numbers and strings", "Other arrays", "All of the above"], 
    correctAnswer: "All of the above"
    
}, {
    question: "How do you enclose the condition of an ' if ' statement?",
    answers: ["Quotes",  "Square brackets",  "Curly brackets",  "Parentheses"],
    correctAnswer: "Parentheses" 
    
}, {
    question: "What is a very useful tool for debugging and printing content to the debugger?",
    answers: ["Console.log", "For loops",  "CSS",  "Terminal/Bash"], 
    correctAnswer: "Console.log"

}, {
    question: "Which of the followings is used to enlose string values?",
    answers: ["Commas", "Curly brackets", "Panrenthesis",  "Quotes"], 
    correctAnswer: "Quotes"
}];
// Questions end here

// Setting timer
const timerEl = document.getElementById("timer");

// Connecting buttons with their ID based on selection to determine if choise is correct or incorrect
const startButton = document.getElementById('start-btn')
const answerButtonsElement = document.getElementById('answer-buttons')
const submitButton = document.getElementById('submit-btn')
const answer1 = document.getElementById("btn1");
const answer2 = document.getElementById("btn2");
const answer3 = document.getElementById("btn3");
const answer4 = document.getElementById("btn4");

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')

// Page display
const welcomePageElements = document.getElementById('welcome-page')
const endGameElements = document.getElementById('end-page')
const scoreElement = document.getElementById('score')
const displayEl = document.getElementById('display')
const displayEl2 = document.getElementById('display2')

// Previous Scores display 
const initialsEl = document.getElementById('initials')
const scoresEl = document.getElementById('high-scores')
const newScore = document.getElementById('newScores')
const viewScoreList = document.getElementById('highscore')
const containerEl = document.getElementById('container')


let questionCounter = 0;
// Determining the amount of time left based on the number of questions. For 4 questions: 4*15s = 60s
let timeLeft = questions.length * 15;                       

// Timer countdown in seconds
function countDown() {
                            
        if(timeLeft > 0){
            timerEl.textContent = "Timer:  " + timeLeft;
            timeLeft--
        }
        else {
            timerEl.textContent = "Timer:  " + timeLeft; 
            endGame();
        }
    }

var createQuestionElement = function(index) {

    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;
    answer1.textContent = currentQuestion.answers[0]
    answer2.textContent = currentQuestion.answers[1]
    answer3.textContent = currentQuestion.answers[2]
    answer4.textContent = currentQuestion.answers[3]
}

var checkAnswer = function(event) {
    var correctAnswer = questions[questionCounter].correctAnswer
    var currentAnswer = event.target.textContent   
    displayEl.classList.remove('hide') 
    displayEl2.classList.remove('hide')
    
// Setting functions to determine effect upon answer selection
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "CORRECT"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "INCORRECT ANSWER"
// Deducting 10 seconds for every incorrect answer
        timeLeft -= 10;
    }
    
    questionCounter++;
    if(questionCounter === questions.length){
        endGame();
    } else {
    createQuestionElement();
}
}

// CREDIT: Section below completed with collaboration from coder colleague Brams Lo
var startGame = function(){
    timeInterval = setInterval(countDown, 1000);
    startButton.classList.add('hide')
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    countDown();
    createQuestionElement();
    }

var endGame = function(){
    clearInterval(timeInterval);
    questionContainerElement.classList.add('hide')
       endGameElements.classList.remove('hide')
       scoreElement.textContent = "Your final score is " + timeLeft;
       timerEl.classList.add('hide')

       setTimeout(function() {
           displayEl.setAttribute("class", "hide");
       }, 1000);
       setTimeout(function() {
           displayEl2.setAttribute("class", "hide");
       }, 1000);
       highScore();
  }

  function highScore(){
    submitButton.addEventListener("click", function(event) {

    var id = initialsEl.value
    var score = timeLeft;
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    if(id.length > 0) {
        var newScore = {
            id,
            score
        }
        console.log(id)
        scoresEl.classList.remove('hide');
        endGameElements.classList.add('hide');
        containerEl.classList.add('hide')
        viewScoreList.classList.add('hide')
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
           
        if(highscores !== undefined) {
            highscores.sort(function(a,b){
                return b.score - a.score
            })
            highscores.forEach(function(score){
                console.log(score)
                var li = document.createElement("li");
                li.innerHTML = "<h3>" + score.id + "  " + score.score + "</h3>"
                var olEl = document.getElementById('newScores');
                olEl.appendChild(li)
            })
        }
    }
  
        console.log(highscores);
    })
    }

  function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

function viewHighScores(){
    startButton.classList.add('hide')
    welcomePageElements.classList.add('hide')
    questionContainerElement.classList.add('hide')
    displayEl.classList.add('hide') 
    displayEl2.classList.add('hide')
    timerEl.classList.add('hide')
    scoresEl.classList.remove('hide')
    containerEl.classList.add('hide')
    viewScoreList.classList.add('hide')

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

highscores.sort(function(a,b){
    return b.score - a.score
})

highscores.forEach(function(score){
    var li = document.createElement("li");
    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
    var olEl = document.getElementById('newScores');
    olEl.appendChild(li)
})

console.log(highscores);
}

document.getElementById("clear").onclick = clearHighscores;
startButton.addEventListener('click', startGame)
answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)
viewScoreList.addEventListener("click", viewHighScores)