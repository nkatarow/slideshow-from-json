/*

    Main JavaScript
    VERSION 0.0.1
    AUTHORS: Nick Katarow

    DEPENDENCIES:
    - jQuery 1.7.2

    TO DO:
    - AJAX Failure Method
*/

var IS = window.IS || {};

window.IS = {
    init: function () {
        var self = this,
            current = 0,
            container = $('.main'),
            slideshowData = '/assets/json/test.json',
            queue = self.getImages(slideshowData);

        // Set main container height equal to window height, cause, it's dumb
        container.height($( window ).height());

        // Start looping through the array
        self.photoLoop(queue, current);
    }, // END init

    getImages: function (slideshowData) {
        var queue = [],
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

    imgEmbed: function (imgURL) {
        $('#slideshow').append('<li><img src="' + imgURL + '"></li>');
    }, // END imgEmbed

    photoLoop: function (queue, current) {
        var self = this;

        console.log(current);

        // If the list already has items in it...
        if ($('#slideshow').children('li').length) {

            if (current < queue.length - 1) {

                current++;

            // If we're the last image
            } else if (current === queue.length - 1) {

                current = 0;

            } else {
                console.log('This shouldn\'t even happen... WTF');
            }

            $("#slideshow li:first-child img").fadeOut( 1300, function() {
                self.removePhoto($('#slideshow li:first-child'), queue, current);

                // Embeds next image in queue to the bottom of the list
                self.imgEmbed(queue[current]);
            });

            $("#slideshow li:nth-child(2) img").fadeIn( 1300 );

            setTimeout (function(){
                self.photoLoop(queue, current);
            }, 10000);


        } else {
            self.imgEmbed(queue[0]);
            self.imgEmbed(queue[1]);

            $("#slideshow li:first-child img").fadeIn( 1300, function(){} );

            current++;

            setTimeout (function(){
                self.photoLoop(queue, current);
            }, 10000);
        }
    }, // END photoLoop

    removePhoto: function (currentImg, queue, current) {
        var self = this;

        currentImg.remove();
    } // END transition
};