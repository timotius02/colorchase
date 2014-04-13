StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    
    //background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
    	image: "startscreen_background",
    }));
    
    //play button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.72),
        y : this.percentageOfHeight(0.8),
        image: "play_button",
        pressFunction : this.gotoGameScreen.bind(this),
    }));
  
}


StartScreen.prototype = {

	gotoGameScreen : function() {
		this.transitionToWindow({
			windowClass : GameScreen,
			fadeTime : 0.75
		});
	}
	
}

extend(StartScreen, TGE.Window);