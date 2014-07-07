StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    
    //background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
        image: "startscreen_background",
    }));

    this.music = 1;

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

    //play button
    this.addChild(new TGE.Button().setup({
        x : this.buttonSprite.x,
        y : this.buttonSprite.y,
        scale: 0.7,
        width: this.buttonSprite.width,
        height: this.buttonSprite.height,
        alpha: 0,
        pressFunction : this.instruct.bind(this),
        instanceName: "play_button",

    }));


    this.buttonSprite.gotoAndPlay(0);

}


StartScreen.prototype = {

	gotoGameScreen : function() {

        if(TGE.Game.GetInstance().audioManager.isMuted()){
            TGE.Game.GetInstance().audioManager.Unmute();
        }

        //go to game
        this.transitionToWindow({
         windowClass : GameScreen,
         fadeTime : 0.75
     });


    },
    instruct : function(){
        this.addChild(new TGE.Sprite().setup({
            x : this.percentageOfWidth(0.5),
            y : this.percentageOfHeight(0.5),
            instanceName: "introscreen",
            image: "introscreen"
        }));
        this.addChild(new TGE.Button().setup({
            x : this.percentageOfWidth(0.96),
            y : this.percentageOfHeight(0.94),
            scale: 1.3,
            instanceName: "next_button2",
            image: "next_button",
            pressFunction : this.gotoGameScreen.bind(this)
        }));

        this.addChild(new TGE.Button().setup({
            x : this.percentageOfWidth(0.5),
            y : this.percentageOfHeight(0.5),
            width: this.percentageOfWidth(1),
            height: this.percentageOfHeight(1),
            alpha: 0,
            pressFunction : this.gotoGameScreen.bind(this)
        }));
    }
}

extend(StartScreen, TGE.Window);