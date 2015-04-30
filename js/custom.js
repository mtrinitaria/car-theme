
var jQuery = jQuery.noConflict();

jQuery(document).ready(function() {
	
	 
   jQuery('.fade-in-left').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeft', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.fade-in-right').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated3 fadeInRight', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.fade-in-left2').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 fadeInLeft', // Class to add to the elements when they are visible
    offset: 60
   }); 
   
   jQuery('.fade-in-left-to').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 fadeInLeft', // Class to add to the elements when they are visible
    offset: 70   
   }); 
   
   jQuery('.fade-in-left-to2').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 fadeInLeft', // Class to add to the elements when they are visible
    offset: 90   
   });
   
    
   
   jQuery('.fade-in-left3').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated3 fadeInLeft', // Class to add to the elements when they are visible
    offset: 60    
   }); 
    
	      
   jQuery('.slide-in-left').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated slideInLeft', // Class to add to the elements when they are visible
    offset: 60    
   }); 
	      
   jQuery('.slide-in-right').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated slideInRight', // Class to add to the elements when they are visible
    offset: 60    
   }); 
	      
   jQuery('.bounce-in-up').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated bounceInUp', // Class to add to the elements when they are visible
    offset: 60    
   }); 
	      
   jQuery('.bounce-in').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated bounceIn', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.bounce-in-up-down').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 bounceInDown', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.bounce-in-up-down').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 bounceInDown', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.bounce-in-up-up').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 bounceInUp', // Class to add to the elements when they are visible
    offset: 60    
   }); 
   
   jQuery('.fade-in-up-up').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 fadeInUp', // Class to add to the elements when they are visible
    offset: 60    
   });
   
   jQuery('.fade-in-up-last').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated2 fadeInUp', // Class to add to the elements when they are visible
    offset: 60    
   });
   
  
   
	 
});

jQuery(document).ready(function() {
 
  jQuery("#owl-demo").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
 	  navigation : true,
 	  responsive : true,
 	  autoPlay : false,
 	  navigationText : ['<span class="glyphicon glyphicon-menu-left"></span>', '<span class="glyphicon glyphicon-menu-right"></span>']
  });
 
 
  // Custom Navigation Events
  jQuery(".next").click(function(){
    owl.trigger('owl.next');
  });
  jQuery(".prev").click(function(){
    owl.trigger('owl.prev');
  });
  jQuery(".play").click(function(){
    owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
  });
  jQuery(".stop").click(function(){
    owl.trigger('owl.stop');
  });
 
 
});
