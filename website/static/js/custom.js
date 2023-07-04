


$(document).ready(function () {
    $('.slide-nav').on('click', function(e) {
        e.preventDefault();
        // get current slide
        var current = $('.flex--active').data('slide'),
          // get button data-slide
          next = $(this).data('slide');
      
        $('.slide-nav').removeClass('active');
        $(this).addClass('active');
      
        if (current === next) {
          return false;
        } else {
          $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
          $('.flex--active').addClass('animate--end');
          setTimeout(function() {
            $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
            $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
          }, 800);
        }
    });

    




  });

  $(window).on("scroll", function() {
   

    if ($("#navbarNav").is(":visible") &&  $(".navbar-toggler").is(":visible")) {
        $('.navbar-toggler').click();
      } else {
        //The Element is NOT visible
      }
    
    if ($(window).scrollTop() >= 50) {
                
        $('#nav-container').addClass('nav-container-white');
        $('#nav-container').removeClass('nav-container-transparent');
        $('#navbarNav > ul > li> a').removeClass( "nav-link-med")
        $('#navbarNav > ul > li> a').addClass( "nav-link-small")
        $('.navbar-brand > img').removeClass( "logo-med")
        $('.navbar-brand > img').addClass( "logo-small")
        
       
    } else {
        $('#nav-container').addClass('nav-container-transparent');
        $('#nav-container').removeClass('nav-container-white');
        $('#navbarNav > ul > li> a').removeClass( "nav-link-small")
        $('#navbarNav > ul > li> a').addClass( "nav-link-med")
        $('.navbar-brand > img').removeClass( "logo-small")
        $('.navbar-brand > img').addClass( "logo-med")
    }
});
