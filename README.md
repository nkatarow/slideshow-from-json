slideshow-from-json
===================

**Basic slideshow that pulls data from json file(s).**

##Author
Nick Katarow (<http://github.com/nkatarow>)

##Dependencies
- jQuery 1.7.2

##Required Markup 

A simple container identifiable by class or ID wrapping an unordered list with the class of "slideshow".

	<section id="primary">
	    <ul class="slideshow"></ul>
	</section>
	
##Instantiation
The script has three options that you can change by instantiating with an options object. 

- container - The wrapper for your slideshow. Default: '#primary'
- slideshowData - The path to your JSON file in quotes. Default: '/assets/json/test.json'
- delay - The amount of time you want each image displayed between transitions (in milliseconds). Default: 10000  


###Using Default Options

	$(document).ready(function () {
		window.mySlideshow = new SSFJ.Slideshow();
	}); 
	

###Setting Custom Options

    $(document).ready(function () {
        window.mySecondSlideshow = new SSFJ.Slideshow({
            container: '#secondary',
            slideshowData: 'assets/json/test-two.json',
            delay: 13000
        });
    });
