// anchor
$.fn.cmAnchor = function(options) {

    var plugin = this,
        defaults = {
            control : '[data-anchor]',
            speed : 400
        }, settings;

    settings = $.extend({}, defaults, options);

    var item = $(settings.control);

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
