function initAnim(){
    gsap.fromTo('#navbar-wrapper',{
        opacity: 0,
        y: 150
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.fromTo('#footer-wrapper', {
        opacity: 0
    }, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
    });
}

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


document.addEventListener("DOMContentLoaded", () => {
    var cursor = new MouseFollower();
});

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
