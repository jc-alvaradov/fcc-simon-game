// Global game variables
var steps = 0;
var sequence = [];

window.onload = function(){

};

function colorClick(color){
	clickSound(color);
}

function clickSound(color){
  //Plays a sound depending on the given color
  var clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	if(color === "green"){
		clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	}else if(color === "red"){
		clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	}else if(color === "yellow"){
		clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	}else if(color === "blue"){
		clickSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
	}
  clickSound.play();
}
