document.addEventListener("DOMContentLoaded", function() {
//     gsap.config({ trialWarn: false });
// //     console.clear();
//     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, SplitText);


    let smoother = ScrollSmoother.create({ smooth: 2 });

    let masks;

    ScrollTrigger.create({
        trigger: "#smooth-content",
        start: "top bottom",
        end: "bottom bottom",
        normalizeScroll: true,
        ignoreMobileResize: true,
        refreshPriority: -1,
        scrub: 1
    });

    const btt = document.querySelector("#back-to-top");

	if (btt) {
		btt.addEventListener("click", function() {
			gsap.to(window, { scrollTo: 0 });
		});
		gsap.set(btt, { y: 50 });

		gsap.to(btt, {
			y: 0,
			autoAlpha: 1,
			scrollTrigger: {
				trigger: "body",
				start: "top -20%",
				end: "top -20%",
				toggleActions: "play none reverse none"
			}
		});
	}

    const stickyEls = document.querySelectorAll('.sticky-statement');
    const stickyEls2 = document.querySelectorAll('.sticky-statement2');
    const stickyEls3 = document.querySelectorAll('.sticky-statement3');
    const stickyEls4 = document.querySelectorAll('.sticky-statement4');
    const isMobile = function() { return window.innerWidth < 809; };

    stickyEls.forEach(function(panel) {
        gsap.to(panel, {
            y: function() { return panel.offsetHeight < window.innerHeight ? 0 : -(panel.offsetHeight - window.innerHeight); },
            ease: "none",
            scrollTrigger: {
                trigger: panel,
                start: function() { return panel.offsetHeight < window.innerHeight ? "top 10%" : "bottom bottom"; },
                end: function() { return panel.offsetHeight < window.innerHeight ? "bottom 90%" : "bottom bottom"; },
                scrub: true,
                pin: !isMobile(),
                pinSpacing: false,
                invalidateOnRefresh: true
            }
        });
    });

    stickyEls.forEach(function(element) {
        ScrollTrigger.create({
            trigger: element,
            pin: !isMobile(),
            start: "top top+=100",
            end: "+=1000",
            markers: false
        });
    });
    stickyEls3.forEach(function(element) {
        ScrollTrigger.create({
            trigger: element,
            pin: !isMobile(),
            start: "top top+=100",
            end: "+=700",
            markers: false
        });
    });
    stickyEls4.forEach(function(element) {
        ScrollTrigger.create({
            trigger: element,
            pin: !isMobile(),
            start: "top top+=100",
            end: "+=1400",
            markers: false
        });
    });

    function ShowcaseOverlapping() {
        gsap.utils.toArray('.about-sec').forEach((pinnedSection) => {
            
            const transformTextsAnim = pinnedSection.querySelectorAll('.sticky-statement2');
            
            function setImagesProperties() {								
                gsap.set(transformTextsAnim, { height: window.innerHeight});	
            }
            
            setImagesProperties();
            
            window.addEventListener('resize', setImagesProperties);	
        
            transformTextsAnim.forEach((transformTextAnim, i, arr) => {
                    const durationMultiplier = arr.length - i - 1;
                    
                    
                    ScrollTrigger.create({
                        trigger: transformTextAnim,
                        start: function() {
                            const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
                            return "top +=" + centerPin;
                        },
                        end: function() {
                            const durationHeight = transformTextAnim.offsetHeight * durationMultiplier + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight)/2;
                            return "+=" + durationHeight;
                        },
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    });
                    
                    const animationProperties = {
                        y: 500,
                        scale: 0.65,
                        opacity: 0,
                        zIndex: 0,
                        duration: 0.05,
                        ease: 0.05,
                        // ease: Linear.easeNone
                    };
                    
                    // animationProperties.filter = "blur(10px)";
                    
                    ScrollTrigger.create({
                        trigger: transformTextAnim,
                        start: function() {
                            const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
                            console.log('center pin' , centerPin);
                            return "top top";
                        },
                        end: function() {
                            const durationHeight = transformTextAnim.offsetHeight + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight) / 2;
                            return "+=" + durationHeight;
                        },
                        scrub: true,
                        animation: gsap.to(transformTextAnim, animationProperties),
                    });

            });
        
        });
        
    }
    if (!isMobile()) {
        ShowcaseOverlapping();
    }

//     const allDivs = document.querySelectorAll('#smooth-content > div');
    const allDivs = document.querySelectorAll('#smooth-content .elementor > div');
    if (allDivs.length > 0) {
        allDivs.forEach(function(div) {
			
			if (div.querySelector(".scaleDown")) {
				gsap.fromTo(
					div.querySelector(".scaleDown"),
					{ scale: 1.4 },
					{
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: div,
							scrub: true,
							markers: false,
							start: "top bottom",
							end: "bottom top"
						}
					}
				);
			}
        });
    } else {
        console.log('No elements found for the selector #smooth-content .elementor > div');
    }
});


