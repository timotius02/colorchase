StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    
    //background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
        image: "startscreen_background",
    }));

    this.music = 1;

    //         //Play sound
    // TGE.Game.GetInstance().audioManager.Play({
    //     id : 'background_music',
    //     loop : true
    // });

    this.buttonSprite = this.addChild(new TGE.SpriteSheetAnimation().setup({
        image : "play_button",
        rows : 1,
        columns : 2,
        totalFrames : 2,
        fps : 10,
        scale: .7,
        looping : true,
        visible : true,
        x : this.percentageOfWidth(0.49),
        y : this.percentageOfHeight(0.8),    
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
        y : this.percentageOfHeight(0.94),
        scale: 1.3
    }));
        //question button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.96),
        y : this.percentageOfHeight(0.94),
        scale: 1.3,
        image: "question_button",
        pressFunction : this.question.bind(this)
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

    //play button
    this.addChild(new TGE.Button().setup({
        x : this.buttonSprite.x,
        y : this.buttonSprite.y,
        scale: 0.7,
        width: this.buttonSprite.width,
        height: this.buttonSprite.height,
        alpha: 0,
        pressFunction : this.gotoGameScreen.bind(this),
        instanceName: "play_button",

    }));


    this.buttonSprite.gotoAndPlay(0);

}


StartScreen.prototype = {

	gotoGameScreen : function() {

        // TGE.Game.GetInstance().audioManager.StopAll();

        if(TGE.Game.GetInstance().audioManager.isMuted()){
            TGE.Game.GetInstance().audioManager.Unmute();
        }

        //go to game
		this.transitionToWindow({
			windowClass : GameScreen,
			fadeTime : 0.75
		});


	},

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
    question : function(){
        this.getChildByName("play_button").enabled = false;
        this.addChild(new TGE.Sprite().setup({
            x : this.percentageOfWidth(0.5),
            y : this.percentageOfHeight(0.5),
            instanceName: "introscreen_1",
            image: "introscreen_1"
        }));
        this.addChild(new TGE.Button().setup({
            x : this.percentageOfWidth(0.96),
            y : this.percentageOfHeight(0.94),
            scale: 1.3,
            instanceName: "next_button",
            image: "next_button",
        pressFunction : this.question2.bind(this)
        }));
    },

    question2 : function(){
        this.addChild(new TGE.Sprite().setup({
            x : this.percentageOfWidth(0.5),
            y : this.percentageOfHeight(0.5),
            instanceName: "introscreen_2",
            image: "introscreen_2"
        }));
        this.addChild(new TGE.Button().setup({
            x : this.percentageOfWidth(0.96),
            y : this.percentageOfHeight(0.94),
            scale: 1.3,
            instanceName: "next_button2",
            image: "next_button",
        pressFunction : this.clearInstruct.bind(this)
        }));
    },
    clearInstruct: function(){
        this.removeChildByName(["introscreen_1", "introscreen_2", "next_button", "next_button2"]);
        this.getChildByName("play_button").enabled = true;
    }
	
}

extend(StartScreen, TGE.Window);