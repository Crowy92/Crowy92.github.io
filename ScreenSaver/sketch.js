// let x = 50;
// let y = 200;
let balls = [];

function setup() {
	createCanvas(600, 400);
	// for (let i = 0; i < 6; i++) {
	// 	let circleSpan = i * 5 + 20;
	// 	balls[i] = new Ball(circleSpan);
	// }
}

function draw() {
	background(0, 150, 75);

	for (let i = 0; i < balls.length; i++) {
		balls[i].display();
		balls[i].move();
		balls[i].bounce();
		for (let j = 0; j < balls.length; j++) {
			if (balls[i] !== balls[j] && balls[i].intersects(balls[j])){
				balls[i].xchange *= -1;
				balls[i].ychange *= -1;
			}
		}
		
	}
	
}

function mousePressed() {
	let circleSpan = random(20, 60);
	balls.push(new Ball(circleSpan))

	for (let i = balls.length - 1; i >= 0; i--) {
		if (balls[i].clicked()) {
			balls.splice(i, 1);
			balls.pop();
		}		
	}
}

class Ball {
	constructor(diameter = 40) {
		this.x = Math.random() * 255 + 80;
		this.y = Math.random() * 255 + 80;
		this.xchange = Math.random() * 2 + 0.5;
		this.ychange = Math.random() * 2 + 0.5;
		this.diameter = diameter;
		this.r = random(255);
		this.b = random(255);
		this.g = random(255);
	}

	intersects(other) {
		let d = dist(this.x, this.y, other.x, other.y);
		return (d < this.diameter / 2 + other.diameter / 2);
	}

	move() {
		this.x += this.xchange;
		this.y += this.ychange;
	}

	clicked() {
		let d = dist(mouseX, mouseY, this.x, this.y);
		if (d < this.diameter / 2){
			return true;
		} else {
			return false;
		}
	}

	bounce() {
		if (this.x > 600 - this.diameter / 2 || this.x < 0 + this.diameter / 2) {
			this.xchange *= -1;
			this.r = random(255);
			this.g = Math.random() * 255;
			this.b = Math.random() * 255;
		}
		if (this.y > 400 - this.diameter / 2 || this.y < 0 + this.diameter / 2) {
			this.ychange *= -1;
			this.r = Math.random() * 255;
			this.g = Math.random() * 255;
			this.b = Math.random() * 255;
		} 
	}

	display() {
		stroke(0);
		strokeWeight(4);
		fill(this.r, this.g, this.b);
		ellipse(this.x, this.y, this.diameter);
	}
}