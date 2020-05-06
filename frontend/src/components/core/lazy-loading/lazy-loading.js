
export default () => {
  const lazyImages = document.querySelectorAll("[data-src]") || [];

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (entries, self) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.getAttribute("data-src");
          lazyImage.srcset = lazyImage.getAttribute("data-srcset");
          lazyImage.classList.remove("lazy");
          self.unobserve(lazyImage);
        }
      });
    }, {
      threshold: 0.5 // load image when 100% of image in the view port
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
};
