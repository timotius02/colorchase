SafeObstacle = function() {

	//Stuff you always need
	SafeObstacle.superclass.constructor.call(this);
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

SafeObstacle.prototype = {


	setup : function(params) 
	{
		this.DetermineObstacleType(params, params.type);
		this.mGame = params.gameScreen;
		SafeObstacle.superclass.setup.call(this, params);
		this.cullToViewport(false, false, false, true);
		return this;
	},
	
	DetermineObstacleType : function(params, type) 
	{
		// Ceiling pulley
		if (type == 1) {  								
			params.image = "stationary_obstacle_1";
			//params.worldY = 400;
				params.worldY = 400;
		}	
		
		// Pile of bolts
		else if (type == 2) {  							
			//params.image = "stationary_obstacle_2";
			//params.worldY = 0;
				//params.worldY = 400;
		}

		else if (type == 3) {//						
			//params.image = "stationary_obstacle_3";
			//params.worldY = 0;
				//params.worldY = 200;
		}
		
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
	}


}

extend(SafeObstacle, TGE.Sprite);
