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
        {id:'stationary_obstacle_6',    url:'stationaryObstacles/stationary_obstacle_6.png'},
        {id:'stationary_obstacle_7',    url:'stationaryObstacles/stationary_obstacle_7.png'},
        {id:'stationary_obstacle_8',    url:'stationaryObstacles/stationary_obstacle_8.png'},
        {id:'stationary_obstacle_9',    url:'stationaryObstacles/stationary_obstacle_9.png'},

        {id:'blue',    url:'screens/blue.png'},
        {id:'green',    url:'screens/green.png'},
        {id:'pink',    url:'screens/pink.png'},
        {id:'white',    url:'screens/white.png'},
        {id:'yellow',    url:'screens/yellow.png'},
        {id:'red',    url:'screens/red.png'},
        {id:'grey',    url:'screens/grey.png'},
        {id:'orange',    url:'screens/orange.png'},
        {id:'purple',    url:'screens/purple.png'},



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
        {id:'startscreen_background',   url:'screens/startscreen_background.png'},
        {id:'endscreen_background',   	url:'screens/endscreen_background.png'},
        {id:'gamescreen_ground',   		url:'screens/blue.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen_middleground.png'},
           
        // Buttons
        {id:'play_button',   			url:'buttons/play_button.png'},
        {id:'playagain_button',   		url:'buttons/playagain_button.png'},
        
        //UI
        {id:'distance_ui',   					url:'distance_ui.png'},  
        
        //Sounds
        {id:'background_music',			url:'sounds/background_music.mp3',		assetType:"audio"},
        {id:'hitObstacle_sound',		url:'sounds/hitObstacle_sound.mp3',		assetType:"audio"},
        {id:'hitCoin_sound',			url:'sounds/hitCoin_sound.mp3',			assetType:"audio"}, 
        {id:'pacman_music',            url:'sounds/pacman_music.mp3',         assetType:"audio"}
      ]);

    TGE.FirstGameWindow = StartScreen;
    
};

extend(Runner,TGE.Game);

