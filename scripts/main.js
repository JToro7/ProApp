// main.js - JavaScript compartido para todas las páginas de ProApp

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const isOpen = menu.classList.contains('active');
    
    menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);
    
    // Cambiar icono
    const icon = toggle.querySelector('svg');
    if (!isOpen) {
        icon.innerHTML = '<path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        toggle.querySelector('.sr-only').textContent = 'Cerrar menú de navegación';
    } else {
        icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        toggle.querySelector('.sr-only').textContent = 'Abrir menú de navegación';
    }
}

// FAQ Toggle (para páginas que lo necesiten)
function toggleFAQ(button, answerId) {
    const answer = document.getElementById(answerId);
    const icon = button.querySelector('.faq-icon');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Cerrar todas las otras preguntas
    document.querySelectorAll('.faq-question').forEach(otherButton => {
        if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherButton.querySelector('.faq-icon').textContent = '+';
            const otherAnswerId = otherButton.getAttribute('aria-controls');
            const otherAnswer = document.getElementById(otherAnswerId);
            if (otherAnswer) {
                otherAnswer.classList.remove('active');
            }
        }
    });
    
    // Toggle la pregunta actual
    if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answer.classList.remove('active');
        icon.textContent = '+';
    } else {
        button.setAttribute('aria-expanded', 'true');
        answer.classList.add('active');
        icon.textContent = '−';
    }
}

// Start chat simulation (para páginas de contacto)
function startChat() {
    alert('Chat iniciado - Esta es una demo. En una aplicación real, esto abriría el widget de chat en vivo.');
}

// Validación de campos de formulario
function validateField(input, rules) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value) {
        isValid = false;
        const labelText = input.labels[0] ? input.labels[0].textContent.replace(' *', '') : 'Este campo';
        errorMessage = `${labelText} es requerido`;
    }
    
    // Email validation
    if (rules.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un email válido';
        }
    }
    
    // Password validation
    if (rules.password && value) {
        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        
        if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumbers) {
            isValid = false;
            errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números';
        }
    }
    
    // Min length validation
    if (rules.minLength && value.length < rules.minLength && value.length > 0) {
        isValid = false;
        errorMessage = `Debe tener al menos ${rules.minLength} caracteres`;
    }
    
    // Show/hide error
    const errorElement = document.getElementById(input.id + '-error');
    if (errorElement) {
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.style.display = 'none';
            input.setAttribute('aria-invalid', 'false');
        } else {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'flex';
            input.setAttribute('aria-invalid', 'true');
        }
    }
    
    return isValid;
}

// Simulación de envío de formularios
function simulateFormSubmission(formType) {
    const loadingElement = document.getElementById(`${formType}-loading`);
    const successElement = document.getElementById(`${formType}-success`);
    const submitButton = document.querySelector(`#${formType}-form button[type="submit"]`);
    const form = document.getElementById(`${formType}-form`);
    
    // Show loading
    if (loadingElement) loadingElement.classList.add('active');
    if (submitButton) submitButton.disabled = true;
    
    // Simulate processing
    setTimeout(() => {
        if (loadingElement) loadingElement.classList.remove('active');
        
        if (formType === 'register') {
            if (successElement) {
                successElement.style.display = 'flex';
                setTimeout(() => {
                    // Redirigir al dashboard
                    window.location.href = 'dashboard.html?registered=true';
                }, 2000);
            }
        } else {
            if (successElement) successElement.style.display = 'flex';
            
            // Reset form
            if (form) {
                form.reset();
                // Clear validation states
                form.querySelectorAll('.form-input').forEach(input => {
                    input.classList.remove('error', 'success');
                    input.removeAttribute('aria-invalid');
                });
                form.querySelectorAll('.form-error').forEach(error => {
                    error.style.display = 'none';
                });
            }
            
            // Hide success message after 5 seconds for contact forms
            if (formType === 'contact') {
                setTimeout(() => {
                    if (successElement) successElement.style.display = 'none';
                }, 5000);
            }
        }
        
        if (submitButton) submitButton.disabled = false;
    }, 2000);
}

// Simulación de login
function simulateLogin(email, password) {
    const loadingElement = document.getElementById('login-loading');
    const errorElement = document.getElementById('login-error');
    const submitButton = document.querySelector('#login-form button[type="submit"]');
    
    // Show loading
    if (loadingElement) loadingElement.classList.add('active');
    if (submitButton) submitButton.disabled = true;
    if (errorElement) errorElement.style.display = 'none';
    
    setTimeout(() => {
        if (loadingElement) loadingElement.classList.remove('active');
        if (submitButton) submitButton.disabled = false;
        
        // Demo credentials
        if (email === 'demo@proapp.com' && password === 'Demo123456') {
            // Redirigir al dashboard
            window.location.href = 'dashboard.html?logged=true';
        } else {
            if (errorElement) errorElement.style.display = 'block';
        }
    }, 1500);
}

// Setup para formulario de contacto
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    
    // Validation on blur
    nameInput?.addEventListener('blur', () => validateField(nameInput, { required: true }));
    emailInput?.addEventListener('blur', () => validateField(emailInput, { required: true, email: true }));
    subjectInput?.addEventListener('blur', () => validateField(subjectInput, { required: true }));
    messageInput?.addEventListener('blur', () => validateField(messageInput, { required: true, minLength: 10 }));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameValid = validateField(nameInput, { required: true });
        const emailValid = validateField(emailInput, { required: true, email: true });
        const subjectValid = validateField(subjectInput, { required: true });
        const messageValid = validateField(messageInput, { required: true, minLength: 10 });
        
        if (nameValid && emailValid && subjectValid && messageValid) {
            simulateFormSubmission('contact');
        }
    });
}

// Setup para formulario de registro
function setupRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;
    
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const companyInput = document.getElementById('register-company');
    const passwordInput = document.getElementById('register-password');
    const termsInput = document.getElementById('register-terms');
    
    // Validation on blur
    nameInput?.addEventListener('blur', () => validateField(nameInput, { required: true, minLength: 2 }));
    emailInput?.addEventListener('blur', () => validateField(emailInput, { required: true, email: true }));
    companyInput?.addEventListener('blur', () => validateField(companyInput, { required: true }));
    passwordInput?.addEventListener('blur', () => validateField(passwordInput, { required: true, password: true }));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameValid = validateField(nameInput, { required: true, minLength: 2 });
        const emailValid = validateField(emailInput, { required: true, email: true });
        const companyValid = validateField(companyInput, { required: true });
        const passwordValid = validateField(passwordInput, { required: true, password: true });
        
        // Check terms
        const termsValid = termsInput.checked;
        const termsError = document.getElementById('register-terms-error');
        if (!termsValid) {
            if (termsError) {
                termsError.style.display = 'flex';
                termsError.textContent = 'Debes aceptar los términos para continuar';
            }
        } else {
            if (termsError) termsError.style.display = 'none';
        }
        
        if (nameValid && emailValid && companyValid && passwordValid && termsValid) {
            simulateFormSubmission('register');
        }
    });
}

// Setup para formulario de login
function setupLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;
    
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    // Validation on blur
    emailInput?.addEventListener('blur', () => validateField(emailInput, { required: true, email: true }));
    passwordInput?.addEventListener('blur', () => validateField(passwordInput, { required: true }));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailValid = validateField(emailInput, { required: true, email: true });
        const passwordValid = validateField(passwordInput, { required: true });
        
        if (emailValid && passwordValid) {
            simulateLogin(emailInput.value, passwordInput.value);
        }
    });
}

// Setup para dashboard (verificar autenticación)
function setupDashboard() {
    // Verificar si el usuario está autenticado
    const urlParams = new URLSearchParams(window.location.search);
    const isLogged = urlParams.get('logged') === 'true' || 
                   urlParams.get('registered') === 'true' ||
                   localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLogged) {
        // Redirigir al login si no está autenticado
        window.location.href = 'login.html?redirect=dashboard';
        return;
    }

    // Configurar dashboard
    console.log('Dashboard cargado');
    
    // Simular datos del usuario
    const userName = 'Usuario Demo';
    const welcomeHeading = document.querySelector('h1');
    if (welcomeHeading && welcomeHeading.textContent.includes('Bienvenido')) {
        welcomeHeading.textContent = `Bienvenido de vuelta, ${userName}`;
    }
}

// Navegación con teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key para cerrar mobile menu
        if (e.key === 'Escape') {
            const menu = document.getElementById('nav-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (menu && menu.classList.contains('active')) {
                toggleMobileMenu();
                toggle.focus();
            }
        }
    });
}

// Manejo de resize para mobile menu
function setupResizeHandler() {
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const menu = document.getElementById('nav-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                // Reset icon
                const icon = toggle.querySelector('svg');
                icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
                toggle.querySelector('.sr-only').textContent = 'Abrir menú de navegación';
            }
        }
    });
}

// Función para detectar la página actual y configurar navegación activa
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.removeAttribute('aria-current');
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        const linkPage = href.replace('.html', '').replace('./', '');
        
        // Mapear páginas a links de navegación
        const pageMapping = {
            'index': ['inicio', 'index'],
            'features': ['características', 'features'],
            'pricing': ['precios', 'pricing'],
            'contact': ['contacto', 'contact'],
            'login': ['iniciar sesión', 'login'],
            'register': ['registro', 'register']
        };
        
        const linkText = link.textContent.toLowerCase();
        const expectedTexts = pageMapping[currentPage] || [currentPage];
        
        if (expectedTexts.some(text => linkText.includes(text)) || 
            linkPage === currentPage ||
            (currentPage === 'index' && (linkPage === 'index' || linkPage === ''))) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Función para anunciar cambios a lectores de pantalla
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Setup básico para todas las páginas
    setupKeyboardNavigation();
    setupResizeHandler();
    setActiveNavigation();
    
    // Setup específico según la página
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    switch(currentPage) {
        case 'contact':
            setupContactForm();
            break;
        case 'register':
            setupRegisterForm();
            break;
        case 'login':
            setupLoginForm();
            break;
        case 'dashboard':
            setupDashboard();
            break;
    }
    
    // Anunciar que la página está lista
    announceToScreenReader('Página cargada');
});