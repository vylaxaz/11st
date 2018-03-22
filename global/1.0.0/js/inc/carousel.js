// carousel
var slicks = $('.slick'),
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
                image.parents('.cm-prod-image').removeClass('cm-lazyLoading');
            });

        var list = slick.find(".slick-list"),
            slide = slick.find(".slick-slide");

        list.css('margin' , '0 -' + column + 'px');
        slide.css('margin' , '0 ' + column + 'px');
    }
}
