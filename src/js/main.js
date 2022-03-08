$(function () {
    var swiper = new Swiper(".brands-slider__wrapper", {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
            el: ".brands-counter",
            type: "fraction",
        },
        navigation: {
            nextEl: ".brands-slider__arrow_next",
            prevEl: ".brands-slider__arrow_prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1050: {
                slidesPerView: 4,
            }
        },
    });

    var swiper2 = new Swiper(".collection-images__slider", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".collection-images__arrow_next",
            prevEl: ".collection-images__arrow_prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            }
        },
    });

    $('.stages__trigger').click(function () {
        let activeNumber = $(this).data('tab');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $('.stages__items .active').removeClass('active');
        $('.stages__items [data-tab="' + activeNumber + '"]').addClass('active');
    });
});