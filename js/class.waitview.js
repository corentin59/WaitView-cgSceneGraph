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
 * Waitview
 * @class WebView
 * @type {Object}
 * @extends CGSGNode
 * @type {WebView}
 * @author Corentin Azelart (corentin.azelart@capgemini.com)
 */
var WaitView = CGSGNodeSquare.extend(
    {
        /**
         * Construct a new wait view.
         * @constructor
         * @param parent is the parent node
         */
        initialize: function (color, alpha) {
            this._super(0, 0);

            /**
             * The parent node.
             * @property
             * @type {CGSGNode}
             */
            this.target;

            /**
            * The message.
            * @property
            * @type {CGSGNodeText}
            */
            this.message;

            /**
             * An image or picture (not animated).
             * @property
             * @type {CGSGNodeImage}
             */
            this.image;

            this.color = color;
            this.globalAlpha = alpha;

            //this.isVisible = false;
        },

        /**
         * Show the wait view.
         * @param text is a optional text
         */
        show: function(text) {
            // Check if target is here ?
            if(!cgsgExist(this.target)) {
                throw "Set target before";
            }

            // Cover the target
            this.translateTo(0, 0, true);
            this.resizeTo(this.target.getWidth(), this.target.getHeight());

            if(cgsgExist(text)) {
                this.setText(text);
            }

            // Display !
            this.isVisible = true;
            this.isTraversable = true;
        },

        /**
         * Hide waitview.
         * @function
         * @public
         */
        hide: function() {
            this.isVisible = false;
            this.isTraversable = false;
        },

        /**
         * Set the target.
         * @param {CGSGNode} target is parent node target.
         */
        setTarget: function(target) {
            this.target = target;
            CGSG.sceneGraph.addNode(this, this.target);
        },

        /**
         * Set a text.
         * @param {String} text is the text
         * @param {String} typo is the typo
         */
        setText: function(text, typo) {
            if(!cgsgExist(this.message)) {
                this.message = new CGSGNodeText(0, 0, text, true);
                this.message.color = '#FFF';
                this.addChild(this.message);
            }

            // Set typography
            if(cgsgExist(typo)) {
                this.setTextTypo(typo);
            }

            this.message.setText(text, true);
            this.message.translateTo((this.target.getWidth() / 2) - (this.message.getWidth() / 2), (this.target.getHeight() / 2) - this.message.getHeight(), true);
            this.message.resizeTo(this.target.getWidth(), this.message.getHeight());
        },

        /**
         * Set text color
         * @param {String} color is the color
         */
        setTextColor: function(color) {
            if(!cgsgExist(this.message)) {
                throw "Call setText before";
            }

            this.message.color = color;
        },

        /**
         * Set text typo
         * @param {String} typo is the typo
         */
        setTextTypo: function(typo) {
            if(!cgsgExist(typo)) {
                throw "Call setText before";
            }

            this.message.setTypo(typo, true);
        },

        /**
         * Set an image.
         * @param imageURI is the image URI.
         */
        setImage: function(imageURI) {
            if(!cgsgExist(this.target)) {
                throw "Call setTarget before";
            }

            if(!cgsgExist(this.image)) {
                this.image = new CGSGNodeImage(0, 0, imageURI);
                this.image.onLoadEnd = function () {
                    this.addChild(this.image);
                    this.image.translateTo((this.target.getWidth() / 2) - (this.image.getWidth() / 2), (this.target.getHeight() / 2) - this.image.getHeight() - 30, true)
                }.bind(this);
            }

            if(!cgsgExist(imageURI)) {
                this.image.isVisible = false;
            }

        }
    }
);