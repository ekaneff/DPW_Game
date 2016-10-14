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
		Game.ctx = this.screen.getContext("2d");
		this.loadAssets(["grass.png","ant-leftfacing.png", "ant-rightfacing.png", "bug.png"]); 
	}

	init() {
		console.log("Initializing...");

		this.screen.style.background = "url(" + this.images[0].src + ")";
	}
}