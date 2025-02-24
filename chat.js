document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carrousel
    const carouselConfig = {
        images: [
            { src: 'images/chats/chat_1', caption: 'Sushi' },
            { src: 'images/chats/chat_2', caption: 'Maki' },
            { src: 'images/chats/chat_3', caption: 'Sashimi' },
            { src: 'images/chats/chat_4', caption: 'Yakitori' },
            { src: 'images/chats/chat_5', caption: 'Tempura' }
        ],
        autoplayDelay: 5000 // 5 secondes entre chaque transition
    };

    // Initialiser le carrousel Bootstrap
    function initializeCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        
        // Créer les slides
        carouselConfig.images.forEach((image, index) => {
            // Créer le slide
            const slide = document.createElement('div');
            slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            slide.innerHTML = `
                <img src="${image.src}" class="d-block w-100" alt="${image.caption}">
                <div class="carousel-caption">
                    <h4>${image.caption}</h4>
                </div>
            `;
            
            carouselInner.appendChild(slide);
            
            // Créer l'indicateur
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            }
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            
            carouselIndicators.appendChild(indicator);
        });
    }

    // Initialiser le carrousel
    initializeCarousel();
    
    // Initialiser le composant Bootstrap Carousel
    const bsCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: carouselConfig.autoplayDelay,
        pause: 'hover'
    });

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
});