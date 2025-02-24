
function initAnim() {
    // Animation for backdrop

    gsap.fromTo(
        '#backdrop',
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }
    );

    // Animation for Navbar
    gsap.fromTo(
        '#navbar-wrapper',
        {
            opacity: 0,
            y: 150
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power2.out'
        }
    );

    // Animation for Footer
    gsap.fromTo(
        '#footer-wrapper',
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: 'power2.out'
        }
    );

    // Animation for Home Page and Contact Page

    gsap.fromTo(
        '#title',
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: 'power2.out',
        }
    );

    gsap.fromTo(
        '#description',
        {
            opacity: 0,
            y: 50
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.4,
            ease: 'power2.out'
        },

    );

    gsap.fromTo(
        '#cta-container div',
        {
            opacity: 0,
            y: 50
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.4,
            ease: 'power2.out',
            stagger: 0.2
        }
    );

    gsap.fromTo(
        '.social-icon',
        {
            opacity: 0,
        },
        {

            opacity: 1,
            duration: 1,
            delay: 1.8,
            ease: 'power2.out',
            stagger: 0.2
        },
    );


    // Animation for About Page

    var aboutTl = gsap.timeline;
    aboutTl = gsap.timeline();

    aboutTl.fromTo(
        '.section-title',
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: 'power2.out'
        }
    );

    aboutTl.fromTo(
        '.section-para',
        {
            opacity: 0,
            x: 50
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        },
        '-=0.5' // Overlap with the previous animation by 0.5 seconds
    );

    aboutTl.fromTo(
        '.listed-content',
        {
            opacity: 0,
            x: 50
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.2
        },
        '-=0.5' // Overlap with the previous animation by 0.5 seconds
    );

    // Animation for Projects Page
    gsap.fromTo(
        '.page-title',
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: 'power2.out'
        }
    );

    gsap.fromTo(
        '#project-container',
        {
            opacity: 0,
            y: 50
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: 'power2.out',
            stagger: 0.2
        }
    );

}


document.addEventListener("DOMContentLoaded", () => {
    var cursor = new MouseFollower();
});

function showLoaderIfFontsNotLoaded() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const hideLoader = () => {
        gsap.to(loaderWrapper, {
            opacity: 0, duration: 0.5, onComplete: () => {
                loaderWrapper.style.display = 'none';
            }
        });
    };

    if (!document.fonts.check('1em AP-Regular')) {
        gsap.to(loaderWrapper, { display: 'block', opacity: 1, duration: 0.5 });
        document.fonts.ready.then(hideLoader);
    } else {
        hideLoader();
    }
    
}

showLoaderIfFontsNotLoaded();


// Transitions Related Code

if (navigation.addEventListener) {
    navigation.addEventListener("navigate", (event) => {

        if (!event.destination.url.includes(document.location.origin)) {
            return;
        }

        event.intercept({
            handler: async () => {
                const response = await fetch(event.destination.url);
                const text = await response.text();

                const transition = document.startViewTransition(() => {
                    const body = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
                    document.body.innerHTML = body;

                    const title = text.match(/<title[^>]*>(.*?)<\/title>/i)[1];
                    document.title = title;
                });

                transition.ready.then(() => {
                    window.scrollTo(0, 0);
                    var cursor = new MouseFollower();
                    showLoaderIfFontsNotLoaded();
                    initAnim();
                });
            },
            scroll: "manual",
        });
    });
}
