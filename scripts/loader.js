document.addEventListener("DOMContentLoaded", function() {

    var loaderWrapper = document.getElementById('loader-wrapper');
    var loader = document.getElementById('loader');

    document.fonts.ready.then(function() {
        // Add a delay before hiding the loader
        setTimeout(function() {
            // Use GSAP to animate the loader's pulse effect
            gsap.to(loader, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: "power4.inOut", onComplete: function() {
                // Use GSAP to animate the loader-wrapper's opacity
                gsap.to(loaderWrapper, { opacity: 0, duration:0.5, onComplete: function() {
                    loaderWrapper.style.display = 'none';
                }});
            }});
        }, 200); // 500ms delay
    });
});
