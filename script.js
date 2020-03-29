function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.query = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.query];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.query++;
}
 
Quiz.prototype.isEnded = function() {
    return this.query === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.query + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Quiz Result!</h1>";
    gameOverHTML += "<h2 id='score'> Your Score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("What does CSS stand for?", ["Custom Style Sheets", "Colorfule Style Sheets", "Computer Style Sheets", "Cascading Style Sheets"], "Cascading Style Sheets"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Images in your website may have the following extensions except:", [".png", ".jpg", ".gif", ".psd"], ".psd"),
    new Question("Inside which HTML element do we put the Javascript?", ["js", "scripting", "script", "javascript"], "script"),
    new Question("What are people who write computer code called?", ["Programmers", "Manufacturers", "Professors", "Cryptographers"], "Programmers"),
];

// timer
var timer = 30;
var interval = setInterval(function(){
  document.getElementById("timer").innerHTML=timer;
  timer--;
  if (timer === 0){
    clearInterval(interval);
    document.getElementById("timer").innerHTML="Done";
    // else
    alert("You're out of time!");
  }
}, 1000);

//sound for right answer

var ding = new Audio ();
ding.src = "soundsilk-Correct-Answer-Soundeffect.mp3";
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();