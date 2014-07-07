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

        {id:'blue',     url:'colorwords/blue.png'},
        {id:'green',    url:'colorwords/green.png'},
        {id:'pink',     url:'colorwords/pink.png'},
        {id:'white',    url:'colorwords/white.png'},
        {id:'yellow',   url:'colorwords/yellow.png'},
        {id:'red',      url:'colorwords/red.png'},
        {id:'orange',   url:'colorwords/orange.png'},
        {id:'purple',   url:'colorwords/purple.png'},



        //Moving Obstacles
        {id:'moving_obstacle_A', 		url:'movingObstacles/moving_obstacle_A.png'},
        {id:'moving_obstacle_B', 		url:'movingObstacles/moving_obstacle_B.png'},
        {id:'moving_obstacle_C',        url:'movingObstacles/rocket.png'},
        
        
        
        //Player pieces
        {id:'player_running',   		url:'player/player_running.png'},

        // Backgrounds
        {id:'startscreen_background',   url:'screens/startscreen.png'},
        {id:'endscreen_background',   	url:'screens/endscreen.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen.png'},
        {id:'introscreen',            url:'screens/introscreen.png'},
        {id:'credits_screen',           url:'screens/credits.png'},       
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
        {id:'background_music',			url:'sounds/background_music.ogg',		backup_url:'sounds/background_music.mp3',      assetType:"audio"},
        {id:'hitObstacle_sound',		url:'sounds/laser.ogg',		            backup_url:'sounds/laser.mp3',                 assetType:"audio"},
        {id:'hitCoin_sound',			url:'sounds/blop.ogg',			        backup_url:'sounds/blop.mp3',                  assetType:"audio"} 
      ]);

    TGE.FirstGameWindow = StartScreen;
    
};

extend(Runner,TGE.Game);

