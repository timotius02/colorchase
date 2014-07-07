GameScreen = function(width, height) {
	GameScreen.superclass.constructor.apply(this, arguments);

	//Stats
	this.mDistance = 0;
	this.mCoins = 0;
	this.name = "game";
	
	//Level stuff
	this.mEventTimer = 0;
	this.mEventIndex = 0;
	this.mLastCoin = 0;
	this.mLastObstacle = 0;
	this.mPlaying = true;

	//Coin generation parameters
	this.mCoinFrequency = 0;
	this.mCoinHeight = this.height / 2;
	this.mCoinWaveAmplitude = 0;
	this.mCoinWaveFrequency = 0;
	this.mCoinWaveTimer = 0;

	//Obstacle generation parameters
	this.mObstacleFrequency = 0;
	this.mObstaclePattern = "";
	this.mObstaclePatternIndex = 0;

	// Event listeners
	this.addEventListener("update", this.Update.bind(this));
	this.addEventListener("mousedown", this.MouseDown.bind(this));
	this.addEventListener("mouseup", this.MouseUp.bind(this));

	//CUSTOM
	this.colors = ["blue", "green", "pink", "yellow", "red", "white", "orange", "purple"];
	
	this.music = 1;

	this.currKey = "None";
	this.pauseSpeed = 0;
	this.pauseGravitySpeed = 0;
	this.wave = 1;
	this.curwave = 1;
};

GameScreen.prototype = {

	setup : function() {
		
		//Setup camera
		TGE.Game.GetInstance().mCameraLocation = new TGE.Point();

		//Setup layers
		this.addChild(this.artLayer = new TGE.DisplayObjectContainer().setup({}));
		this.addChild(this.coinLayer = new TGE.DisplayObjectContainer().setup({}));
		this.addChild(this.obstacleLayer = new TGE.DisplayObjectContainer().setup({}));
		this.addChild(this.UILayer = new TGE.DisplayObjectContainer().setup({}));
		
		//Setup parallax planes
		this.SetupParallaxingPlanes();
		
		//Add distance display & coin display
		this.SetupHud();
		
		//Setup player
		this.addChild(this.mPlayer = this.addChild(new Player().setup({
			x : this.percentageOfWidth(0.5),
			y : this.percentageOfHeight(0.5),
			gameScreen : this
		})));
		
		//Play background music
		TGE.Game.GetInstance().audioManager.Play({ 
			id:'background_music', 
			loop:true 
		});
	},

	Update : function(event) {

		if (!this.mPlaying) return;
		
		//Move Camera
		TGE.Game.GetInstance().mCameraLocation.y = 180;
		TGE.Game.GetInstance().mCameraLocation.x = this.mPlayer.worldX + 300;

		// Update the distance and coin displays
		this.coinDisplay.text = "Score: " + Math.floor(this.mCoins).toString();

		// Read & make level
		this.ReadNextEvent(event.elapsedTime);
		this.SpawnObstacles(event.elapsedTime);
		this.SpawnCoins(event.elapsedTime);
	},
	
	ReadNextEvent : function(elapsedTime) {

		this.mEventTimer += elapsedTime;
		var nextEvent = level[this.mEventIndex];
		if (nextEvent != null) {
			
			// starting a new segment of events?
			if (nextEvent.begin_segment != null) {
				this.mEventTimer = 0;
				this.mEventIndex++;
				this.mCoinFrequency = 0;
				this.mObstacleFrequency = 0;
			}
			
			// setting player's speed?
			else if (nextEvent.player_speed != null) {
				this.mPlayer.SetSpeed(nextEvent.player_speed);
				this.mEventIndex++;
			} 
			
			// setting fall speed?
			else if (nextEvent.fall_speed != null) {
				this.mPlayer.SetFallSpeed(nextEvent.fall_speed);
				this.mEventIndex++;
			}
			
			// setting boost speed?
			else if (nextEvent.boost_speed != null) {
				this.mPlayer.SetBoostSpeed(nextEvent.boost_speed);
				this.mEventIndex++;
			}
			
			// making an event?
			else if (this.mEventTimer >= nextEvent.time) {

				// setting coin frequency?
				if (nextEvent.event == "coin_frequency") {
					this.mCoinFrequency = nextEvent.value;
				}
				
				// setting the coin height?
				else if (nextEvent.event == "coin_height") {
					this.mCoinHeight = this.height * nextEvent.value;
				}
				
				// starting a coin sine wave?
				else if (nextEvent.event == "coin_sinewave") {
					this.mCoinWaveAmplitude = nextEvent.amplitude;
					this.mCoinWaveFrequency = nextEvent.amplitude == 0 ? 0 : nextEvent.frequency;
					this.mCoinWaveTimer = 0;
				}
				
				// making a coin box?
				else if (nextEvent.event == "coin_box"){
					this.GenerateCoinBox(nextEvent.size);
				}
				
				// setting the obstacle frequency?
				else if (nextEvent.event == "obstacle_frequency") {
					this.mObstacleFrequency = nextEvent.value;
					this.mLastObstacle = this.mPlayer.worldX;
				}
				
				// feeding in an obstacle pattern?
				else if (nextEvent.event == "obstacle_pattern") {
					this.mObstaclePattern = nextEvent.value;
					this.mObstaclePatternIndex = 0;
				}
				
				// displaying nothing?
				else if (nextEvent.event == "nothing") {
					this.mCoinFrequency = 0;
					this.mObstacleFrequency = 0;
				}

				else if (nextEvent.event == "random2") {
					this.spawnColors();
				}
				
				// ending game?
				else if (nextEvent.event == "game_finished") {
					//this.EndGame();

					this.mEventIndex = 3;
					//acceleration
					this.mPlayer.mHorizontalSpeed = this.mPlayer.mHorizontalSpeed * 1.01;
				}

				this.mEventIndex++;
			}
		}
	},

	SpawnObstacles : function(elapsedTime) {
		
		var playerX = this.mPlayer.worldX;
		
		if (this.mObstacleFrequency == 0) {
			this.mLastObstacle = playerX;
		} 
		
		// If it's time for another obstacle
		if ((this.mPlayer.worldX - this.mLastObstacle) > this.mObstacleFrequency) {

			var typeNum = -1;
			var typeChar = "";
			
			// Determine type of obstacle
			if (this.mObstaclePattern.charAt(this.mObstaclePatternIndex) != "X") {
				
				typeNum = this.mObstaclePattern.charCodeAt(this.mObstaclePatternIndex) - 48;
				typeChar = this.mObstaclePattern.charAt(this.mObstaclePatternIndex);
				this.mObstaclePatternIndex++;
			}

			if (typeNum > 0) {
				
				// If its a number, spawn a stationary obstacle
				if (typeNum <= 9) {
					this.obstacleLayer.addChild(new StationaryObstacle().setup({
						worldX : this.mPlayer.worldX + this.percentageOfWidth(1) * 2,
						type : typeNum,
						gameScreen : this
					}));
				} 
				
				// If its a letter, spawn a moving obstacle
				else {
					this.obstacleLayer.addChild(new MovingObstacle().setup({
						ox : this.mPlayer.worldX + this.percentageOfWidth(1) * 2,
						type : typeChar,
						gameScreen : this
					}));
				}
			}

			this.mLastObstacle = this.mPlayer.worldX;
		}
	},

	spawnColors: function(){
		var numCoins = 8;

		var num = Math.floor(Math.random()*numCoins);
		this.currKey = this.colors[num];

		var notCorrect1 = notCorrect2 = 0;

		do {
			notCorrect1 = Math.floor(Math.random() * numCoins);
			notCorrect2 = Math.floor(Math.random() * numCoins);
		} while (num === notCorrect1 || num === notCorrect2 || notCorrect1 === notCorrect2);



		var heights = [50, 225, 400];

		function shuffle(o){ //v1.0
	    	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    	return o;
		};

		function genRandInt(a, b){
			var ret = Math.floor(Math.random() * (a - b));
			return ret + b;
		}

		heights = shuffle(heights);

		

		this.obstacleLayer.addChild(new ColorWord().setup({
			worldX : this.mPlayer.worldX + this.percentageOfWidth(1) * 2 + -600,
			worldY: -60,
			image :this.colors[num],
			gameScreen : this
		}));

		this.obstacleLayer.addChild(new SafeObstacle().setup({
			worldX : this.mPlayer.worldX + this.percentageOfWidth(1) * 2 + genRandInt(-250, 250),
			instanceName: "right" + this.wave,
			type : "2",
			worldY: heights[0],
			image :"stationary_obstacle_"+ (++num),
			gameScreen : this
		}));
		this.obstacleLayer.addChild(new StationaryObstacle().setup({
			worldX : this.mPlayer.worldX + this.percentageOfWidth(1) * 2 + genRandInt(-250, 250),
			instanceName: "wrong1",
			type : "2",
			worldY: heights[1],
			image :"stationary_obstacle_" + (++notCorrect1),
			gameScreen : this
		}));

		this.obstacleLayer.addChild(new StationaryObstacle().setup({
			worldX : this.mPlayer.worldX + this.percentageOfWidth(1) * 2 + genRandInt(-250, 250),
			instanceName: "wrong2",
			type : "2",
			worldY: heights[2],
			image :"stationary_obstacle_" + (++notCorrect2),
			gameScreen : this
		}));

		this.wave++;

	},

	SpawnCoins : function(elapsedTime) {

		var x = this.mPlayer.worldX;
		if (this.mCoinFrequency == 0) {
			this.mLastCoin = x;
		} 
		else if ((x - this.mLastCoin) > this.mCoinFrequency) {
			// Create it
			var extra = (x - this.mLastCoin) - this.mCoinFrequency;
			var cx = x - extra;
			var cy = this.mCoinHeight + Math.sin(this.mCoinWaveTimer * this.mCoinWaveFrequency) * this.mCoinWaveAmplitude;
			
			this.coinLayer.addChild(new Coin().setup({
				worldX : cx + this.width * 2,
				worldY : cy,
				gameScreen : this
			}));

			this.mLastCoin = cx;
		}

		this.mCoinWaveTimer += elapsedTime;
	},
	
	GenerateCoinBox: function(size){
		var size = Math.max(2,size);


        // Define the origin position
        var ox = this.mPlayer.worldX + this.width * 2;
        var oy = this.mCoinHeight;

        var coinSize = 56;
        var cx = ox - (coinSize * size) / 2;
        var cy = oy - (coinSize * size) / 2;    

    	// Make the matrix of coins
    	for(var y = 0; y < size; y++)
    	{
    		cx = ox - (coinSize * size) / 2;
    		for(var x = 0; x < size; x++)
    		{
    			this.coinLayer.addChild(new Coin().setup({
    				worldX : cx + this.width * 2,
    				worldY : cy,
    				image: "coin",
    				gameScreen : this
    			}));

    			cx += coinSize;
    		}
    		cy += coinSize;
    	}
    },

    EndGame : function() {

		// Stop sound
		TGE.Game.GetInstance().audioManager.StopAll();


		this.transitionToWindow({
			windowClass : EndScreen,
			fadeTime : 1.25,
			score : Math.floor(this.GetScore()),
			coins : Math.floor(this.mCoins),
			distance : Math.floor(this.mDistance),
		});
	},
	
	SetupParallaxingPlanes : function() {

		//Middle ground plane
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_middleground",
			worldY : 448,
			trackingSpeed : 0.25 
		}));
		
	},
	
	SetupHud : function() {
		//Text that displays coins collected
		this.coinDisplay = this.UILayer.addChild(new TGE.Text().setup({
			x : 90,
			y : 30,
			text : "Score: 0",
			font : "40px Comfortaa",
			color : "white"
		}));
		
			    		    //pause button
	    this.addChild(new TGE.Button().setup({
	        x : this.percentageOfWidth(0.1),
	        y : this.percentageOfHeight(0.95),
	        scale: 1.3,
	        image: "pause_button",
	        pressFunction : this.pause.bind(this)

	    }));

		this.buttonSprite2 = this.addChild(new TGE.SpriteSheetAnimation().setup({
			image : "mute_button",
			rows : 1,
			columns : 2,
			totalFrames : 2,
			fps : 0,
			looping : false,
			visible : true,
			x : this.percentageOfWidth(0.03),
			y : this.percentageOfHeight(0.95),
			scale: 1.3
		}));


	    //mute button
	    this.addChild(new TGE.Button().setup({
	        x : this.percentageOfWidth(0.03),
	        y : this.percentageOfHeight(0.95),
	        width: this.buttonSprite2.width,
	        height: this.buttonSprite2.height,
	        alpha: 0,
	        pressFunction : this.muteSound.bind(this)

	    }));


	},

	PlayerHitCoin : function(params) 
	{
		//Play sound
		TGE.Game.GetInstance().audioManager.Play({
			id : 'hitCoin_sound',
			loop : false
		});

		this.obstacleLayer.removeChildByName("right"+this.curwave);
		this.curwave++;

		//Increase coins
		this.mCoins += 1;
	},
	
	PlayerHitObstacle : function() 
	{
		TGE.Game.GetInstance().audioManager.StopAll();

	 	this.mPlayer.animArray["run"].stop();


	 	for(var i =0; i < this.obstacleLayer.numChildren(); i++){
			this.obstacleLayer.getChildAt(i).removeEventListenersFor("update");
	 	}

		//Play sound
		TGE.Game.GetInstance().audioManager.Play({
			id : 'hitObstacle_sound',
			loop : false
		});

		//End game

		setTimeout(function(){
			this.EndGame();
		}.bind(this), 1000);
	},
	
	GetScore : function() {
		if (this.mCoins == 0) return Math.floor(this.mDistance);

		//Score is distance * coins
		else return Math.floor((this.mDistance * this.mCoins));
	},
	
	IncPlayerDistance : function(pixels) { this.mDistance += pixels / 100; },
	GetPlayer : function() { return this.mPlayer; },
	MouseDown : function() { this.mousedown = true; },
	MouseUp : function() { this.mousedown = false; },
    muteSound : function(){
        if(this.music){
            this.buttonSprite2.gotoAndStop(1);
            TGE.Game.GetInstance().audioManager.Mute();
            this.music = 0;
        }
        else{
            this.buttonSprite2.gotoAndStop(0);  
            TGE.Game.GetInstance().audioManager.Unmute();
            this.music = 1;
        }
        
    },
	pause: function(){
		if(this.mPlayer.mHorizontalSpeed != 0){
			this.mousedown = false;

			TGE.Game.GetInstance().audioManager.Mute();

	 		this.obstacleLayer.getChildByName("right" + this.curwave).removeEventListenersFor("update");
	 		this.obstacleLayer.getChildByName("wrong1").removeEventListenersFor("update");
			this.obstacleLayer.getChildByName("wrong2").removeEventListenersFor("update");

	 		this.pauseSpeed = this.mPlayer.mHorizontalSpeed;
	 		this.pauseGravitySpeed = this.mPlayer.mVerticalSpeed;

	 		this.mPlayer.mHorizontalSpeed = 0;
	 		this.mPlayer.mVerticalSpeed = 0;

	 		this.mPlayer.mGroundHeight = this.mPlayer.worldY;


	 		this.clearEventListeners();

	 		this.mPlayer.animArray["run"].stop();
	 		this.addChild(new TGE.Sprite().setup({
            	x : this.percentageOfWidth(0.5),
            	y : this.percentageOfHeight(0.5),
            	instanceName: "pause_screen",
            	image: "pause_screen"
        	}));

        	this.addChild(new TGE.Button().setup({
		        x : this.percentageOfWidth(0.5),
		        y : this.percentageOfHeight(0.5),
		        width: this.percentageOfWidth(1),
		        height: this.percentageOfHeight(1),
		        alpha: 0,
		        pressFunction : this.unpause.bind(this),
		        instanceName: "unpause_button",

		    }));
		}
	},
	unpause: function(){
		
		this.removeChildByName(["pause_screen", "unpause_button"]);
		this.mPlayer.animArray["run"].play();

		TGE.Game.GetInstance().audioManager.Unmute();
		this.mPlayer.mGroundHeight = 65;

		this.obstacleLayer.getChildByName("right"+ this.curwave).addEventListener("update", this.obstacleLayer.getChildByName("right"+this.curwave).DetectCollisions);
		this.obstacleLayer.getChildByName("wrong1").addEventListener("update", this.obstacleLayer.getChildByName("wrong1").DetectCollisions);
		this.obstacleLayer.getChildByName("wrong2").addEventListener("update", this.obstacleLayer.getChildByName("wrong2").DetectCollisions);
		this.mPlayer.mVerticalSpeed = this.pauseGravitySpeed;

			// Event listeners
		this.addEventListener("update", this.Update.bind(this));
		this.addEventListener("mousedown", this.MouseDown.bind(this));
		this.addEventListener("mouseup", this.MouseUp.bind(this));

		this.mPlayer.mHorizontalSpeed = this.pauseSpeed;

	}
}
extend(GameScreen, TGE.Window);
