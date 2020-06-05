window.onload = function () {
	canvasMain = document.getElementById("mainCanvas");
	canvasSmall  = document.getElementById("canvasTop");
	ctx  = canvasMain.getContext("2d");
	ctx2 = canvasSmall.getContext("2d");
	document.addEventListener("keydown", snakeControls);
	setInterval(game, 1000 / gameSpeed); 
}

//variables
var gameSpeed = 17;			// >25 very fast, 1000/20 pretty fast, 1000/15 normal to fast, <10 slow
var gridSize = 24; 			// the grid size => 24x24 board
var tileCount = gridSize;
var player_x = gridSize / 2;
var player_y = player_x; 	// player position (middle of the board at [gridSize/2,gridSize/2])
var food_x = 15 			// initial food horizontal location
var food_y = 15; 			// initial food vertical location
var previouscase = "";
var x_velocity = 0;			// direction of the snake [horizontally]
var y_velocity = 0;			// direction of the snake [vertically]
var trail = [];
var tail = 3;				// tail size (including head)
var score = 0;
var finalscore = 0;
var level = 1;
var pointsCnt = 0;


function game() {
	player_x += x_velocity; // snake move horizontally
	player_y += y_velocity; // snake move vertically

	// if snake wraps around the board or not
	snakeWrap(true); 
	// Initialise canvas values
	InitialiseCanvas(ctx);
	InitialiseCanvas(ctx2);
	// Display game elements (score, level , e.t.c.)
	DisplayScore(ctx2);
	
	for (var i = 0; i < trail.length; i++) {
		ctx.fillStyle = ( i == trail.length - 1 )? "white" : "white"; // we may have wanted the head to have different color from the body
		ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
		// the player loses when the snake runs into its tail
		if (trail[i].x == player_x && trail[i].y == player_y) 
			PlayerReset (/*because player*/ 'hitTail');
	}

	trail.push({
		x: player_x,
		y: player_y
	});
	
	while (trail.length > tail) 
		trail.shift();

	// food has been collected
	if (food_x == player_x && food_y == player_y) {
		tail++;
		score += 10;
		pointsCnt += 10;
		// if player has collected more than 100 points level up
		if (pointsCnt >= 100) {
			pointsCnt = 0;
			level++;
		}
		GetFoodsLocation();
	}
	PlaceFood();
}


// function which helps us find the location of the next "random" food
function GetFoodsLocation() {
	do {
		// random position
		food_x = Math.floor(Math.random() * (tileCount - 1));
		food_y = Math.floor(Math.random() * (tileCount - 1));
	} while (trail.some(hasPoint)); // while food has been spawned on an empty location
}


// check if food has been spawned on snake's trail, we don't want that collision
function hasPoint() {
	for (var i = 0; i < trail.length; i++) {
		if (trail[i].x == food_x && trail[i].y == food_y)
			return (true);
	}
}


function snakeControls(evt) {
	var delayInMilliseconds = 10; //just a small delay of 10 ms

	setTimeout(function () {
		var buttonPressed;
		switch (evt.keyCode) {
			case 37:
			case 65:
				buttonPressed = "left";
				if (previouscase == "left" || previouscase == "right") break;
				x_velocity = -1;
				y_velocity = 0;
				break;

			case 38:
			case 87:
				buttonPressed = "up";
				if (previouscase == "up" || previouscase == "down") break;
				x_velocity = 0;
				y_velocity = -1;
				break;

			case 39:
			case 68:
				buttonPressed = "right";
				if (previouscase == "left" || previouscase == "right") break;
				x_velocity = 1;
				y_velocity = 0;
				break;

			case 40:
			case 83:
				buttonPressed = "down";
				if (previouscase == "up" || previouscase == "down") break;
				x_velocity = 0;
				y_velocity = 1;
				break;
		}
		previouscase = buttonPressed;
	}, delayInMilliseconds);
}


function InitialiseCanvas(canvasCtx) {
	canvasCtx.fillStyle = "black";
	canvasCtx.fillRect(0, 0, canvasMain.width, canvasMain.height);
	canvasCtx.font = '20pt Arial';
	canvasCtx.fillStyle = "white";
	canvasCtx.strokeStyle = "white";
}


function DisplayScore(canvasCtx) {
	canvasCtx.fillText("Score " + score, 450, 34);
	canvasCtx.fillText("BestScore " + finalscore, 25, 34);
	canvasCtx.fillText("Level " + level, 260, 34);
}


function PlaceFood() {
	ctx.fillStyle = "red";
	ctx.fillRect(food_x * gridSize, food_y * gridSize, gridSize - 2, gridSize - 2);
}


function PlayerReset(reason) {
	if (score > finalscore)  /*user got a new highscore*/
		finalscore = score;
	score = 0;					
	tail = 3;	// tail size (including head)
	level = 1;				
	pointsCnt = 0;

	if(reason != 'wall') return;
	// player's initial location values
	player_x = player_y = gridSize / 2;

}


function snakeWrap(wrapBool) {
	if (wrapBool) {
		// snake wraps around the board
		if (player_x < 0) 
			player_x = tileCount - 1;
		
		if (player_x > tileCount - 1) 
			player_x = 0;
		
		if (player_y < 0) 
			player_y = tileCount - 1;
		
		if (player_y > tileCount - 1) 
			player_y = 0;
		
		return;
	} 
	// else snake wraps around the board
	if ((player_x < 0) || (player_x > tileCount - 1) || (player_y < 0) || (player_y > tileCount - 1)) {
		PlayerReset (/*because player hit a*/ 'wall');
		alert("You lost! Press OK to restart the game...");
	}
}
