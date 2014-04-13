
Coin = function()
{
	//Coin settings
	this.mPickedUp = false;

	//Boring stuff
    Coin.superclass.constructor.call(this);
    this.addEventListener("update", this.DetectCollisions.bind(this));
    this.useWorldPosition(true);
    this.mGame = null;
    return this;
}

Coin.prototype = {


	setup : function(params) 
	{
		params.image = "coin";
    	this.mGame = params.gameScreen;
    	Coin.superclass.setup.call(this,params);
    	this.cullToViewport(false,false,false,true);
    	return this;
	},


	DetectCollisions : function(event)
	{
		var playerBounds = this.mGame.GetPlayer().getBounds();
		var coinBounds = this.getBounds();
		if (coinBounds.intersects(playerBounds, 0.7, 0.7)) {
			this.mPickedUp = true;
        	this.mGame.PlayerHitCoin({cx:this.worldX,cy:this.worldY});
        	this.markForRemoval();
		}	
	},
	
	
}

extend(Coin, TGE.Sprite);