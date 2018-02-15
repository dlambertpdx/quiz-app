let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion() {
	if (questionNumber < STORE.length) {
		return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber]
			.answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber]
			.answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber]
			.answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber]
			.answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
	} else {
		renderResults();
		restartQuiz();
		$('.questionNumber').text(8);
	}
}

//increment question number
function changeQuestionNumber() {
	questionNumber++;
	$('.questionNumber').text(questionNumber + 1);
}

//increment score
function changeScore() {
	score++;
}

//start quiz
function startQuiz() {
	$('.quizStart').on('click', '.startButton', function(event) {
		$('.quizStart').remove();
		$('.questionAnswerForm').css('display', 'block');
		$('.questionNumber').text(1);
	});
}

// render question in DOM
function renderQuestion() {
	$('.questionAnswerForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
		if (answer === correctAnswer) {
			selected.parent().addClass('correct');
			ifAnswerIsCorrect();
		} else {
			selected.parent().addClass('wrong');
			ifAnswerIsWrong();
		}
	});
}

function ifAnswerIsCorrect() {
	userAnswerFeedbackCorrect();
	updateScore();
}

function ifAnswerIsWrong() {
	userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.questionAnswerForm').html(
		`<div class="correctFeedback"><div class="icon"><img src="${STORE[
			questionNumber
		].icon}" alt="${STORE[questionNumber]
			.alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`
	);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	// let iconImage = `${STORE[questionNumber].icon}`;
	$('.questionAnswerForm').html(
		`<div class="correctFeedback"><div class="icon"><img src="${STORE[
			questionNumber
		].icon}" alt="${STORE[questionNumber]
			.alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`
	);
}

//update score text
function updateScore() {
	changeScore();
	$('.score').text(score);
}

//when quiz is over this is the html for the page
function renderResults() {
	if (score >= 6) {
		$('.questionAnswerForm').html(
			`<div class="results correctFeedback"><h3>Retro Gamer!</h3><img src="https://media.tenor.com/images/2c6ec22c1eecab3ac595acfaf05c2e79/tenor.gif" alt="high score icon"/><p>You got ${score} / 8</p><p>Something tells me your initials have found their way to the top of the High Score once or twice!</p><button class="restartButton">Restart Quiz</button></div>`
		);
	} else if (score < 6 && score >= 3) {
		$('.questionAnswerForm').html(
			`<div class="results correctFeedback"><h3>Not bad!</h3><img src="https://media.giphy.com/media/DeRhjocryi3Is/giphy.gif" alt="galaga animated image"/><p>You got ${score} / 8</p><p>You've dropped a quarter or two in your day, but it's probably been a while.<p><button class="restartButton">Restart Quiz</button></div>`
		);
	} else {
		$('.questionAnswerForm').html(
			`<div class="results correctFeedback"><h3>Ooh, you scored 'N00b'</h3><img src="https://media.giphy.com/media/vfyOs6sCIjkCk/giphy.gif" alt="after burner game crash icon"/><p>You got ${score} / 8</p><p>The good news is, you likely spent much of your youth playing outside with other kids, or reading a good book!</p><button class="restartButton">Restart Quiz</button></div>`
		);
	}
}

//what happens when the user clicks next
function renderNextQuestion() {
	$('main').on('click', '.nextButton', function(event) {
		changeQuestionNumber();
		renderQuestion();
		userSelectAnswer();
	});
}

//restart quiz function - reloads page to start quiz over
function restartQuiz() {
	$('main').on('click', '.restartButton', function(event) {
		location.reload();
	});
}

//run quiz functions
function createQuiz() {
	startQuiz();
	renderQuestion();
	userSelectAnswer();
	renderNextQuestion();
}

$(createQuiz);
