// create a timer for quiz
let currentQuestionIndex = 0;
let time = questions.length * 10;
let timer;

//connect variable with Id - ref DOM
let questionsEl = document.getElementById('questions');
let timerEl = document.getElementById('time');
let choicesEl = document.getElementById('choices');
let submitBtn = document.getElementById('submit');
let startBtn = document.getElementById('start');
let initialsEl = document.getElementById('initials');
let feedbackEl = document.getElementById('feedback');

// add sounds
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

// function for the start Quiz button connect
function startQuiz() {
    let startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
}

//function to select multiple questions
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';
  
    // for loop to loop through questions 
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      let choice = currentQuestion.choices[i];
      let choiceNode = document.createElement('button');
      choiceNode.setAttribute('class', 'choice');
      choiceNode.setAttribute('value', choice);
      choiceNode.textContent = i + 1 + '. ' + choice;
      choicesEl.appendChild(choiceNode);
    }
  }
  
  //funtion to be able to answer the question 
  function questionClick(event) {
    var buttonEl = event.target;

  //if statement if nothin is clicked 
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
  //if answer is incorrect then this if statement is created
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
      time -= 5;
  
      if (time < 0) {
        time = 0;
      }

      timerEl.textContent = time;
  
      // sound if incorrect answer
      sfxWrong.play();
  
      // feedback show the response after answering the questions
      feedbackEl.textContent = 'NOT RIGHT!';
    } else {
      // sound if correct answer is chosen
      sfxRight.play();
  
      feedbackEl.textContent = 'YES YOU ARE RIGHT!';
    }
  

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
  
    // got to next question in array
    currentQuestionIndex++;
  
    // length check of array to see if any more questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  // function to end the quiz
  function quizEnd() {
    clearInterval(timerId);
  

    let endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // score
    let finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute('class', 'hide');
  }
  

  //function to let you know time is running out to answer question
  function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      quizEnd();
    }
  }
  
  //function to save the highest score
  function saveHighscore() {
    let initials = initialsEl.value.trim();
  
    
    if (initials !== '') {
      let highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      let newScore = {
        score: time,
        initials: initials,
      };
  
      // save the high score in file 
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
      window.location.href = 'highscores.html';
    }
  }
  
  //function for enter key
  function checkForEnter(event) {
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }
  
  //button to save highscore
  submitBtn.onclick = saveHighscore;
  
  //button to start quiz
  startBtn.onclick = startQuiz;
  choicesEl.onclick = questionClick;
  initialsEl.onkeyup = checkForEnter;

