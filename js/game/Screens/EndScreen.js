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
        x : this.percentageOfWidth(0.33),
        y : this.percentageOfHeight(0.54),
        font : "60px Tahoma",
        color: "white"
    }));
    
    // Try Again button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.2),
        y : this.percentageOfHeight(0.8),
        scale: .7,
        image: "playagain_button",
        pressFunction : this.PlayAgain.bind(this),
    }));

    // TGS Game Over Widget
    this.widget = TGS.Widget.CreateWidget({
        x: this.percentageOfWidth(0.6),
        y: this.percentageOfHeight(0.15),
        shareMessage: "I just scored " + this.coinDisplay + " on ColorChase!"
    });
    
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
    if (this.widget != null && typeof this.widget !== "undefined"){
        this.widget.close();
    }

    this.transitionToWindow({
       windowClass : GameScreen,
       fadeTime : 0.75
   });
}
}


extend(EndScreen, TGE.Window);
