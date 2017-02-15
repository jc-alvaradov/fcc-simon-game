// Global game variables
var steps = 0;
var sequence = [];
var playerSequence = [];
var userCanPlay = false;
var strictMode = false;

window.onload = function(){
	randomNewColor();
	showSequence();
};

function colorClick(color){
	if(userCanPlay === true){
		clickSound(color);
		if(checkMistake(color) === false){
			document.getElementById("message-text").innerHTML = "Nice :) ";
			playerSequence.push(color);
			checkSequence();
		}
	}
}

function showSequence(){
	blockPlayer();
	playSequence(0);
	setTimeout(function(){
		document.getElementById("input-blocker").style.display = 'none';
		userCanPlay = true;
	}, (sequence.length) * 1000);	 
}

function playSequence(i){
	// This recursive function plays every color in the sequence
	if(i < sequence.length){
		var colorBtn = document.getElementById(sequence[i]);
		clickSound(sequence[i]);
		colorBtn.classList.add("selected");
		setTimeout(function(){
			colorBtn.classList.remove("selected");
			i++;
			playSequence(i);
		}, 1000);	 
	}
}

function randomNewColor(){
	// adds a random new color(from the 4 posible) to the sequence.
	var colors = ["green", "red", "yellow", "blue"];
	var random = Math.floor(Math.random() * 4);
	sequence.push(colors[random]);
	steps++;
	updateSteps();
}

function checkMistake(color){
	if(sequence[playerSequence.length] !== color){
		// the user made a mistake
		document.getElementById("message-text").innerHTML = "Wrong :(";
		 if(strictMode === true){
			 restart();
			 return true;
		 }
		blockPlayer();
		playerSequence = [];
		setTimeout(function(){		 
			showSequence();
		}, 1000);
		return true;
	}else{
		return false;
	}
}

function checkSequence(){
	// This function checks if the entered sequence is correct
	if(playerSequence.length === sequence.length){
		// the user finished one sequence correctly, lets add another step.
		document.getElementById("message-text").innerHTML = "Great!";
		blockPlayer();
		playerSequence = [];
		randomNewColor();
		if(steps === 20){
			 userWon();
		}else{
			setTimeout(function(){		 
				showSequence();
			}, 1000);
		}
	}
}

function userWon(){
	// The user reached 20 steps, notify the user and restart the game after 5 seconds
	var cheer = new Audio('https://www.freesound.org/people/Corsica_S/sounds/337000/download/337000__corsica-s__cheer-01.wav');
	cheer.play();
	blockPlayer();
	document.getElementById("message-text").innerHTML = "Congratulations!";
	setTimeout(function(){		 
		restart();
	}, 5000);
}

function blockPlayer(){
	userCanPlay = false;
	document.getElementById("input-blocker").style.display = 'block';
}

function updateSteps(){
	document.getElementById("steps-text").innerHTML = "Steps: " + steps;
}

function restart(){
	// This function restarts the game. It can be called from user input or from strict mode
	userCanPlay = false;
	steps = 0;
	updateSteps();
	sequence = [];
	playerSequence = [];
	randomNewColor();
	document.getElementById("message-text").innerHTML = "";
	setTimeout(function(){		 
		showSequence();
	}, 1000);
}

function activateStrictMode(){
	if(strictMode === false){
		document.getElementById("message-text").innerHTML = "Strict Mode ON";
		strictMode = true;
	}else{
		document.getElementById("message-text").innerHTML = "Strict Mode OFF";
		strictMode = false;	
	}
}

function clickSound(color){
  //Plays a sound depending on the given color
  var clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	switch(color){
			case "green":
				clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
				break;
			case "red":
				clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
				break;
			case "yellow":
				clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
				break;
			case "blue":
				clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
				break;
	}
  clickSound.play();
}
