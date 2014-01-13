/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                      Version 2, December 2004
 *
 *
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *      TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */

/**
 * Waitview in action
 * @class CGSGView
 * @type {Object}
 * @author Corentin Azelart (corentin.azelart@capgemini.com)
 */
var CGMain = CGSGView.extend(
    {
        /**
         * Initialize the view.
         * @param canvas is the main canvas
         * @function
         * @public
         */
        initialize: function (canvas) {

            /**
             * The root wait view.
             * @property
             * @type {WebView}
             */
            this._rootWaitView = null;

            /**
             * A normal waitview.
             * @property
             * @type {WebView}
             */
            this._normalWaitView = null;

            /**
             * The blue wait view.
             * @property
             * @type {WebView}
             */
            this._blueWaitView = null;

            this._super(canvas);

            this.createScene();
            this.build();
            this.startPlaying();
        },

        /**
         * Create the scene.
         * @function
         * @private
         */
        createScene: function () {
            this.rootNode = new CGSGNodeSquare(0, 0, CGSG.canvas.width, CGSG.canvas.height);
            this.rootNode.color = "#008C9E";
            this.rootNode.isTraversable = true;
            CGSG.sceneGraph.addNode(this.rootNode, null);
        },

        /**
         * Build the node.
         * @function
         * @private
         */
        build: function () {
            // The square under the wait view.
            this.squareUnderWaitView = new CGSGNodeSquare(100, 100, this.rootNode.getAbsoluteBottom() - 200, this.rootNode.getAbsoluteRight() - 200);
            this.squareUnderWaitView.color = '#00B4CC';
            this.rootNode.addChild(this.squareUnderWaitView);

            // Create Waitview button
            var button = new CGSGNodeButton(50, 40, "LAUNCH A WAITVIEW IN SCENE / ROOT");
            CGSG.eventManager.bindHandler(button, cgsgEventTypes.ON_CLICK, this.launchRootWaitView.bind(this));
            this.squareUnderWaitView.addChild(button);

            // Create Waitview button
            var button = new CGSGNodeButton(50, 80, "LAUNCH A WAITVIEW IN LIGHT BLUE SQUARE");
            CGSG.eventManager.bindHandler(button, cgsgEventTypes.ON_CLICK, this.launchWaitView.bind(this));
            this.squareUnderWaitView.addChild(button);
        },

        /**
         * Launch a Waitview indoor
         * @function
         * @private
         */
        launchWaitView: function() {
            // Create a waitview if is missing
            if(!cgsgExist(this._normalWaitView)) {
                this._normalWaitView = new WaitView('#000', 0.8);
                this._normalWaitView.setTarget(this.squareUnderWaitView);
                this._normalWaitView.setText("Please wait... (3 seconds)...", "Verdana");
                this._normalWaitView.setTextColor('#69D2E7');
                this._normalWaitView.setImage("images/loading.png");
            }

            // Show wait view
            this._normalWaitView.show();

            // Wait 3 seconds
            setTimeout( function(){
                this._normalWaitView.hide();
            }.bind(this), 3000);
        },


        /**
         * Launch a Waitview on root.
         * @function
         * @private
         */
        launchRootWaitView: function() {
            // Create a waitview if is missing
            if(!cgsgExist(this._rootWaitView)) {
                this._rootWaitView = new WaitView('#000', 0.8);
                this._rootWaitView.setTarget(this.rootNode);
                this._rootWaitView.setText("Please wait... (3 seconds)...", "Verdana");
                this._rootWaitView.setTextColor('#69D2E7');
                this._rootWaitView.setImage("images/search.png");
            }

            // Show wait view
            this._rootWaitView.show();

            // Wait 3 seconds
            setTimeout( function(){
                this._rootWaitView.hide();
            }.bind(this), 3000);
        }
    }
);
