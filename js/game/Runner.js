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

        {id:'blue',    url:'screens/blue.png'},
        {id:'green',    url:'screens/green.png'},
        {id:'pink',    url:'screens/pink.png'},
        {id:'white',    url:'screens/white.png'},
        {id:'yellow',    url:'screens/yellow.png'},
        {id:'red',    url:'screens/red.png'},
        {id:'orange',    url:'screens/orange.png'},
        {id:'purple',    url:'screens/purple.png'},



        //Moving Obstacles
        {id:'moving_obstacle_A', 		url:'movingObstacles/moving_obstacle_A.png'},
        {id:'moving_obstacle_B', 		url:'movingObstacles/moving_obstacle_B.png'},
        {id:'moving_obstacle_C',        url:'movingObstacles/rocket.png'},
        
        
        
        //Player pieces
        {id:'player_running',   		url:'player/player_running.png'},
        {id:'player_flying', 			url:'player/player_flying.png'},

        // Backgrounds
        {id:'startscreen_background',   url:'screens/startscreen.jpg'},
        {id:'endscreen_background',   	url:'screens/endscreen.jpg'},
        {id:'gamescreen_ground',   		url:'screens/blue.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen.jpg'},
        {id:'introscreen_1',            url:'screens/introscreen1.jpg'},
        {id:'introscreen_2',            url:'screens/introscreen2.jpg'},
        {id:'credits_screen',           url:'screens/credits.jpg'},       
        {id:'pause_screen',             url:'screens/pause.png'},       
           
        // Buttons
        {id:'play_button',   			url:'buttons/play_button.png'},
        {id:'playagain_button',   		url:'buttons/playagain_button.png'},
        {id:'pause_button',             url:'buttons/pause.png'},
        {id:'question_button',          url:'buttons/questionmark.png'},
        {id:'mute_button',              url:'buttons/sound.png'},
        {id:'next_button',              url:'buttons/next.png'},
        {id:'credits_button',           url:'buttons/credits_button.png'},
        
        //Sounds
        {id:'background_music',			url:'sounds/background_music.ogg',		backup_url:'sounds/background_music.mp3',   assetType:"audio"},
        {id:'hitObstacle_sound',		url:'sounds/laser.ogg',		            backup_url:'sounds/laser.mp3',              assetType:"audio"},
        {id:'hitCoin_sound',			url:'sounds/blop.ogg',			        backup_url:'sounds/blop.mp3',               assetType:"audio"} 
      ]);

    TGE.FirstGameWindow = StartScreen;
    
};

extend(Runner,TGE.Game);

