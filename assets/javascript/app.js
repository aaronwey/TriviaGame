$(document).ready(function() {


function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
	generateHTML();
	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionNumber]) {		
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});  

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	 "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionNumber] + 
	 "</p>" + "<img class='center-block img-wrong' src='assets/images/chicken.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctScore++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	 "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionNumber] + "</p>" + imageArray[questionNumber];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectScore++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" +
	 "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionNumber] + "</p>" + "<img class='center-block img-wrong' src='assets/images/chicken.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" +
	 questionArray[questionNumber] + "</p><p class='first-answer answer'>A. " + answerArray[questionNumber][0] + "</p><p class='answer'>B. "+
	 answerArray[questionNumber][1] + "</p><p class='answer'>C. " + answerArray[questionNumber][2] + "</p><p class='answer'>D. " + answerArray[questionNumber][3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionNumber < 5) {
	questionNumber++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + 
	"</p>" + "<p class='summary-correct'>Correct Answers: " + correctScore + "</p>" + "<p>Wrong Answers: " + incorrectScore + "</p>" + "<p>Unanswered: " + unansweredTally + 
	"</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionNumber = 0;
	correctScore = 0;
	incorrectScore = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Which is the most abundant metal in the earth's crust?", "What is the second most abundant element in the earth's atmosphere?",
					 "What is the world's largest ocean?", "In what month is the Earth closest to the sun?", 
					 "What is the only sea on Earth with no coastline?", "Which Country has the most trees?"];

var answerArray = [["Aluminum", "Copper", "Iron", "Gold"], ["Hydrogen","Oxygen","Argon","Carbon"], ["Atlantic", "Indian", "Pacific", "Arctic"], 
				   ["June","September","January","April"], ["Mediterranean", "Baltic", "Black", "Sargasso"], 
				   ["Russia","United States","Canada","Brazil"]];

var imageArray = ["<img class='center-block img-right' src='assets/images/aluminum.jpg'>", "<img class='center-block img-right' src='assets/images/oxygen.png'>", 
					"<img class='center-block img-right' src='assets/images/pacific.png'>", "<img class='center-block img-right' src='assets/images/january.jpg'>", 
					"<img class='center-block img-right' src='assets/images/sargasso.gif'>", "<img class='center-block img-right' src='assets/images/russia.jpg'>",];

var correctAnswers = ["A. Aluminum", "B. Oxygen", "C. Pacific", "C. January", "D. Sargasso", "A. Russia"];
var questionNumber = 0;
var selecterAnswer;
var theClock;
var correctScore = 0;
var incorrectScore = 0;
var unansweredTally = 0;
