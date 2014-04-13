MovingObstacle = function()
{
    MovingObstacle.superclass.constructor.call(this);

	// Obstacle settings
	this.mBobAmplitude = 0;
	this.mBobFrequency = 0;
	this.mHorizontalSpeed = 0;

	// Boring stuff
	this.hack_num = 0;
	this.mTriggered = false; 
	this.addEventListener("update", this.UpdatePosition.bind(this));
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

MovingObstacle.prototype = {


	setup : function(params) 
	{
		// Determine type of obstacle
		this.DetermineObstacleType(params, params.type); 

		// Set initial position
		this.mGame = params.gameScreen;
    	var hack_extraTime = this.mGame.width/this.mGame.GetPlayer().mHorizontalSpeed;
		params.worldX = params.ox + hack_extraTime * this.mHorizontalSpeed;
		params.worldY = this.mGame.height/3;

		// Boring stuff
		MovingObstacle.superclass.setup.call(this,params);
		this.cullToViewport(false, false, false, true);
		return this;
	},

	DetermineObstacleType : function(params, type) 
	{
		// Drill
		if (type == "A")  						
		{
			params.image = "moving_obstacle_C";
			this.mHorizontalSpeed = 2;
			this.mBobAmplitude = 3;
			this.mBobFrequency = 1.5;
		} 
		
		// Chainsaw
		else if (type == "B")					
		{
			params.image = "moving_obstacle_B";
			this.mHorizontalSpeed = 0.5;
			this.mBobAmplitude = 8;
			this.mBobFrequency = 4;
		}
		
	},

	UpdatePosition : function(event) 
	{
		this.hack_num += 0.04;
		this.worldY += Math.sin(this.hack_num * this.mBobFrequency) * this.mBobAmplitude;
		this.worldX -= this.mHorizontalSpeed;
	},
	
	DetectCollisions : function(event) 
	{
		
		var playerBounds = this.mGame.GetPlayer().getBounds();
    	var obstacleBounds = this.getBounds();
		var obstacleBuffer = 0.7;
		var playerBuffer = 0.5;
		if (!this.mTriggered && obstacleBounds.intersects(playerBounds, obstacleBuffer, playerBuffer)) {
			this.mTriggered = true; 
			this.mGame.GetPlayer().mStopped = true;
			this.mGame.PlayerHitObstacle();
			this.markForRemoval();
		}
	}
	
}

extend(MovingObstacle, TGE.Sprite); 