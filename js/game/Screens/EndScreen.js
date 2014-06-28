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
        scale: .6,
        image: "playagain_button",
        pressFunction : this.PlayAgain.bind(this),
    }));
    //credits
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.45),
        y : this.percentageOfHeight(0.8),
        scale: .6,
        image: "credits_button",
        pressFunction : this.credits.bind(this),
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
           windowClass : StartScreen,
           fadeTime : 0.75
       });
    },

    credits: function(){
        if (this.widget != null && typeof this.widget !== "undefined"){
            this.widget.close();
        }
        this.addChild(new TGE.Sprite().setup({
            x : this.percentageOfWidth(0.5),
            y : this.percentageOfHeight(0.5),
            instanceName: "credits_screen",
            image: "credits_screen"
        }));
        this.addChild(new TGE.Button().setup({
            x : this.percentageOfWidth(0.97),
            y : this.percentageOfHeight(0.95),
            instanceName: "next_button",
            image: "next_button",
        pressFunction : this.back.bind(this)
        }));

    },
    back: function(){

        this.removeChildByName(["credits_screen", "next_button"]);

        this.widget = TGS.Widget.CreateWidget({
            x: this.percentageOfWidth(0.6),
            y: this.percentageOfHeight(0.15),
            shareMessage: "I just scored " + this.coinDisplay + " on ColorChase!"
        });

    }
}


extend(EndScreen, TGE.Window);
