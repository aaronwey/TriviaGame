$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = 
	"<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button

$("body").on("click", ".start-button", function(event){
	// event.preventDefault();  // added line to test issue on GitHub Viewer

	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;

	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){

	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = 
	"<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>No more time you dum dum!  The correct answer was: " + correctAnswers[questionCounter] +
	"</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Got it Smarty Pants! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);    
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
	"<p class='text-center'>Bad Job! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + 
	"<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>"
	 + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + 
	 "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+
	 "</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 5) {
	questionCounter++;
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
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
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

var imageArray = ["<img class='center-block img-right' src='Aluminum'>", "<img class='center-block img-right' src='oxygen'>", 
					"<img class='center-block img-right' src='Pacific'>", "<img class='center-block img-right' src='New years'>", 
					"<img class='center-block img-right' src='Sargasso'>", "<img class='center-block img-right' src='Russia'>",];

var correctAnswers = ["A. Aluminum", "B. Oxygen", "C. Pacific", "C. January", "D. Sargasso", "A. Russia"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

