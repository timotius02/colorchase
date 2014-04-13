StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    
    //background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
        image: "startscreen_background",
    }));
    
    var self = this;

    this.buttonSprite = this.addChild(new TGE.SpriteSheetAnimation().setup({
        image : "play_button",
        rows : 1,
        columns : 2,
        totalFrames : 2,
        fps : 10,
        looping : true,
        visible : true,
        x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.73)
    }));
    //play button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.73),
        alpha: 0,
        pressFunction : this.gotoGameScreen.bind(this),

    }));

    this.buttonSprite.gotoAndPlay(0);

    //Play sound
    TGE.Game.GetInstance().audioManager.Play({
        id : 'pacman_music',
        loop : '1'
    });
}


StartScreen.prototype = {

	gotoGameScreen : function() {

        TGE.Game.GetInstance().audioManager.StopAll();


        //go to game
		this.transitionToWindow({
			windowClass : GameScreen,
			fadeTime : 0.75
		});


	}
	
}

extend(StartScreen, TGE.Window);