(function($) {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, SplitText);
        jQuery(window).on('elementor/frontend/init', function() {
            elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                AOS.init();
            });
        });

        /* Loader */
        window.addEventListener('load', function () {
            // Check if the preloader element exists before accessing its style property
            var preloader = document.querySelector('.preloader-wrap');
            if (preloader) {
                setTimeout(() => {
                    preloader.style.display = 'none';
                    scroll_animations();
                    AOS.init({
                        duration: 600
                    });
                }, 200);
                setTimeout(() => {
                    var heroFooter = document.querySelector('.hero-sec .hero-footer-wrap.scroll-from-bottom');
                    if (heroFooter) {
                        heroFooter.classList.add('animated');
                    }
                }, 400);
            }
        });

        function scroll_animations() {
            // Placeholder function for scroll animations
            console.log("scroll_animations function called");
        }

        /* Real Time */
        if (document.getElementById('realtime')) {
            startTime();
        }
        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            var realtimeElement = document.getElementById('realtime');
            if (realtimeElement) {
                realtimeElement.innerHTML = h + ":" + m + ":" + s;
                var t = setTimeout(startTime, 500);
            }
        }
        function checkTime(i) {
            if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
            return i;
        }

        /* ===== Real Time Weather ===== */
        const apiKey = '1906ccd7aa6d7c3683f1b293ee212f01';
        const city = 'sylhet';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const latitude = data.coord.lat;
                const longitude = data.coord.lon;

                // Format latitude
                const latDegrees = Math.floor(latitude);
                const latMinutes = Math.floor((latitude - latDegrees) * 60);
                const latSeconds = ((latitude - latDegrees) * 60 - latMinutes) * 60;

                // Format longitude
                const lonDegrees = Math.floor(longitude);
                const lonMinutes = Math.floor((longitude - lonDegrees) * 60);
                const lonSeconds = ((longitude - lonDegrees) * 60 - lonMinutes) * 60;

                document.getElementById('coordinates').textContent = `${latDegrees}° ${latMinutes}' ${latSeconds.toFixed(4)}" N`;
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });

        /* Popup Menu */
        var themeBtns = document.querySelectorAll('.header-wrap .header-right .theme-btn');
        themeBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var popupMenu = document.querySelector('.popup-menu-wrap');
                if (popupMenu) {
                    popupMenu.classList.add('active');
                }
            });
        });
        var closeBtns = document.querySelectorAll('.popup-menu-close-btn .icon');
        closeBtns.forEach(icon => {
            icon.addEventListener('click', function () {
                var popupMenu = document.querySelector('.popup-menu-wrap');
                if (popupMenu) {
                    popupMenu.classList.remove('active');
                }
            });
        });

        /* Custom Cursor */
        const cursorBall = document.getElementById('ball');
        document.addEventListener('mousemove', function (e) {
            if (cursorBall) {
                gsap.to(cursorBall, {
                    duration: 0.3,
                    x: e.clientX,
                    y: e.clientY,
                    opacity: 1,
                    ease: 'power2.out'
                });
            }
        });
        const hoverElements = document.querySelectorAll('a');
        hoverElements.forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                if (cursorBall) {
                    cursorBall.classList.add('hovered');
                    gsap.to(cursorBall, {
                        duration: 0.3,
                        scale: 2,
                        opacity: 0,
                        ease: 0.1
                    });
                }
            });
            element.addEventListener('mouseleave', function () {
                if (cursorBall) {
                    cursorBall.classList.remove('hovered');
                    gsap.to(cursorBall, {
                        duration: 0.3,
                        scale: 1,
                        opacity: 1,
                        ease: 'power2.out'
                    });
                }
            });
        });

        window.addEventListener('scroll', scroll_animations);
    });

    function scroll_animations() {
        var defaults = {
            ease: 0.05,
            animation: "fade_from_bottom",
            once: !1,
        };
        gsap.utils.toArray(".scroll-animation").forEach(function (box) {
            var gsap_obj = {};
            var settings = {
                duration: box.dataset.animationDuration || defaults.duration,
            };
            var animations = {
                slide_up: {
                    y: -180,
                },
                slide_down: {
                    y: 180,
                },
                slide_up2: {
                    y: -100,
                },
                slide_down2: {
                    y: 100,
                },
                fade_from_bottom: {
                    y: 180,
                    opacity: 0,
                },
                fade_from_top: {
                    y: -180,
                    opacity: 0,
                },
                fade_from_left: {
                    x: -180,
                    opacity: 0,
                },
                fade_from_right: {
                    x: 180,
                    opacity: 0,
                },
                fade_in: {
                    opacity: 0,
                },
                rotate_up: {
                    y: 180,
                    rotation: 10,
                    opacity: 0,
                },
                bronx_zoom_out: {
                    scale: 2,
                },
                slide_and_scale: {
                    scale: 1,
                    opacity: 1
                },
            };
            var globalWidth = window.innerWidth;
            var transWidth = (globalWidth > 809) ? '10%' : '30%';
            var scroll_trigger = {
                scrollTrigger: {
                    trigger: box,
                    once: defaults.once,
                    start: "top bottom+=" + transWidth,
                    toggleActions: "play none none reverse",
                    markers: !1,
                    onUpdate: function(self) {
                    }
                },
            };
            if (box.dataset.animation == 'bronx_zoom_out') {
                scroll_trigger = {
                    scrollTrigger: {
                        trigger: box,
                        once: defaults.once,
                        start: "top bottom",
                        toggleActions: "play none none reverse",
                        markers: !1,
                    },
                };
            }
            jQuery.extend(gsap_obj, settings);
            jQuery.extend(gsap_obj, animations[box.dataset.animation || defaults.animation]);
            jQuery.extend(gsap_obj, scroll_trigger);
            gsap.from(box, gsap_obj);
        });
    }

document.addEventListener('DOMContentLoaded', function() {
    // Get the current URL without any trailing slashes
    var currentUrl = window.location.href.split('#')[0].split('?')[0].replace(/\/$/, "");

    // Select all menu item anchor elements
    var menuItems = document.querySelectorAll('.menu-lists ul li a');

    menuItems.forEach(function(menuItem) {
        // Get the menu item URL without any trailing slashes
        var menuItemUrl = menuItem.href.split('#')[0].split('?')[0].replace(/\/$/, "");

        // Compare the sanitized URLs
        if (menuItemUrl === currentUrl) {
            // Add the active class to the parent <li> element
            menuItem.parentElement.classList.add('active');
        }
    });
});


})(jQuery);
