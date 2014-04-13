EndScreen = function() {
    EndScreen.superclass.constructor.apply(this, arguments);
    
    // Background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
    	image: "endscreen_background",
    }));
    
 //    // Display distance traveled
	// this.addChild(this.distanceDisplay = new TGE.Text().setup({
 //        x : this.percentageOfWidth(0.9),
 //        y : this.percentageOfHeight(0.25),
 //        font : "Tahoma 20px",
 //    }));
    
 //    // Display coins earned
	// this.addChild(this.coinDisplay = new TGE.Text().setup({
 //        x : this.percentageOfWidth(0.9),
 //        y : this.percentageOfHeight(0.32),
 //        font : "Tahoma 20px",
 //    }));
    
    // Display final score
    this.addChild(this.coinDisplay = new TGE.Text().setup({
        x : this.percentageOfWidth(0.68),
        y : this.percentageOfHeight(0.62),
        font : "60px Tahoma",
        color: "white"
    }));
    
    // Try Again button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.78),
        scale: .7,
        image: "playagain_button",
        pressFunction : this.PlayAgain.bind(this),
    }));
    
    return this;
}



EndScreen.prototype = {

	setup : function(params) {
		EndScreen.superclass.setup.call(this, params);

		// Update final totals
		//this.coinDisplay.text = params.coins.toString();
		//this.distanceDisplay.text = params.distance.toString();
		this.coinDisplay.text = params.coins.toString();
	    
	    return this;
	},

	PlayAgain : function() {
	    this.transitionToWindow({
	        windowClass : GameScreen,
	        fadeTime : 0.75
	    });
	}
}


extend(EndScreen, TGE.Window);
