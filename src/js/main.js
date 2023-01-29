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

    var menu = ['1-20', '21-40', '41-60'];
    var swiper4 = new Swiper(".structure-slider", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".structure-info__arrow_next",
            prevEl: ".structure-info__arrow_prev",
        },
        pagination: {
            el: '.structure-info__pagination',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
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


    $('.sets-title__tooltip').tooltipster({
        contentAsHTML: true,
        interactive: true,
        maxWidth: 337,
        side: 'bottom',
        arrow: false
    });

    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });

    $('.card-tabs__trigger').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        let sel = $('.card-tabs__content[data-tab="' + $(this).data('tab') + '"]');
        sel.siblings().removeClass('active');
        sel.addClass('active');
    });

    // range
    const sumInput = document.querySelector('.form__input--range'),
        rangeInputSum = document.querySelector('.form-range__input'),
        rangeTrackSum = document.querySelector('.form-range__fill');

    sumInput.value = sumInput.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб'

    // маска
    function prettify(num) {
        const n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ') + ' руб';
    }

    function range(input$, progress$, content) {
        if (input$) {
            const val = input$.value;
            const min = input$.getAttribute('min');
            const max = input$.getAttribute('max');
            const step = input$.getAttribute('step');
            const position = 100 / (max - step) * (val - step);
            updateRangePosition(progress$, position);

            input$.addEventListener('input', () => {
                const val = input$.value;
                const min = input$.getAttribute('min');
                const max = input$.getAttribute('max');
                const step = input$.getAttribute('step');
                const position = 100 / (max - step) * (val - step);
                updateRangePosition(progress$, position);
                content.value = prettify(val);
            });
        }
    }

    function updateRangePosition(progress$, position) {
        if (progress$) {
            progress$.style.width = `${position}%`;
        }
    }

    range(rangeInputSum, rangeTrackSum, sumInput);


    sumInput.addEventListener('input', function () {

        const minSum = rangeInputSum.getAttribute('min');
        const maxSum = rangeInputSum.getAttribute('max');
        const stepSum = rangeInputSum.getAttribute('step');

        this.value = prettify(this.value.replace(/\D/g, ''))
        if (+this.value.replace(/\D/g, '') > +maxSum) {
            this.value = prettify(maxSum)
            return
        }
        if (+this.value.replace(/\D/g, '') < +minSum) {
            rangeInputSum.value = 0
            rangeTrackSum.style.width = 0 + '%'
            return
        }
        if (+this.value.replace(/\D/g, '') >= +minSum && +this.value.replace(/\D/g, '') <= +maxSum) {
            rangeTrackSum.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
            rangeInputSum.value = this.value.replace(/\D/g, '')
        }
    })

    $('[name*="phone"]').inputmask({
        mask: '+7 999 999 99 99'
    });
});