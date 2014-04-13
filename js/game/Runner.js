Runner = function()
{
    Runner.superclass.constructor.call(this);

     // load all assets for game
    this.assetManager.addAssets("required",[
        
        //Stationary Obstacles
        {id:'stationary_obstacle_1', 	url:'stationaryObstacles/stationary_obstacle_1.png'},
        {id:'stationary_obstacle_2', 	url:'stationaryObstacles/stationary_obstacle_2.png'},
        {id:'stationary_obstacle_3',    url:'stationaryObstacles/stationary_obstacle_3.png'},
        {id:'stationary_obstacle_4',    url:'stationaryObstacles/stationary_obstacle_4.png'},
        {id:'stationary_obstacle_5',    url:'stationaryObstacles/stationary_obstacle_5.png'},


        //Moving Obstacles
        {id:'moving_obstacle_A', 		url:'movingObstacles/moving_obstacle_A.png'},
        {id:'moving_obstacle_B', 		url:'movingObstacles/moving_obstacle_B.png'},
        {id:'moving_obstacle_C',        url:'movingObstacles/rocket.png'},
        
        //Coins
        {id:'coin',   					url:'coin.png'},
        
        
        //Player pieces
        {id:'player_running',   		url:'player/player_running.png'},
        {id:'player_flying', 			url:'player/player_flying.png'},

        // Backgrounds
        {id:'startscreen_background',   url:'screens/startscreen_background.jpg'},
        {id:'endscreen_background',   	url:'screens/endscreen_background.jpg'},
        {id:'gamescreen_background',   	url:'screens/gamescreen_background.jpg'},
        {id:'gamescreen_ground',   		url:'screens/gamescreen_ground.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen_middleground.png'},
           
        // Buttons
        {id:'play_button',   			url:'buttons/play_button.png'},
        {id:'playagain_button',   		url:'buttons/playagain_button.png'},
        
        //UI
        {id:'distance_ui',   					url:'distance_ui.png'},  
        
        //Sounds
        {id:'background_music',			url:'sounds/background_music.ogg',			backup_url:'sounds/background_music.mp3',		assetType:"audio"},
        {id:'hitObstacle_sound',		url: 'sounds/hitObstacle_sound.ogg',		backup_url:'sounds/hitObstacle_sound.mp3',		assetType:"audio"},
        {id:'hitCoin_sound',			url:'sounds/hitCoin_sound.ogg',				backup_url:'sounds/hitCoin_sound.mp3',			assetType:"audio"}, 
        
      ]);

    TGE.FirstGameWindow = StartScreen;
    
};

extend(Runner,TGE.Game);

