let bird;
let pipes = [];
let score = 0;
let highscore = 0;
let updateSpeed = 2;
let gapUpdate = 100;

function setup() {
	createCanvas(600, 400);
	bird = new Bird();
	pipes.push(new Pipe(updateSpeed, gapUpdate));
}

function draw() {
	//cloud background
	background(0, 80, 200);
	fill(255, 200);

	ellipse(500, 100, 60, 60);
	ellipse(450, 70, 60, 60);
	ellipse(450, 100, 60, 60);
	ellipse(400, 100, 60, 60);

	ellipse(200, 150, 60, 60);
	ellipse(150, 120, 60, 60);
	ellipse(150, 150, 60, 60);
	ellipse(100, 150, 60, 60);

	bird.update();
	bird.show();

	if (frameCount % 120 == 0) {
		pipes.push(new Pipe(updateSpeed, gapUpdate));
		score ++;
	}

	if (frameCount % 720 == 0) {
		updateSpeed += 0.3;
		gapUpdate -= 5;
	}

	for (let i = pipes.length -1; i >= 0; i--) {
		pipes[i].show();
		pipes[i].update();
		if (pipes[i].x < -40) {
			pipes.splice(i, 1);
		} 
		if (pipes[i].hits(bird)) {
			if (score > highscore) {
				highscore = score;
			}
			window.alert("Splat! You died, your score was: " + score + ",  the highscore is: " + highscore + ".  Press space to try again!");
			score = 0;
			pipes.splice(0);
			updateSpeed = 2;
			gapUpdate = 100;
		}
	}

	
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}