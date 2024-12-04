document.addEventListener("DOMContentLoaded", function () {
    const galleryScroll = document.querySelector(".gallery-scroll");
    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");

    
    scrollLeftBtn.addEventListener("click", () => {
        
        if (galleryScroll.scrollLeft <= 0) {
            
            galleryScroll.scrollLeft = galleryScroll.scrollWidth - galleryScroll.clientWidth;
        } else {
            
            galleryScroll.scrollBy({
                left: -galleryScroll.clientWidth / 3, 
                behavior: "smooth",
            });
        }
    });

    
    scrollRightBtn.addEventListener("click", () => {
        
        if (galleryScroll.scrollLeft + galleryScroll.clientWidth >= galleryScroll.scrollWidth) {
            
            galleryScroll.scrollLeft = 0;
        } else {
            
            galleryScroll.scrollBy({
                left: galleryScroll.clientWidth / 3, 
                behavior: "smooth",
            });
        }
    });
});

