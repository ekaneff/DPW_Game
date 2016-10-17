window.addEventListener("load", (e)=> {
    console.log("Let it begin!");
    var myApp = Game.getInstance();
});

class Game {
	constructor() {
		console.log("Game Created");
		this.images = [];
		this.screen = document.querySelector("canvas");
		this.player = null;
		this.ants = [];
		Game.state = "playing";
		Game.ctx = this.screen.getContext("2d");
		this.loadAssets(["grass.png","ant-leftfacing.png", "ant-rightfacing.png", "bug.png"]); 

	}

	init() {
		console.log("Initializing...");
		this.screen.style.background = "url(" + this.images[0].src + ")";
		this.player = new Player(this.images[3]);
		this.player.x = 400;
		this.player.y = 550;
		this.player.setScale(.21);
		this.player.draw();
		this.makeAnts();
		this.key = new Key();
		this.key.init();
		this.updateAll();
	}

	makeAnts() {
		var tempImg = this.images[2];
		var tempSpeed = 0;
		for (var j=0;j<3;j++) {
            for (var i=0;i<7;i++) {
            	if (j == 0) {
            		tempSpeed = 4;
            	} else if (j == 1) {
            		tempSpeed=-3;
            		tempImg = this.images[1];
            	} else {
            		tempImg = this.images[2];
            		tempSpeed = 2;
            	}
                var ant = new Ant(tempImg);
                ant.setScale(1.3);
                ant.speedX = tempSpeed;
               
                if (i == 3)i++;
                ant.x = 50 + (i*120);
                ant.y = 150 + (j*150);
                ant.draw();
                this.ants.push(ant);
            }
        }
	}

	loadAssets(arr) {
		var count = 0;
		var that = this;

		(function loadAsset() {
			var img = new Image();
			img.src = "assets/imgs/" + arr[count];
			img.addEventListener("load", function(e){
				that.images.push(img);
				count++;
				if (count < arr.length){
					loadAsset();
				} else {
					console.log("Images loaded");
					that.init();
				}
			});
		})();
	}

	updateAll() {
		var that = this;

		(function drawFrame(){ //ask what this really does
			window.requestAnimationFrame(drawFrame);
			Game.ctx.clearRect(0,0,that.screen.width, that.screen.height);
			if (Game.state == "playing"){
				that.ants.forEach((el) => {
	                el.update();
	            });

				that.player.update();
			} 
		})();
	}

	static getInstance() {
        if(!Game._instance)
        {
            Game._instance = new Game();
            return Game._instance;
        }
        else
        {
            throw "Game Singleton already created!";
        }
    }
}

class Sprite {
	constructor(img) {
		this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.width = img.width;
        this.height = img.height;
        this.rotate = 0;
        this.image = img;
        this.ctx = Game.ctx; 
	}

	setScale(num) {
		this.scale = num;
		this.width = this.image.width * this.scale;
		this.height = this.image.height * this.scale;
	}

	draw() {
		this.ctx.save();
		this.rotate = this.rotate % 360;
		var rad = this.rotate * .01745;

		// this.x = this.x % (800 + (this.image.width*.5));
  //       this.y = this.y % (600 + (this.image.height*.5));


		this.ctx.translate(this.x, this.y); //do converstions before actions
        this.ctx.rotate(rad);
        this.ctx.scale(this.scale, this.scale);
        this.ctx.drawImage(this.image, -(this.image.width * .5), -(this.image.height * .5)); //shifting center of rotation
        this.ctx.restore();

        if (this.x < -(this.width * .5)) {
	    	this.x = 800 + (this.width * .5);
	    }
	    if (this.x > 800 + (this.width * .5)) {
	    	this.x = 0 - (this.width * .5);
	    }
	}
}

class Player extends Sprite {
	constructor(img) {
		super(img);
		//this.speedX = 0;
		//this.speedY = 0;
		this.speed = 3;
	}

	update(){
		if (Key.keys[37] == 1) {
			this.rotate = 270;
	        this.x -= this.speed;
	    } else if (Key.keys[39] == 1) {
	    	this.rotate = 90;
	        this.x += this.speed;
	    } else if (Key.keys[38] == 1) {
	    	this.rotate = 0;
	        this.y -= this.speed;
	    } else if (Key.keys[40] == 1) {
	    	this.rotate = 180;
	        this.y += this.speed;
	    } else {
	    	
	    }

	    if (this.y <= 70) {
	    	this.speed = 0;
	    	Game.state = "over";
	    	console.log("you finished!");
	    }
     	this.draw();
	}
}

class Ant extends Sprite {
	constructor(img) {
		super(img);
		this.speedX = 2;
	}

	update(){
		this.x += this.speedX;
     	this.draw();
	}

}

class Key {

    constructor() {
        Key.keys = []; //why is this Key.keys and not this?
        for(var i = 0; i < 100; i++){ //what is this doing
            Key.keys[i] = 0;
        }

        console.log(Key.keys);
    }

    init() {
        window.addEventListener("keydown", function(e){
        	e.preventDefault();
            Key.keys[e.keyCode] = 1;

        });

        window.addEventListener("keyup", function(e){

            Key.keys[e.keyCode] = 0;
        });
    }
}



