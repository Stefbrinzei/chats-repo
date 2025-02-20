// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carrousel avec des images placeholder
    const carouselConfig = {
        images: [
            { src: '/api/placeholder/800/450', caption: 'Sushi' },
            { src: '/api/placeholder/800/450', caption: 'Maki' },
            { src: '/api/placeholder/800/450', caption: 'Sashimi' },
            { src: '/api/placeholder/800/450', caption: 'Yakitori' },
            { src: '/api/placeholder/800/450', caption: 'Tempura' }
        ]
    };

    let currentSlide = 0;
    const carousel = document.querySelector('.carousel');
    
    // Créer la structure initiale du carrousel
    function initializeCarousel() {
        // Vider le carrousel existant
        carousel.innerHTML = '';
        
        // Créer les slides avec position absolute
        carouselConfig.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            // Positionnement initial des slides
            if (index === 0) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
            
            slide.innerHTML = `
                <img src="${image.src}" alt="${image.caption}">
                <div class="carousel-caption">
                    <h4>${image.caption}</h4>
                </div>
            `;
            
            carousel.appendChild(slide);
        });
    }

    // Mettre à jour l'affichage des slides
    function updateSlides() {
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        updateDots();
    }

    // Mettre à jour les points de navigation
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Navigation vers une slide spécifique
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Navigation précédente
    function previousSlide() {
        currentSlide = (currentSlide - 1 + carouselConfig.images.length) % carouselConfig.images.length;
        updateSlides();
    }

    // Navigation suivante
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselConfig.images.length;
        updateSlides();
    }

    // Initialiser le carrousel
    initializeCarousel();

    // Ajouter les écouteurs d'événements pour les boutons de navigation
    document.querySelector('.prev').addEventListener('click', previousSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // Ajouter les écouteurs pour les points
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Ajout des styles CSS nécessaires directement dans le JavaScript
    const carouselStyles = `
        .carousel {
            position: relative;
            width: 100%;
            height: 450px;
            overflow: hidden;
            background: #f5f5f5;
        }
        .carousel-slide {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `;

    // Ajouter les styles au head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = carouselStyles;
    document.head.appendChild(styleSheet);

    // Gestion du formulaire
    const form = document.querySelector('.adoption-form');
    if (form) {
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
    }
});