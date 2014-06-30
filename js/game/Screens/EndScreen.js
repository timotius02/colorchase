EndScreen = function() {
    EndScreen.superclass.constructor.apply(this, arguments);
    
    // Background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
        image: "endscreen_background",
    }));
    
    // Display final score
    this.addChild(this.coinDisplay = new TGE.Text().setup({
        x : this.percentageOfWidth(0.33),
        y : this.percentageOfHeight(0.54),
        font : "60px Tahoma",
        color: "white"
    }));
    
    // Try Again button
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.17),
        y : this.percentageOfHeight(0.75),
        scale: .5,
        image: "playagain_button",
        pressFunction : this.PlayAgain.bind(this)
    }));
    //credits
    this.addChild(new TGE.Button().setup({
        x : this.percentageOfWidth(0.4),
        y : this.percentageOfHeight(0.75),
        scale: .5,
        image: "credits_button",
        pressFunction : this.credits.bind(this)
    }));

    
    return this;
}

EndScreen.prototype = {

	setup : function(params) {
		EndScreen.superclass.setup.call(this, params);

		// Update final totals
		this.coinDisplay.text = params.coins.toString();

            // TGS Game Over Widget
        this.widget = TGS.Widget.CreateWidget({
            x: this.percentageOfWidth(0.6),
            y: this.percentageOfHeight(0.15),
            shareImage: 'http://i1292.photobucket.com/albums/b561/Timotius_Sitorus/940x408_zps1b18df93.png',
            shareMessage: "I just scored " + this.coinDisplay.text + " on ColorChase!",
            closeCallback: this.onClose.bind(this)
        });

       return this;
   },

    onClose :function(){
        this.transitionToWindow({
            windowClass : StartScreen,
            fadeTime : 0.75
        });      
    },

    PlayAgain : function() {

        if (this.widget != null && typeof this.widget !== "undefined"){
            this.widget.close();
        }

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
            shareImage: 'http://i1292.photobucket.com/albums/b561/Timotius_Sitorus/940x408_zps1b18df93.png',
            shareMessage: "I just scored " + this.coinDisplay.text + " on ColorChase!",
            closeCallback: this.onClose.bind(this)
        });

    }
}


extend(EndScreen, TGE.Window);
