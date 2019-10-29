function Bird() {
    this.y = height / 2;
    this.x = 100;
    this.gravity = 0.5;
    this.velocity = 0;
    this.lift = -12;

    this.show = function() {
        //Drawing of the bird
        fill(250, 140, 0);
        ellipse(this.x, this.y, 30, 30);
        fill(255);
        ellipse(this.x + 5, this.y, 10, 10 );
        fill(0);
        ellipse(this.x + 5, this.y, 3, 3 );
        fill(255, 230, 0);
        triangle(this.x + 13, this.y + 6, this.x + 13, this.y - 6, this.x + 23, this.y)
        triangle(this.x - 15, this.y, this.x - 15, this.y - 18, this.x - 2, this.y - 2)
        fill(0);
        triangle(this.x - 16, this.y, this.x - 21, this.y - 6, this.x - 21, this.y + 6)
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if (this.y > height) {
            this.velocity = 0;
            this.y = height;
        }
        if (this.y < 0) {
            this.velocity = 0;
            this.y = 0
        }
    }
}