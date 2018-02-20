const DATA = [
	{
		question:
			'What popular arcade game, released in 1978, had grossed $2 Billion in quarters by 1982?',
		answers: ['Space Invaders', 'Super Breakout', 'Galaga', 'Pacman'],
		correctAnswer: 'Space Invaders',
		image:
			'https://cdn.dribbble.com/users/1161651/screenshots/2691796/space-invader-enemy.gif',
		alt: 'space invaders animated gif',
	},
	{
		question: 'What was the first home video game system available?',
		answers: [
			'Atari 2600',
			'Intellivision',
			'Magnavox Odyssey',
			'Fairchild Channel F',
		],
		correctAnswer: 'Magnavox Odyssey',
		image: 'https://i.imgur.com/ygna71Q.png',
		alt: 'magnavox odyssey icon',
	},
	{
		question:
			'What was the original name of Coleco Industries when it was first founded?',
		answers: [
			'Color Electronics Company',
			'The Connecticut Leather Company',
			'Consumer Electric Co.',
			'Telstar',
		],
		correctAnswer: 'The Connecticut Leather Company',
		image: 'https://i.imgur.com/mfGC2Ks.png',
		alt: 'coleco icon',
	},
	{
		question:
			'What console game was such a commercial failure that Atari took the step to have all unsold copies of the game crushed and buried in a landfill in New Mexico?',
		answers: [
			'Pacman',
			'Friday the 13th',
			'E.T. the Extra-Terrestrial',
			'Pong',
		],
		correctAnswer: 'E.T. the Extra-Terrestrial',
		image:
			'https://s.yimg.com/ny/api/res/1.2/XmBNLWhbvagaHr67WZOUug--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NTQwO2g9MzU1/https://s3.amazonaws.com/pnr-wp/2016/09/13232459/fd0fef3b44c78b57b08182cc53c4e8a8.gif',
		alt: 'E.T. Atari animated gif',
	},
	{
		question:
			'In which classic arcade game do you play a knight who rides on the back of an ostrich, where if you take to long to get through a level, you have to battle a pterodactyl?',
		answers: ["Dragon's Lair", 'Knights of the Round', 'Galaga', 'Joust'],
		correctAnswer: 'Joust',
		image: 'https://thumbs.gfycat.com/DirtyMistyAntbear-max-1mb.gif',
		alt: 'joust animated gif',
	},
	{
		question:
			'As one of just a few women working in the video game industry in the 1980s, which iconic arcade game did Dona Bailey co-create and program?',
		answers: ['Moon Patrol', 'Centipede', 'Galaga', 'Bubble Bobble'],
		correctAnswer: 'Centipede',
		image: 'http://thelawleys.com/images/centipede/centanim.gif',
		alt: 'centipede animated gif',
	},
	{
		question:
			"What vector-based arcade tunnel-shooter with 'spinner' control was the first game to allow the player to choose their starting level?",
		answers: ['Asteroids', 'Star Wars', 'Lunar Lander', 'Tempest'],
		correctAnswer: 'Tempest',
		image:
			'https://jfgarra123.files.wordpress.com/2016/08/tumblr_lmbzo38zs31qzzsdjo1_r1_500.gif',
		alt: 'tempest gameplay',
	},
	{
		question:
			'Released in 1982, what home game console was released with its own 9"x12" monitor, and came with plastic overlays to provide color and detail for it\'s black and white CRT screen?',
		answers: ['Vectrex', 'Telstar', 'Intellivision', 'Atari 2600'],
		correctAnswer: 'Vectrex',
		image:
			'https://78.media.tumblr.com/b3207cdd6fea91fe8193c8d2eb990547/tumblr_nxguohio401qju2zso1_400.gif',
		alt: 'vectrex star wars game',
	},
];

//create variable to store question number
let questionNum = 0;
//create variable to store score
let score = 0;

//generate question from 'DATA' object
function generateQuestion() {
	//if question number less than total number of questions...
	if (questionNum < DATA.length) {
		return `<div class="question-${questionNum}">
    <h3>${DATA[questionNum].question}</h3>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNum]
			.answers[0]}" name="answer" required>
    <span>${DATA[questionNum].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNum]
			.answers[1]}" name="answer" required>
    <span>${DATA[questionNum].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNum]
			.answers[2]}" name="answer" required>
    <span>${DATA[questionNum].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNum]
			.answers[3]}" name="answer" required>
    <span>${DATA[questionNum].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
	} else {
		renderResults();
		restartQuiz();
		$('.questionNum').text(8);
	}
}

//increment question number
function incrementQuestion() {
	questionNum++;
	$('.questionNum').text(questionNum + 1);
}

//increment score
function incrementScore() {
	score++;
}

//start quiz
function startQuiz() {
	$('.quizStart').on('click', '.startButton', function(e) {
		//remove start page
		$('.quizStart').remove();
		//display quizForm instead of start page
		$('.quizForm').css('display', 'block');
		$('.questionNum').text(1);
	});
}

// render question in DOM
function renderQuestion() {
	$('.quizForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${DATA[questionNum].correctAnswer}`;
		if (answer === correctAnswer) {
			selected.parent().addClass('correct');
			ifAnswerCorrect();
		} else {
			selected.parent().addClass('wrong');
			ifAnswerIncorrect();
		}
	});
}

function ifAnswerCorrect() {
	feedbackCorrect();
	updateScore();
}

function ifAnswerIncorrect() {
	feedbackIncorrect();
}

//user feedback for correct answer
function feedbackCorrect() {
	let correctAnswer = `${DATA[questionNum].correctAnswer}`;
	$('.quizForm').html(
		`<div class="correctFeedback"><div class="image">
    <img src="${DATA[questionNum].image}" alt="${DATA[questionNum].alt}"/>
    </div><p>That's Right!!!</p><button type=button class="nextButton">Next</button></div>`
	);
}

//user feedback for wrong answer
function feedbackIncorrect() {
	let correctAnswer = `${DATA[questionNum].correctAnswer}`;
	$('.quizForm').html(
		`<div class="correctFeedback"><div class="image">
    <img src="${DATA[questionNum].image}" alt="${DATA[questionNum].alt}"/>
    </div><p>Doh! That's incorrect! <br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`
	);
}

//update score text
function updateScore() {
	incrementScore();
	$('.score').text(score);
}

//message at end of quiz
function renderResults() {
	if (score >= 6) {
		$('.quizForm').html(
			`<div class="results correctFeedback">
			<h3>Way to go! You're a Retro Gamer!</h3>
			<img src="https://media.tenor.com/images/2c6ec22c1eecab3ac595acfaf05c2e79/tenor.gif" alt="high score icon"/>
			<p>You scored ${score} / 8</p>
			<p>Something tells me your initials have found their way to the top of the High Score once or twice!</p>
			<button class="restartButton">Restart Quiz</button></div>`
		);
	} else if (score < 6 && score >= 3) {
		$('.quizForm').html(
			`<div class="results correctFeedback">
			<h3>Not bad!</h3>
			<img src="https://media.giphy.com/media/DeRhjocryi3Is/giphy.gif" alt="galaga animated image"/>
			<p>You scored ${score} / 8</p>
			<p>You've dropped a quarter or two in your day, but it's probably been a while.</p><button class="restartButton">Restart Quiz</button></div>`
		);
	} else {
		$('.quizForm').html(
			`<div class="results correctFeedback">
			<h3>Ooh, not great :(</h3>
			<img src="https://media.giphy.com/media/vfyOs6sCIjkCk/giphy.gif" alt="after burner game crash icon"/>
			<p>You only got ${score} / 8</p>
			<p>The good news is, you likely spent much of your youth playing outside with other kids, or reading a good book!</p>
			<button class="restartButton">Restart Quiz</button></div>`
		);
	}
}

//what happens when the user clicks next
function nextQuestion() {
	$('main').on('click', '.nextButton', function(e) {
		incrementQuestion();
		renderQuestion();
		userSelectAnswer();
	});
}

//restart quiz function - reloads page to start quiz over
function restartQuiz() {
	$('main').on('click', '.restartButton', function(e) {
		location.reload();
	});
}


//run quiz functions
function renderQuiz() {
	startQuiz();
	renderQuestion();
	userSelectAnswer();
	nextQuestion();
}

$(renderQuiz);
