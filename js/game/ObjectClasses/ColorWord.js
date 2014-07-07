ColorWord = function() {

	//Stuff you always need
	ColorWord.superclass.constructor.call(this);
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

ColorWord.prototype = {


	setup : function(params) 
	{

		this.mGame = params.gameScreen;
		ColorWord.superclass.setup.call(this, params);
		this.cullToViewport(false, false, false, true);
		return this;
	},


	DetectCollisions : function(event){
		var playerBounds = this.mGame.GetPlayer().getBounds();
		var coinBounds = this.getBounds();
		if (coinBounds.intersects(playerBounds, 0.7, 0.7)) {
			this.mPickedUp = true;
        	this.mGame.PlayerHitCoin({cx:this.worldX,cy:this.worldY});
        	this.markForRemoval();
		}
	}


}

extend(ColorWord, TGE.Sprite);
