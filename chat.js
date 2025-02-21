document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carrousel
    const carouselConfig = {
        images: [
            { src: '/api/placeholder/800/450', caption: 'Sushi' },
            { src: '/api/placeholder/800/450', caption: 'Maki' },
            { src: '/api/placeholder/800/450', caption: 'Sashimi' },
            { src: '/api/placeholder/800/450', caption: 'Yakitori' },
            { src: '/api/placeholder/800/450', caption: 'Tempura' }
        ],
        autoplayDelay: 5000 // 5 secondes entre chaque transition
    };

    let currentSlide = 0;
    let autoplayInterval;
    const carousel = document.querySelector('.carousel');
    
    // Initialiser le carrousel
    function initializeCarousel() {
        // Créer les slides
        carouselConfig.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.caption}">
                <div class="carousel-caption">
                    <h4>${image.caption}</h4>
                </div>
            `;
            
            carousel.appendChild(slide);
        });

        // Créer les points de navigation
        const dotsContainer = document.querySelector('.carousel-dots');
        carouselConfig.images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Démarrer l'autoplay
        startAutoplay();
    }

    // Gérer l'autoplay
    function startAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        autoplayInterval = setInterval(nextSlide, carouselConfig.autoplayDelay);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Mettre à jour les slides
    function updateSlides() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Navigation
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        stopAutoplay();
        startAutoplay();
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + carouselConfig.images.length) % carouselConfig.images.length;
        updateSlides();
        stopAutoplay();
        startAutoplay();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselConfig.images.length;
        updateSlides();
        stopAutoplay();
        startAutoplay();
    }

    // Initialiser le carrousel
    initializeCarousel();

    // Ajouter les écouteurs d'événements
    document.querySelector('.prev').addEventListener('click', previousSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Gestion du formulaire
    const form = document.querySelector('.adoption-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            chat: form.querySelector('select').value,
            raison: form.querySelector('textarea').value
        };
        
        if (formData.chat && formData.raison) {
            console.log('Formulaire soumis :', formData);
            alert('Votre demande d\'adoption a été envoyée !');
            form.reset();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });

    // Pause de l'autoplay lors du survol
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
});