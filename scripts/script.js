
function showLoaderIfFontsNotLoaded() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const hideLoader = () => {
        gsap.to(loaderWrapper, { opacity: 0, duration: 0.5, onComplete: () => {
            loaderWrapper.style.display = 'none';
        }});
    };

    if (!document.fonts.check('1em AP-Regular')) {
        gsap.to(loaderWrapper, { display: 'block', opacity: 1, duration: 0.5 });
        document.fonts.ready.then(hideLoader);
    } else {
        hideLoader();
    }

    // window.addEventListener('focus', () => {
    //     setTimeout(hideLoader, 200); // Adjust the timeout duration as needed
    // });
}

showLoaderIfFontsNotLoaded();


document.addEventListener("DOMContentLoaded", () => {
    var cursor = new MouseFollower();
});

// Transitions Related Code

if (navigation.addEventListener) {
    navigation.addEventListener("navigate", (event) => {

        // Check if the link contains the 'download' attribute
        const link = event.target.closest('a');
        if (link && link.hasAttribute('download')) {
            return;
        }

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
                });
            },
            scroll: "manual",
        });
    });
}
