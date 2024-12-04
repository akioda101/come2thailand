document.addEventListener('DOMContentLoaded', function () {
    
    const galleryImages = document.querySelectorAll('.gallery-scroll img');

    galleryImages.forEach(function (img) {
        img.addEventListener('click', function () {
            
            if (document.querySelector('.image-overlay')) return;

            
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');

            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            enlargedImg.classList.add('enlarged-image');

            
            overlay.appendChild(enlargedImg);

            
            document.body.appendChild(overlay);

            
            document.body.style.overflow = 'hidden';

            
            overlay.addEventListener('click', function () {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            });
        });
    });
});

const closeButton = document.createElement('span');
closeButton.classList.add('close-button');
closeButton.innerHTML = '&times;'; 


overlay.appendChild(closeButton);


closeButton.addEventListener('click', function (e) {
    e.stopPropagation(); 
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
});