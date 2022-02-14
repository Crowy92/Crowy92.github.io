let ship;
let asteroids = [];
let lasers = [];
let score = 0;
let highscore = 0;
let lives = 2;
let dificulty = 1;

function setup() {
	createCanvas(700, 700);
	ship = new Ship();
	for (let i = 0; i < 10; i++) {
		asteroids.push(new Asteroid());
	}
}


function keyPressed() {
	if (key == ' ') {
		lasers.push(new Laser(ship.pos, ship.heading));
	}
}

function draw() {
	background(0, 0, 70);	
	fill(244, 232, 104);
	ellipse(500, 200, 80);
	strokeWeight(3);
	stroke(244, 232, 104);
	line(450, 75, 450, 105);
	line(440, 90, 460, 90);
	ellipse(450, 90, 10);
	line(410, 115, 410, 145);
	line(400, 130, 420, 130);
	ellipse(410, 130, 10);
	strokeWeight(1);
	fill(255);
	if (keyIsDown(RIGHT_ARROW)) {
		ship.turn(0.1);
	} if (keyIsDown(LEFT_ARROW)) {
		ship.turn(-0.1);
	} if (keyIsDown(UP_ARROW)) {
		ship.boost();
	} 

	for (let i = 0; i < asteroids.length; i++) {
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
		if (ship.hits(asteroids[i])) {
			lives -= 1;
			window.alert("Kaboom! You died, your score was: " + score + ",  the highscore was: " + highscore + ".  Press space to try again!");
			if (score > highscore) {
				highscore = score;
			}
			score = 0;
			dificulty = 1;
			asteroids.splice(0);
			for (let i = 0; i < 10; i++) {
				asteroids.push(new Asteroid());
			}
		}
	}

	for (let i = lasers.length -1; i >= 0; i--) {
		lasers[i].render();
		lasers[i].update();
		if (lasers[i].pos.x > width || lasers[i].pos.x < 0 || lasers[i].pos.y > height || lasers[i].pos.y < 0) {
			lasers.splice(i, 1);
			break;
		} 
		for (let j = asteroids.length -1; j >= 0; j--) {
			if (lasers[i].hits(asteroids[j])) {
				score++;
				if (asteroids[j].r > 10) {
					let newAsteroids = asteroids[j].breakup();
					asteroids = asteroids.concat(newAsteroids);
				}
				lasers.splice(i, 1);
				asteroids.splice(j, 1);
				break;
			}
		}
	}

	ship.render();
	ship.edges();

	if (asteroids.length < 1) {
		window.alert("Congratulations, you survived the asteroid field!, your score is: " + score + ",  the highscore is: " + highscore + ".  Press space to continue!");
		dificulty += 0.3;
		ship = new Ship();
		for (let i = 0; i < 10; i++) {
			asteroids.push(new Asteroid());
		}
	}
}

function Asteroid(pos, r) {
	//checks whether asteroid already has its own position and radius
	//if so then it uses these, if not it randomly generates
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(300, 680), random(300, 680));
	}
	if (r) {
		this.r = r * 0.5;
	} else {
		this.r = random(10, 45);
	}


	this.vel = p5.Vector.random2D().mult(dificulty);
	this.sides = floor(random(5, 10));
	this.offset = [];

	for ( let i = 0; i < this.sides; i++) {
		this.offset[i] = random(-this.r * 0.5, this.r * 0.5)
	}

	this.render = function () {
		push();
		strokeWeight(3);
		stroke(0);
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (let i = 0; i < this.sides; i++) {
			let angle = map(i, 0, this.sides, 0, TWO_PI);
			let rad = this.r + this.offset[i];
			let x = rad * cos(angle);
			let y = rad * sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE);
		pop();
	}

	this.update = function() {
		this.pos.add(this.vel);
	}

	this.edges = function() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		} 	if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}

	this.breakup = function() {
		let newA = [];
		newA[0] = new Asteroid(this.pos, this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA;
	}
}

function Ship() {
	this.pos = createVector(width/5, height/5);
	//r here is the radius of the shape
	this.r = 15;
	this.heading = 0;
	this.vel = (0,0);
	this.rotation = 0;


	this.render = function() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(170);
		stroke(0);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		fill(255, 69, 0)
		rect(-this.r, 0, 8, 20);
		rect(this.r - 8, 0, 8, 20);
		pop();
	}

	this.update = function() {
		this.pos.add(this.vel); 
	}

	this.boost = function() {
		let force = p5.Vector.fromAngle(this.heading);
		force.mult(1.5);
		this.pos.add(force);
	}

	this.edges = function() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		} 	if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}

	this.hits = function(asteroid) {
		let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		return (d < this.r + asteroid.r);
	}

	this.turn = function(angle) {
		this.heading += angle;
	}
}

function Laser(spos, angle) {
	this.pos = createVector(spos.x, spos.y);
	this.vel = p5.Vector.fromAngle(angle).mult(6);


	this.update = function() {
		this.pos.add(this.vel);
	}

	this.render = function() {
		push();
		stroke(244, 232, 104);
		strokeWeight(5);
		point(this.pos.x, this.pos.y);
		pop();
	}

	this.hits = function(asteroid) {
		let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		return (d < asteroid.r);
	}

}
