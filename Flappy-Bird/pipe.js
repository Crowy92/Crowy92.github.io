function Pipe(speed, gap) {
    this.top = random(height*2/3);
    //this.bottom = random(height/2);
    this.x = width;
    this.w = 40;
    this.highlight = false;

    this.show = function() {
        fill(0, 255, 0);
        if (this.highlight) {
            fill (255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.top + gap, this.w, height - (this.top + gap));
    }

    this.update = function() {
        this.x -= speed;
    }

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > this.top + gap){
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        return false;
    }
}