(function($) {
    //
    'use strict';

    var isMobile = false;

    if($("#cm-promotion").hasClass('cm-mobile')) {
        isMobile = true;
    }

    // container width
    if(!isMobile) {
        $("main#container").addClass("cm-1180");
    }

    // navbar
    var navbar = $('.cm-navbar'),
        navbarTab = navbar.find('.cm-tabs'),
        navbarItem = navbar.find('li > a'),
        navbarHeight = navbarTab.outerHeight(),
        positionY = 72;

    if(navbar.length) {
        if(isMobile) {
            positionY = 0;
        }

        if(isMobile) {
            navbarTab.prepend(
                '<div class="cm-accordion-head">' +
                    '<h4 class="cm-tab-title">' +
                        'Categories' +
                        '<i class="fa fa-angle-down" aria-hidden="true"></i>' +
                    '</h4>' +
                '</div>'
            )

            var navbarHead = $('.cm-accordion-head');

            navbarHead.on('click', function() {
                var _ = $(this),
                    navbarBox = $('.cm-tab-wrapper'),
                    icon = _.find('i');

                if(navbarBox.is(':visible')) {
                    navbarBox.slideUp(250);
            		icon
                        .addClass('fa-angle-down')
            			.removeClass('fa-angle-up');
                } else {
                    navbarBox.slideDown(250);
            		icon
                        .removeClass('fa-angle-down')
            			.addClass('fa-angle-up');
                }
            });
        }

        $(window).on('scroll', function() {
            var _ = $(this),
                windowPosition = _.scrollTop(),
                navbarTop = navbar.offset().top;

            if(windowPosition > navbarTop) {
                navbarTab.addClass('cm-stick');

                if(isMobile == false) {
                    $('.cm-stick').css('top', positionY + 'px');
                } else {
                    $('.cm-stick').css('top', positionY);
                }
            } else {
                navbarTab
                    .removeClass('cm-stick')
                    .css('top', '');
            }
        })

        navbarItem.on('click', function(e) {
            e.preventDefault();

            var _ = $(this),
                target = $(this.hash);

            navbarItem.parents('li').removeClass('active');
            _.parents('li').addClass('active');

            if(target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - navbarHeight - positionY,
                }, 500);
            }
        });
    }
    // accordion
    var $accorHeader = $('.cm-accordion-header'),
        $accorTitle = $('.cm-accordion-title i'),
        $accorContent = $('.cm-accordion-content');

	$accorHeader.on('click', function() {
        var _ = $(this),
            icon = _.find('i'),
            accordion = _.next('div');

        $accorTitle
            .removeClass('fa-angle-up')
            .addClass('fa-angle-down');

        if(accordion.is(':visible')) {
            accordion.slideUp(250);
        } else {
            icon
                .removeClass('fa-angle-down')
                .addClass('fa-angle-up');

            $accorContent.slideUp(250);
			accordion.slideToggle(250);
        }
    });

    // carousel
    var cmCarousel = {};

    cmCarousel = (function() {

        function cmCarousel(element, settings) {
            var _ = this, dataSettings;

            _.defaults = {
                infinite : false,
                lazyLoad : 'ondemand',
                slidesToScroll : 5,
                slidesToShow : 5,
                autoplay : false,
                dots : false,
                arrows : true,
                prevArrow : "<div class='cm-prev'>",
                nextArrow : "<div class='cm-next'>",
                spacing : 0
            };

            _.$plugin = $(element);

            dataSettings = $(element).data('plugin') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.init(true);
        }

        return cmCarousel;

    }());

    cmCarousel.prototype.build = function() {

        var _ = this;

        _.$plugin
            .slick({
                infinite : _.options.infinite,
                lazyLoad : _.options.lazyLoad,
                slidesToScroll : _.options.slidesToScroll,
                slidesToShow : _.options.slidesToShow,
                autoplay : _.options.autoplay,
                dots : _.options.dots,
                arrows : _.options.arrows,
                prevArrow : _.options.prevArrow,
                nextArrow : _.options.nextArrow
            })
            .on('lazyLoaded', function(event, slick, image, imageSource) {
                image.parents('li').removeClass('cm-lazyLoading');
            });

    };

    cmCarousel.prototype.space = function() {

        var _ = this,
            list = _.$plugin.find(".slick-list"),
            slide = _.$plugin.find(".slick-slide");

        if(_.options.spacing) {
            var gap = _.options.spacing / 2;

            list.css('margin' , '0 -' + gap + 'px');
            slide.css('margin' , '0 ' + gap + 'px');
        }
    };

    cmCarousel.prototype.init = function() {

        var _ = this;

        _.build();
        _.space();

    };

    $.fn.cmCarousel = function() {

        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].plugin = new cmCarousel(_[i], opt);
            else
                ret = _[i].plugin[opt].apply(_[i].plugin, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;

    };
    // anchor
    $.fn.cmAnchor = function(options) {

        var plugin = this,
            defaults = {
                control : '[data-anchor]',
                speed : 400
            }, settings;

        settings = $.extend({}, defaults, options);

        var item = $(settings.control);

        var positionY = 72;

        if(isMobile) {
            var positionY = 0;
        }

        var anchor = {

            init : function() {
                item.on('click', function(e) {
                    e.preventDefault();

                    var dataTarget = $(this).attr('data-target');

                    $('html, body').animate({
                        scrollTop: $('#' + dataTarget).offset().top - positionY
                    }, settings.speed);
                });
            }

        }
        // initialize
        anchor.init();

        return anchor;
    }

    (function($) {
        $.fn.cmAnchor();
    });
    // modal
    var cmModal = window.cmModal || {};;

    cmModal = (function() {

        function cmModal(element, settings) {
            var _ = this, dataSettings;

            _.defaults = {
                title : null,
                target : null,
                closeBtn : '.cmModal-close',
                closeOnClick : true
            };

            _.$plugin = $(element);

            dataSettings = $(element).data('plugin') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.init(true);
        }

        return cmModal;

    }());

    cmModal.prototype.dialog = function(element, container) {

        var _ = this,
            content = '',
            button = _.$plugin.find('.modal-button').html();

        if(!_.options.target) {
            content = _.$plugin.find('.modal-content').html();
        } else {
            content = $(_.options.target).html();
        }

        container = '';
        container += '<div class="cmModal">';
        container += '<div class="cmModal-dialog">';
        container += '<div class="cmModal-content">';
        // header
        container += '<div class="cmModal-header">';
        container += '<button type="button" class="close cmModal-close" data-dismiss="modal" aria-hidden="true">×</button>';
        container += '</div>';
        // content
        if(content) {
            container += '<div class="cmModal-body">' + content + '</div>';
        }
        // button
        if(button) {
            container += '<div class="cmModal-footer">' + button + '</div>';
        }
        container += '<div class="cmModal-backdrop">';
        container += '</div></div></div></div>';

        $('body').append(container);

    };

    cmModal.prototype.header = function(element) {

        var _ = this,
            header = '';

        header += '<h4 class="cmModal-title">';

        if(_.options.title) {
            header +=  _.options.title;
        } else {
            header += '&nbsp;'
        }

        header += '</h4>';

        $('.cmModal-header').append(header);

    };

    cmModal.prototype.build = function(element) {

        var _ = this;

        _.dialog();

        if(_.options.closeOnClick == true) {
            $('.cmModal-backdrop').addClass('cmModal-close');
        }

        _.header();
        _.modalClose();

        $('.cmModal').fadeIn(350);

    };

    cmModal.prototype.handler = function(element) {

        var _ = this;

        $('.cmModal').remove();
        _.build();

        var modalHeight = $('.cmModal-content').height(),
            windowHeight = $(window).height();

        if(modalHeight > windowHeight) {
            $('.cmModal').addClass('cm-scrollable');
        }

        var button = $('.cmModal').find('.btn');

        if(button) {
            if(!isMobile) {
                button.attr('target', '_blank');
            } else {
                button.attr('target', '_self');
            }
        }

    };

    cmModal.prototype.modalClose = function() {

        var _ = this;

        $(_.options.closeBtn).on('click', function() {
            $('.cmModal, .cmModal-backdrop').remove();
        });

    };

    cmModal.prototype.init = function() {

        var _ = this;

        _.handler();
        _.modalClose();

    };

    $.fn.cmModal = function() {

        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].plugin = new cmModal(_[i], opt);
            else
                ret = _[i].plugin[opt].apply(_[i].plugin, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;

    };

    //
})(jQuery)

var modals = $('.modal'),
    totalModals = modals.length;

if (modals.length) {
    for (var i = 0; i < totalModals; i++) {
        modal = $(modals[i]);

        modal.on('click', function() {
            $(this).cmModal ({
                title : modal.data("title"),
                target : modal.data("target"),
                closeOnClick : modal.data("close")
            });
        })

    }
}

var slicks = $('.slick-default'),
    totalSlicks = slicks.length;

if ( slicks.length ) {
    for ( var i = 0; i < totalSlicks; i++ ) {
        var slick = $(slicks[i]),
            colSpacing = slick.attr('data-spacing'),
            column = colSpacing / 2;

        slick
            .slick({
                infinite: false,
                lazyLoad: 'ondemand',
                slidesToScroll : slick.data("scroll"),
                slidesToShow : slick.data("items"),
                autoplay : slick.data("autoplay"),
                dots : slick.data("dots"),
                arrows: slick.data("arrows"),
                prevArrow: "<div class='cm-prev'>",
                nextArrow: "<div class='cm-next'>"
            })
            .on('lazyLoaded', function(event, slick, image, imageSource) {
                image.parents('li').removeClass('cm-lazyLoading');
            });

        var list = slick.find(".slick-list"),
            slide = slick.find(".slick-slide");

        list.css('margin' , '0 -' + column + 'px');
        slide.css('margin' , '0 ' + column + 'px');
    }
}
