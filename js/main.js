(function ($) {
  // USE STRICT
  "use strict";
  
  var js_addcart = $('.js-addcart');
  if (js_addcart) {
    $('.js-addcart').each(function () {
      var nameProduct = $(this).parent().parent().parent().find('.js-name').html();
      $(this).on('click', function (e) {
        e.preventDefault();
        swal(nameProduct, "is added to cart !", "success");
      });
    });
  }


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 900,
    outDuration: 900,
    linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
    loading: true,
    loadingParentElement: 'html',
    loadingClass: 'page-loader',
    loadingInner: '<div class="page-loader__inner"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'html',
    transition: function (url) {
      window.location.href = url;
    }
  });


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  try {
    if ($('.countdown100') !== null) {
      $('.countdown100').each(function () {
        if ($(this).data('year') != null) {
          var year = Number($(this).data('year'));
        }
        else { var year = 0; }

        if ($(this).data('month') != null) {
          var month = Number($(this).data('month'));
        }
        else { var month = 0; }

        if ($(this).data('date') != null) {
          var date = Number($(this).data('date'));
        }
        else { var date = 0; }

        if ($(this).data('hours') != null) {
          var hours = Number($(this).data('hours'));
        }
        else { var hours = 0 }

        if ($(this).data('minutes') != null) {
          var minutes = Number($(this).data('minutes'));
        }
        else { var minutes = 0; }

        if ($(this).data('seconds') != null) {
          var seconds = Number($(this).data('seconds'));
        }
        else { var seconds = 0; }

        if ($(this).data('timezone') != null && $(this).data('timezone') != "auto") {
          var timeZ = $(this).data('timezone');
        }
        else { var timeZ = ""; }


        $(this).countdown100({
          /*Set Endtime here*/
          /*Endtime must be > current time*/
          endtimeYear: year,
          endtimeMonth: month,
          endtimeDate: date,
          endtimeHours: hours,
          endtimeMinutes: minutes,
          endtimeSeconds: seconds,
          timeZone: timeZ
          // ex:  timeZone: "America/New_York"
          //go to " http://momentjs.com/timezone/ " to get timezone
        });
      });
    }


  } catch (er) { console.log(er); }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  try {
    var js_counter = $('.js-counter-up');

    if(js_counter) {
      $('.js-counter-up').counterUp();
    }
      

  } catch (error) {
    console.log(error);
  }



})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  try {
    function initFlowSlider() {
      $('.flipster-slider').each(function (index) {

        var that = $(this);

        var sliderIndex = 'flipster-slider-unique-id-' + index;

        that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);

        var VarKeyboardControl = parseInt(that.attr('data-keyboard'), 10);
        var VarMousewheel = parseInt(that.attr('data-mousewheel'), 10);
        var VarNavButtons = parseInt(that.attr('data-controls'), 10);

        that.flipster({
          style: 'carousel',
          enableKeyboard: VarKeyboardControl || false,
          enableMousewheel: VarMousewheel || false,
          enableNavButtons: VarNavButtons || false
        })
      })
    }


    initFlowSlider();
  } catch (error) {
    console.log(error);
  }



})(jQuery);
(function ($) {
    'use strict';

    /*[ Isotope ]
    ===========================================================*/

    try {

        var $isotopeWrapper = $('.js-isotope-wrapper');

        if ($isotopeWrapper) {
            $isotopeWrapper.each(function () {
                var that = $(this);
                var isotopeFilter = that.find('.isotope-filter');
                var isotopeContent = that.find('.isotope-content');

                // init Isotope
                $(window).on('load', function () {
                    var $iso = isotopeContent.isotope({
                        itemSelector: '.isotope-item',
                        percentPosition: true,
                        animationEngine: 'best-available',
                        masonry: {
                            columnWidth: '.isotope-item-sizer',
                            horizontalOrder: true
                        }
                    });

                });

                isotopeFilter.on('click', 'li span', function () {
                    isotopeContent.isotope({ filter: $(this).attr('data-filter') });
                });

                isotopeFilter.on('click', 'li', function () {
                    isotopeFilter.find('.active').removeClass('active');
                    $(this).addClass('active');
                });
            });
        }


    } catch (err) {
        console.log(err)
    }
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  var isotopeContent = $('#home-creative-grid');

  
  // init Isotope
  var home_cre_intro = $('#home-creative__intro');
  var home_cre_contact = $('#home-creative__contact');
  var item_height = $('#home-creative-grid .grid-sizer > img').height();
  home_cre_intro.css('height', item_height);
  home_cre_contact.css('height', item_height);

  $(window).on('load', function () {

    var $iso = isotopeContent.isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      animationEngine: 'best-available',
      masonry: {
        columnWidth: '.grid-sizer',
        horizontalOrder: true
      }
    });


  });
  $(window).on('resize', function () {
    var item_height = $('#home-creative-grid .grid-sizer > img').height();
    home_cre_intro.css('height', item_height);
    home_cre_contact.css('height', item_height);
  });


  /*ISOTOPE*/
  var $topeContainer = $('#isotope-grid');
  var $filter = $('#filter');

  // filter items on button click
  $filter.each(function () {
    $filter.on('click', 'li span', function () {
      var filterValue = $(this).attr('data-filter');
      $topeContainer.isotope({
        filter: filterValue
      });
    });
    var $buttonGroup = $('#filter');
    $buttonGroup.on('click', 'li', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  // init Isotope
  $(window).on('load', function () {
    var $grid = $topeContainer.each(function () {
      $(this).isotope({
        itemSelector: '.item',
        percentPosition: true,
        animationEngine: 'best-available',
        filter:'.new',
        masonry: {
          columnWidth: '.item'
        }
      });
    });
  });

})(jQuery);
(function ($) {
  'use strict';

  /*[ Revolution ]
  ===========================================================*/

  try {
    var revControl = $('.js-rev');
    if (revControl[0]) {
      revControl.each(function () {
        var that = $(this);
        var option = {
          layout: 'auto',
          arrows: true,
          stylearrow: 'uranus',
          hideonleavearrow: true,
          bullets: true,
          stylebullet: 'hermes',
          hideonleavebullet: false,
          hoffbullet: 0,
          voffbullet: 20,
          spacebullet: 5,
          delay: 5000,
          height: 500,
          noprogressbar: "on",
          thumbnails: false,
          fulloffset: '0px'
        };

        for (var k in option) {
          if (option.hasOwnProperty(k)) {
            if (that.attr('data-rev-' + k) != null) {
              option[k] = that.data('rev-' + k);
            }
          }
        }

        var wW = $(window).width();
        var thumb_option = {
          direction: "vertical",
          valign: "top",
          position: "outer-left",
          space: 10,
          padding: 25
        };


        if (wW < 992) {
          thumb_option = {
            direction: "horizontal",
            valign: "bottom",
            position: "inner-bottom",
            space: 5,
            padding: 10
          }
        }

        that.show().revolution({
          sliderLayout: option.layout,
          responsiveLevels: [1201, 1200, 992, 768, 576],
          visibilityLevels:[1201, 1200, 992, 768, 576],
          gridwidth: [1170, 930, 690, 510, 576],
          gridheight: [option.height, option.height, option.height, option.height],
          delay: option.delay,
          fullScreenOffsetContainer: 'header-mobile',
          fullScreenOffset: option.fulloffset,
          disableProgressBar: option.noprogressbar,
          navigation: {
            onHoverStop: "off",
            arrows: {
              enable: option.arrows,
              style: option.stylearrow,
              hide_onleave: option.hideonleavearrow
            },
            bullets: {
              enable: option.bullets,
              style: option.stylebullet,
              hide_onleave: option.hideonleavebullet,
              h_align: 'center',
              v_align: 'bottom',
              h_offset: option.hoffbullet,
              v_offset: option.voffbullet,
              space: option.spacebullet
            },
            thumbnails: {
              style: "gyges",
              enable: option.thumbnails,
              width: 197,
              height: 136,
              min_width: 140,
              wrapper_padding: thumb_option.padding,
              wrapper_color: "#fff",
              wrapper_opacity: "1",
              tmp: '<span class="tp-thumb-img-wrap"><span class="tp-thumb-image"></span></span>',
              visibleAmount: 7,
              hide_onmobile: true,
              hide_onleave: false,
              direction: thumb_option.direction,
              position: thumb_option.position,
              span: true,
              space: thumb_option.space,
              h_align: "left",
              v_align: thumb_option.valign,
              h_offset: 0,
              v_offset: 0
            }
          }
        });
      });
    }

  } catch (err) {
    console.log(err);
  }


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  try {
    var scroll = $('.fullscreen-section');
    if(scroll[0]) {
      $.scrollify({
        section:".fullscreen-section",
        sectionName:false,
        easing: "linear",
        scrollbars: false,
        scrollSpeed: 500,
        interstitialSection:".header--scrollify,.footer"
      });
    }
    

  } catch (error) {
    console.log(error);
  }
  

  
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  //-------------------------------------------------------
  // Config Slick
  //-------------------------------------------------------

  try {

    var slick_object = $('.js-slick-wrapper');

    slick_object.each(function () {
      var that = $(this);
      var slick_content = that.find('.js-slick-content');

      var arrow_left = that.find('.js-slick-arrow-left');
      var arrow_right = that.find('.js-slick-arrow-right');

      var option = {
        accessibility: true,
        adaptiveheight: false,
        autoplay: false,
        autoplayspeed: 6000,
        arrows: false,
        asnavfor: null,
        appendarrows: $(this),
        appenddots: $(this),
        prevarrow: '<i class="slick-prev"></i>',
        nextarrow: '<i class="slick-next"></i>',
        centermode: false,
        centerpadding: '50px',
        cssease: 'linear',
        dots: false,
        dotsclass: 'slick-dots',
        draggable: false,
        fade: false,
        speed: 5000,
        pauseonhover: false,
        slidetoscroll: 1,
        xl: 1,
        lg: this.xl,
        md: this.lg,
        sm: this.md,
        xs: this.sm,
        vertical: false,
        loop: true,
        thumb: false,
        focusonselect: false,
        swipe: false,
      };

      for (var k in option) {
        if (option.hasOwnProperty(k)) {
          if ($(this).attr('data-slick-' + k) != null) {
            option[k] = $(this).data('slick-' + k);
          }
        }
      }

      slick_content.on('init', function () {
        var $firstAnimatingElements = $('.slide__content .slide-item:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
        textfx();
      });

      if (option.thumb)
        var slickAPI = slick_content.slick({
          accessibility: option.accessibility,
          adaptiveHeight: option.adaptiveheight,
          autoplay: option.autoplay,
          autoplaySpeed: option.autoplayspeed,
          arrows: option.arrows,
          asNavFor: option.asnavfor,
          appendArrows: option.appendarrows,
          appendDots: option.appenddots,
          prevArrow: option.prevarrow,
          nextArrow: option.nextarrow,
          centerMode: option.centermode,
          centerPadding: option.centerpadding,
          cssease: option.cssease,
          dots: option.dots,
          dotsClass: option.dotsclass,
          draggable: option.draggable,
          pauseOnHover: option.pauseonhover,
          fade: option.fade,
          vertical: option.vertical,
          slidesToShow: option.xl,
          slidesToScroll: option.slidetoscroll,
          infinite: option.loop,
          swipeToSlide: option.swipe,
          focusOnSelect: option.focusonselect,
          customPaging: function (slick, index) {
            var portrait = $(slick.$slides[index]).data('thumb');
            return '<img src=" ' + portrait + ' "/><div class="bg-overlay"></div>';
          },

          responsive: [{
            breakpoint: 1201,
            settings: {
              slidesToShow: option.lg
            }
          },
          {
            breakpoint: 993,
            settings: {
              slidesToShow: option.md
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: option.sm
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: option.xs,
              fade: false
            }
          }
          ]
        });
      else
        var slickAPI = slick_content.slick({
          accessibility: option.accessibility,
          adaptiveHeight: option.adaptiveheight,
          autoplay: option.autoplay,
          autoplaySpeed: option.autoplayspeed,
          arrows: option.arrows,
          asNavFor: option.asnavfor,
          appendArrows: option.appendarrows,
          appendDots: option.appenddots,
          prevArrow: option.prevarrow,
          nextArrow: option.nextarrow,
          centerMode: option.centermode,
          centerPadding: option.centerpadding,
          cssease: option.cssease,
          dots: option.dots,
          dotsClass: option.dotsclass,
          draggable: option.draggable,
          pauseOnHover: option.pauseonhover,
          fade: option.fade,
          vertical: option.vertical,
          slidesToShow: option.xl,
          slidesToScroll: option.slidetoscroll,
          infinite: option.loop,
          swipeToSlide: option.swipe,
          focusOnSelect: option.focusonselect,
          responsive: [{
            breakpoint: 1201,
            settings: {
              slidesToShow: option.lg
            }
          },
          {
            breakpoint: 993,
            settings: {
              slidesToShow: option.md
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: option.sm
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: option.xs,
              fade: false
            }
          }
          ]
        });

      slickAPI.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = slick_content.find('[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
        resetTextfx();
      });

      slickAPI.on('afterChange', function (e, slick, currentSlide) {
        var progress_wrap = slick_content.find('[data-slick-index="' + currentSlide + '"]').find('.js-special-progress');
        progress_wrap.each(function () {
          $(this).find('.js-progressbar-slick').progressbar({
            update: function (current_percentage, $this) {
              $this.find(".js-value").html(current_percentage);
            }
          });
        });

        var counter_wrap = slick_content.find('[data-slick-index="' + currentSlide + '"]').find('.js-counter-wrap');
        counter_wrap.each(function () {
          $(this).find('.js-counter').counterUp({
            delay: 0.2,
            time: 25
          });
        });

        textfx();
      })

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('animation-delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }

      function textfx() {
        $('.js-caption .letters').each(function () {
          $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        });

        anime.timeline().add({
          targets: '.js-caption',
          opacity: [0, 1],
          duration: 5,
          easing: "easeOutExpo",
          delay: 0
        }).add({
          targets: '.js-caption .letter',
          translateY: ["1.1em", 0],
          translateX: ["0.55em", 0],
          translateZ: 0,
          rotateZ: [180, 0],
          duration: 500,
          easing: "easeOutExpo",
          delay: function (el, i) {
            return 60 * i;
          }
        });
      }

      function resetTextfx() {
        anime.timeline().add({
          targets: '.js-caption',
          opacity: 0,
          duration: 1,
          easing: "easeOutExpo"
        })
      }

      arrow_left.on('click', function () {
        slick_content.slick('slickPrev');
      });

      arrow_right.on('click', function () {
        slick_content.slick('slickNext');
      });
    });

  } catch (err) {
    console.log(err)
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  new WOW().init();

})(jQuery);

try {

  var progressbarCircle = $('.js-progress-circle');
  progressbarCircle.each(function () {
    var that = $(this);
    var executed = false;

    var percentage = that.data("value");
    var color = that.data("color");
    var circle_wrap = that.find('.js-circle');
    var progress = percentage / 100;

    var empty_fill = '#f6f6f6';
    if($('body').hasClass("black")) empty_fill = "#111";

    that.find('.js-dot').css('background',color);

    var circle = circle_wrap.circleProgress({
      size: 174,
      thickness: 7,
      animation: {
        duration: 1600
      },
      fill: color,
      emptyFill: empty_fill,
      reverse: true
    });

    $(window).on('load', function () {
      that.waypoint(function () {
        if (!executed) {
          executed = true;
          circle = circle_wrap.circleProgress({
            value: progress
          });

          circle.on('circle-animation-progress', function (e, p, v) {
            var $this = $(this),
              instance = $this.data('circle-progress'),
              size = instance.size,
              thickness = instance.getThickness(),
              radius = size / 2 - thickness / 2,
              angle = -2 * v * Math.PI + instance.startAngle,
              x = radius * Math.cos(angle),
              y = radius * Math.sin(angle);

            $this.find('.dot').css({
              left: x + size / 2,
              top: y + size / 2
            });
          });
        }
      }, { offset: 'bottom-in-view' });
    })
  })

} catch (error) {
  console.log(error);
}

(function ($) {
  // USE STRICT
  "use strict";
  try {
    var videoPlayerHandle = $('.js-video-player');

    videoPlayerHandle.each(function () {
      var that = $(this);
      var videoPlayerBtn = that.find('.video__overlay');
      var videoPlayerContent = that.find('.video__content');

      // var imagesURLs = that.find('.video__cover').attr('src');
      // that.css('background-image', 'url(' + imagesURLs + ')');

      videoPlayerBtn.on('click', function (e) {
        videoPlayerContent.children('iframe')[0].src += "&autoplay=1";
        videoPlayerContent.css('opacity', 1);
        $(this).fadeOut('fast');
        e.preventDefault();

      })

    });


  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  try {
    // Mini Cart
    $('.mini-cart-btn').on('click', function () {
      $('.mini-cart').slideToggle("500");
    });

    // Hamburger Menu
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      $('.navbar-mobile').slideToggle('500');
    });
    $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
      $(this).toggleClass('active');
      $(dropdown).slideToggle('500');
      return false;
    });

    // Sticky Header 
    $(window).on('scroll', function(){
      $(window).scrollTop() > 0 ? $('header.header-desktop').addClass('header--fixed animated slideInDown') : $('header.header-desktop').removeClass('header--fixed animated slideInDown');      
    });

    // Pull Header
    $('.navbar-pull-list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-pull__dropdown');
      $(dropdown).slideToggle('500');
      return false;
    });

    // Right Pull Header
    $('.header-pull--right > .au-btn-menu-right').on('click', function (e) {
      e.stopPropagation();      
      $('.header-pull--right').toggleClass("show");
    });
    $('.header-pull--right .header-pull').on('click', function (e) {
      // e.stopPropagation();
    });
    $('body,html').on('click', function () {
      $('.header-pull--right').removeClass('show');
    });

  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Load more
  try {
    var list_load = $('.js-list-load');
    if (list_load[0]) {
      list_load.each(function () {
        var that = $(this);
        that.find('.js-load-item').hide();
        var load_btn = that.find('.js-load-btn');
        load_btn.on('click', function (e) {
          $(this).text("Loading...").delay(1500).queue(function (next) {
            $(this).hide();
            that.find(".js-load-item").fadeToggle("slow", 'swing');
          });
          e.preventDefault();
        });
      })

    }
  } catch (error) {
    console.log(error);
  }
  // Scroll Bar
  try {
    var scroll_bar = $('.js-scroll-bar');
    if (scroll_bar[0]) {
      const ps = new PerfectScrollbar('.js-scroll-bar', {
        wheelSpeed: 0.4,
        wheelPropagation: true,
        minScrollbarLength: 20
      });
    }
  } catch (error) {
    console.log(error);
  }

  // Config fullscreen
  try {
    var max_height = $(window).height();
    $('.js-fullscreen').css('height', max_height);
    $(window).on('resize', function () {
      max_height = $(window).height();
      $('.js-fullscreen').css('height', max_height);
    });
  } catch (error) {
    console.log(error);
  }

  // Switcher
  try {
    var logo_wrap = $('header,.header-pull--right-wrap').not('.header-transparent,.header-2,.header-mobile-2').find('.logo-wrap');
    var logo = $('header,.header-pull--right-wrap').not('.header-transparent,.header-2,.header-mobile-2').find('.logo');
    var intro1 = $('.lastest-work__intro');

    $('body').hasClass('black') ? logo_wrap.find('img').attr('src', 'images/icon/logo-white.png') : logo_wrap.find('img').attr('src', 'images/icon/logo-black.png');
    $('body').hasClass('black') ? logo.find('img').attr('src', 'images/icon/logo-white.png') : logo.find('img').attr('src', 'images/icon/logo-black.png');
    $('body').hasClass('black') ? intro1.find('img').attr('src', 'images/bg-intro-02.jpg') : intro1.find('img').attr('src', 'images/bg-intro-01.jpg');

    $('.demo-homepage li').on('click', function () {
      $(this).each(function () {
        var that = $(this);
        var color = that.data('color');
        $('body').attr('class', 'animsition').addClass(color);

      });
      $('body').hasClass('black') ? logo_wrap.find('img').attr('src', 'images/icon/logo-white.png') : logo_wrap.find('img').attr('src', 'images/icon/logo-black.png');
      $('body').hasClass('black') ? logo.find('img').attr('src', 'images/icon/logo-white.png') : logo.find('img').attr('src', 'images/icon/logo-black.png');
      $('body').hasClass('black') ? intro1.find('img').attr('src', 'images/bg-intro-02.jpg') : intro1.find('img').attr('src', 'images/bg-intro-01.jpg');
      
    });
    $(".switcher-cog").on("click", function () {
      $('#switcher').toggleClass("show");
    });

  } catch (error) {
    console.log(error);
  }
  
})(jQuery);
(function ($) {
  'use strict';

  /*[ Parallax ]
  ===========================================================*/

  try {
    var bgParallax = $('.js-parallax-scroll');
    var posWindow = $(window).scrollTop();
    var hWindow = $(window).height();
    var x = 0;
    var y = 3;

    bgParallax.each(function () {
      var that = $(this);
      var posParallax = that.offset().top;
      var hParallax = that.outerHeight();
      var setPosParallax = function () {
        if ($(window).width() > 992) {
          if (bgParallax.outerHeight() < $(window).height()) {

            x = that.offset().top - $(window).scrollTop();

            $(that).css('background-position', 'center ' + (x / y) + 'px');
          }
          else {
            $(that).css('background-position', 'center', 'center');
          }
        } else {
          $(that).css('background-attachment', 'scroll');
        }
      };

      setPosParallax();

      $(window).on('resize', function () {
        setPosParallax();
      });

      $(window).on('scroll', function () {
        setPosParallax();
      });
    });
  } catch (err) {
    console.log(err);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Show Line
  try {
    var line = $('.js-line');

    if (line) {
      line.each(function () {
        var that = $(this);
        var executed = false;

        $(window).on('load', function () {
          that.waypoint(function () {
            if (!executed) {
              executed = true;
              that.addClass('line--show');
            }
          }, {
              offset: 'bottom-in-view'
            });
        })
      })
    }


  } catch (error) {
    console.log(err);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";
  try {
    $('.quantity').each(function () {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.on('click', function(){
        var oldValue = parseFloat(input.val());
        var newVal = oldValue + 1;
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.on('click', function(){
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });


    });
  } catch (error) {
    console.log(error);
  }


})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  try {
    var text_container = $(".js-text-trans");

    text_container.each(function () {
      var that = $(this);
      var bg = that.data("background");
      var text = that.find("span");
      text.css("background-image", "url('" + bg + "')");

      text.css("background-position", "center center");
    });
  } catch (error) {
    console.log(error);
  }

})(jQuery);