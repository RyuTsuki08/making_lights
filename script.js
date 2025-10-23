window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Carrusel de servicios
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
});


// Validación dinámica del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Aquí puedes agregar lógica para enviar el formulario
                alert('Formulario enviado correctamente. ¡Gracias por contactarnos!');
                form.reset();
            } else {
                alert('Por favor, corrige los errores en el formulario.');
            }
        });
    }
});


function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.id) {
        case 'nombre':
        case 'apellido':
            if (value === '') {
                isValid = false;
                errorMessage = 'Este campo es obligatorio.';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Debe tener al menos 2 caracteres.';
            }
            break;
        case 'telefono':
            if (value === '') {
                isValid = false;
                errorMessage = 'Este campo es obligatorio.';
            } else if (!/^\+?\d{7,15}$/.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un número de teléfono válido.';
            }
            break;
        case 'correo':
            if (value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un correo electrónico válido.';
            }
            break;
        default:
            // Para otros campos opcionales, no hay validación específica
            break;
    }

    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        removeErrorMessage(field);
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        showErrorMessage(field, errorMessage);
    }

    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Carrusel de productos
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const productCards = document.querySelectorAll('.product-card');

    if (carousel && prevBtn && nextBtn && productCards.length > 0) {
        let currentIndex = 0;
        const totalCards = productCards.length;
        const cardWidth = productCards[0].offsetWidth + 20; // Ancho de la tarjeta + margen

        function updateCarousel() {
            const translateX = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${translateX}px)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-play opcional
        let autoPlayInterval = setInterval(nextSlide, 5000);

        // Pausar auto-play al hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });

        // Soporte para touch en móviles
        let startX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                isDragging = false;
            }
        });

        carousel.addEventListener('touchend', () => {
            isDragging = false;
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }
});

// Carrusel de slides principal
document.addEventListener('DOMContentLoaded', function() {
    const carouselSection = document.getElementById('carousel-section');
    if (carouselSection) {
        const carouselTrack = carouselSection.querySelector('.carousel-track');
        const prevBtn = carouselSection.querySelector('.carousel-btn.prev');
        const nextBtn = carouselSection.querySelector('.carousel-btn.next');
        const slides = carouselSection.querySelectorAll('.carousel-slide');

        if (carouselTrack && prevBtn && nextBtn && slides.length > 0) {
            let currentIndex = 0;
            const totalSlides = slides.length;

            function updateCarousel() {
                const translateX = -currentIndex * 100;
                carouselTrack.style.transform = `translateX(${translateX}%)`;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Auto-play opcional
            let autoPlayInterval = setInterval(nextSlide, 6000);

            // Pausar auto-play al hover
            carouselSection.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carouselSection.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 6000);
            });

            // Soporte para touch en móviles
            let startX = 0;
            let isDragging = false;

            carouselTrack.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                clearInterval(autoPlayInterval);
            });

            carouselTrack.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const diff = startX - currentX;

                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    isDragging = false;
                }
            });

            carouselTrack.addEventListener('touchend', () => {
                isDragging = false;
                autoPlayInterval = setInterval(nextSlide, 6000);
            });
        }
    }
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('show');
    });

    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('show');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Generate bot response
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Generate bot response based on user input
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Productos
        if (message.includes('producto') || message.includes('comprar') || message.includes('precio')) {
            if (message.includes('basico') || message.includes('átomocubo básico')) {
                return 'El ÁtomoCubo Básico cuesta $29.99. Es perfecto para principiantes y incluye 50 piezas modulares. ¿Te gustaría saber más detalles o ver otros productos?';
            }
            if (message.includes('pro') || message.includes('avanzado')) {
                return 'El ÁtomoCubo Pro tiene un precio de $79.99. Incluye componentes electrónicos para proyectos interactivos. ¿Te interesa este producto?';
            }
            if (message.includes('educativo') || message.includes('escuela')) {
                return 'Nuestro Kit Educativo está diseñado para instituciones educativas y cuesta $149.99. Incluye guías pedagógicas completas. ¿Necesitas más información para tu institución?';
            }
            return 'Tenemos varios productos disponibles: ÁtomoCubo Básico ($29.99), ÁtomoCubo Pro ($79.99), Kit Educativo ($149.99) y Accesorios Personalizados. ¿Cuál te interesa más?';
        }

        // Servicios
        if (message.includes('servicio') || message.includes('hacer') || message.includes('ofrecen')) {
            return 'Ofrecemos servicios de Diseño 3D, Impresión 3D, Consultoría especializada y Prototipado rápido. ¿En qué área necesitas ayuda?';
        }

        // Promociones
        if (message.includes('promocion') || message.includes('descuento') || message.includes('oferta')) {
            return '¡Tenemos una promoción especial! 15% de descuento en tu primera compra de cualquier producto. También ofrecemos paquetes educativos con descuento para instituciones. ¿Te gustaría aprovechar alguna oferta?';
        }

        // Contacto
        if (message.includes('contacto') || message.includes('hablar') || message.includes('llamar')) {
            return 'Puedes contactarnos a través de nuestro formulario en la página de contacto, por email a info@makinglights.com o llamando al +58 123 456 7890. ¿Prefieres algún método específico?';
        }

        // Saludos y despedidas
        if (message.includes('hola') || message.includes('buenos') || message.includes('saludos')) {
            return '¡Hola! Soy el asistente virtual de Making Lights. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros productos, servicios o promociones.';
        }

        if (message.includes('gracias') || message.includes('adios') || message.includes('chau')) {
            return '¡Fue un placer ayudarte! Si tienes más preguntas, no dudes en volver a contactarme. ¡Hasta luego!';
        }

        // Default response
        return 'Entiendo tu consulta. ¿Podrías darme más detalles sobre lo que necesitas? Puedo ayudarte con información sobre productos, servicios, promociones o contactar a nuestro equipo.';
    }

    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial greeting
    setTimeout(() => {
        addMessage('¡Hola! Soy el asistente virtual de Making Lights. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros productos, servicios o promociones.', 'bot');
    }, 1000);
});