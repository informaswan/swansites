// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const successMessage = document.getElementById('successMessage');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validate name
        function validateName() {
            const name = nameInput.value.trim();
            if (name === '') {
                nameError.textContent = 'Name is required';
                nameInput.setAttribute('aria-invalid', 'true');
                return false;
            } else {
                nameError.textContent = '';
                nameInput.setAttribute('aria-invalid', 'false');
                return true;
            }
        }
        
        // Validate email
        function validateEmail() {
            const email = emailInput.value.trim();
            if (email === '') {
                emailError.textContent = 'Email is required';
                emailInput.setAttribute('aria-invalid', 'true');
                return false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.setAttribute('aria-invalid', 'true');
                return false;
            } else {
                emailError.textContent = '';
                emailInput.setAttribute('aria-invalid', 'false');
                return true;
            }
        }
        
        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        
        // Clear errors on input
        nameInput.addEventListener('input', function() {
            if (nameInput.value.trim() !== '') {
                nameError.textContent = '';
                nameInput.setAttribute('aria-invalid', 'false');
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (emailInput.value.trim() !== '') {
                emailError.textContent = '';
                emailInput.setAttribute('aria-invalid', 'false');
            }
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            
            if (isNameValid && isEmailValid) {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Optional: Reset form after a delay (uncomment if needed)
                // setTimeout(function() {
                //     form.reset();
                //     form.style.display = 'block';
                //     successMessage.style.display = 'none';
                // }, 5000);
            } else {
                // Focus on first invalid field
                if (!isNameValid) {
                    nameInput.focus();
                } else if (!isEmailValid) {
                    emailInput.focus();
                }
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Add keyboard navigation enhancements
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
});