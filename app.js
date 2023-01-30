const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const COUNT_FISH = 50;
const allFish = [];

function random(min, max, withZero = true) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    if(withZero){
        return num;
    }
    while(!num){
        num = Math.floor(Math.random() * (max - min)) + min;
    }
    return num;
};

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


class Fish {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.img_fish = new Image();
        this.fish = `fish${random(1, 8)}`;
    }

    draw() {
        if(this.velX < 0){
            this.img_fish.src = `./img/${this.fish}-l.png`;
        }else{
            this.img_fish.src = `./img/${this.fish}-r.png`;
        }
        ctx.drawImage(this.img_fish, this.x, this.y);
    }

    update() {
        if ((this.x + this.img_fish.width) >= width) {
            this.velX = -(this.velX);
        }

        if (this.x <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.img_fish.height) >= height) {
            this.velY = -(this.velY);
        }

        if (this.y <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

while (allFish.length < COUNT_FISH) {
    const fish = new Fish(
        random(0 + 100, width - 100),
        random(0 + 100, height - 100),
        random(-3, 3, false),
        random(-1, 1, false),
    );
    allFish.push(fish);
}


function loop() {
    img_fon = new Image();
    img_fon.src = `./img/fon.jpg`;
    ctx.fillStyle = ctx.createPattern(img_fon, "repeat");
    ctx.fillRect(0, 0, width, height);

    for (const fish of allFish) {
        fish.draw();
        fish.update();
    }

    requestAnimationFrame(loop);
}

loop();
