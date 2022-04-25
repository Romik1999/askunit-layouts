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

    var swiper3 = new Swiper(".advantages-slider", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".advantages-slider__arrow_next",
            prevEl: ".advantages-slider__arrow_prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            400: {
                slidesPerView: 2,
            },
            575: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
            1441: {
                slidesPerView: 3,
            }
        },
    });


    var swiper4 = new Swiper(".reviews-slider__swiper", {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: ".reviews-slider__arrow_next",
            prevEl: ".reviews-slider__arrow_prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1199: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            }
        },
    });


    $(".faq__item").click(function () {
        if ($(this).hasClass("active")) {
            $(this)
                .removeClass("active")
                .find(".faq-item__desc")
                .slideUp();
        } else {
            $(this)
                .addClass("active")
                .find(".faq-item__desc")
                .slideDown()
                .closest(".faq__item")
                .siblings('.faq__item.active').removeClass('active')
                .find('.faq-item__desc ').slideUp();
        }
    });

    $('.equipments-table__tooltip').tooltipster({
        contentAsHTML: true,
        interactive: true,
        maxWidth: 337,
        side: 'bottom',
        arrow: false
    });

    $('.equipments-table__title_tooltip').tooltipster({
        contentAsHTML: true,
        interactive: true,
        maxWidth: 337,
        side: 'right',
        arrow: false
    });

    $('.interaction-stages__trigger').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        const sel = $('.interaction-stages__item[data-tab="' + $(this).data('tab') + '"]');
        sel.siblings().removeClass('active');
        sel.addClass('active');
    });


    var swiper3 = new Swiper(".projects-slider__swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: ".projects-slider__arrow_next",
            prevEl: ".projects-slider__arrow_prev",
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

    var swiper4 = new Swiper(".structure-slider", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".structure-info__arrow_next",
            prevEl: ".structure-info__arrow_prev",
        },
        pagination: {
            el: ".structure-info__pagination",
            type: "fraction",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
        },
    });

    $('[name*="phone"]').inputmask({
        mask: '+7 999 999 99 99'
    });
});