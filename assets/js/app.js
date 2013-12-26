/*

    Main JavaScript
    VERSION 0.0.1
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.7.2

    TO DO:
    - AJAX Failure Method
    - Overwritable defaults config options
    - Find better alternative to setTimeout?
    - Use CSS alternative to fadeIn/Out

*/

var SSFJ = window.SSFJ || {};

window.SSFJ.Slideshow = function (options) {
    var self = this,
        current = 0,
        defaults,
        option;

    defaults = {
        // Set element that list lives inside
        container: '#primary',

        // Location of our JSON
        slideshowData: '/assets/json/test.json'
    };

    for (option in options) {
        defaults[option] = options[option] || defaults [option];
    }

    self.options = defaults;

    // Set up our queue array
    var queue = self.getImages(self.options.slideshowData);

    // Set main container height equal to window height, cause, it's dumb
    $(self.options.container).height($( window ).height());

    // Start looping through the array
    self.photoLoop(queue, current);
}; // END init

window.SSFJ.Slideshow.prototype = {
    getImages: function (slideshowData) {
        var self = this,
            queue = [],
            dataObj;

        // Reach out to JSON and assign data to dataObj variable
        $.ajax({
            url: slideshowData,
            async: false,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                dataObj = data;
            }
        });

        // For every image in object, add URL to queue array
        for (var key in dataObj.data.images) {
            queue.push(dataObj.data.images[key].link);
        }

        return queue;
    }, // END getImages

    photoLoop: function (queue, current) {
        // This is our work horse function that cycles through infinitely
        var self = this;

        // If the list already has items in it...
        if ($(self.options.container + ' .slideshow').children('li').length) {

            // If the counter is less than the total amount of items
            if (current < queue.length - 1) {
                // Just advance the counter
                current++;

            // If we're the last image
            } else if (current === queue.length - 1) {
                // Set counter to 0 so the loop restarts
                current = 0;
            }

            $(self.options.container + ' .slideshow li:first-child img').fadeOut( 1300, function() {
                // Get rid of the now faded out image
                self.removePhoto($(self.options.container + ' .slideshow li:first-child'), queue, current);

                // Embeds next image in queue to the bottom of the list
                self.imgEmbed(queue[current]);
            });

            // Fade in the next image up
            $(self.options.container + ' .slideshow li:nth-child(2) img').fadeIn( 1300 );

            // Wait 'X' amount of time before restarting the loop
            setTimeout (function(){
                self.photoLoop(queue, current);
            }, 10000);

        // Otherwise, get this baby started
        } else {
            // Embed the first two images
            self.imgEmbed(queue[0]);
            self.imgEmbed(queue[1]);

            // Fade in the first one
            $(self.options.container + ' .slideshow li:first-child img').fadeIn( 1300, function(){} );

            // Advance the counter
            current++;

            // Wait 'X' amount of time before restarting the loop
            setTimeout (function(){
                self.photoLoop(queue, current);
            }, 10000);
        }
    }, // END photoLoop

    imgEmbed: function (imgURL) {
        var self = this;

        $(self.options.container + ' .slideshow').append('<li><img src="' + imgURL + '"></li>');
    }, // END imgEmbed

    removePhoto: function (currentImg, queue, current) {
        var self = this;

        currentImg.remove();
    } // END removePhoto
}; // END Slideshow prototype