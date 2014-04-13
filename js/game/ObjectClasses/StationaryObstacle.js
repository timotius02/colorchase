StationaryObstacle = function() {

	//Stuff you always need
	StationaryObstacle.superclass.constructor.call(this);
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

StationaryObstacle.prototype = {


	setup : function(params) 
	{
		this.DetermineObstacleType(params, params.type);
		this.mGame = params.gameScreen;
		StationaryObstacle.superclass.setup.call(this, params);
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
		
			var obstacleBuffer = 0.7;
			var playerBuffer = 0.7;
			var playerBounds = this.mGame.GetPlayer().getBounds();
			var obstacleBounds = this.getBounds();
			if (obstacleBounds.intersects(playerBounds, obstacleBuffer, playerBuffer)) {
				this.mGame.GetPlayer().mStopped = true;
				this.mGame.PlayerHitObstacle();
				this.markForRemoval();	
			}	
		
	}


}

extend(StationaryObstacle, TGE.Sprite);
