// Main JavaScript file for Tu Licencia

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Handle header scroll effect
    const header = document.querySelector('header');
    
    const handleScroll = () => {
        const hasScrolled = window.scrollY > 10;
        
        // Set or remove classes based on scroll position
        if (hasScrolled) {
            header.classList.add('shadow-md', 'bg-opacity-95');
            document.cookie = "has_scrolled=true; path=/";
        } else {
            header.classList.remove('shadow-md', 'bg-opacity-95');
            document.cookie = "has_scrolled=false; path=/";
        }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Initialize any Swiper sliders
    initSwipers();
    
    // Initialize Lottie animations
    initLottieAnimations();
});

// Initialize Swiper sliders
function initSwipers() {
    // Check if Swiper is loaded and if there are any swiper containers
    if (typeof Swiper !== 'undefined' && document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }
}

// Initialize Lottie animations
function initLottieAnimations() {
    // Check if LottieInteractivity is loaded
    if (typeof LottieInteractivity !== 'undefined') {
        const lottieContainers = document.querySelectorAll('.lottie-animation');
        
        lottieContainers.forEach(container => {
            LottieInteractivity.create({
                player: container.querySelector('lottie-player'),
                mode: 'scroll',
                actions: [
                    {
                        visibility: [0, 1.0],
                        type: 'play'
                    }
                ]
            });
        });
    }
}

// Form validation helper
function validateForm(formElement, validationRules) {
    const errors = {};
    const formData = new FormData(formElement);
    
    for (const [field, rules] of Object.entries(validationRules)) {
        const value = formData.get(field);
        
        if (rules.required && (!value || value.trim() === '')) {
            errors[field] = 'This field is required';
            continue;
        }
        
        if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors[field] = 'Please enter a valid email address';
            continue;
        }
        
        if (rules.minLength && value && value.length < rules.minLength) {
            errors[field] = `This field must be at least ${rules.minLength} characters`;
            continue;
        }
        
        if (rules.pattern && value && !new RegExp(rules.pattern).test(value)) {
            errors[field] = rules.patternMessage || 'Invalid format';
            continue;
        }
        
        if (rules.match && formData.get(rules.match) !== value) {
            errors[field] = rules.matchMessage || 'Fields do not match';
            continue;
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Display form validation errors
function displayFormErrors(form, errors) {
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.form-error').forEach(el => el.classList.remove('form-error'));
    
    // Display new errors
    for (const [field, message] of Object.entries(errors)) {
        const inputElement = form.querySelector(`[name="${field}"]`);
        if (inputElement) {
            inputElement.classList.add('form-error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            errorElement.textContent = message;
            
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
    }
}

// AJAX helper function
function ajax(url, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        
        // Set default headers for JSON
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        // Set custom headers
        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } catch (e) {
                    resolve(xhr.responseText);
                }
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: xhr.responseText
                });
            }
        };
        
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText,
                response: xhr.responseText
            });
        };
        
        if (data) {
            xhr.send(typeof data === 'string' ? data : JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
} 