// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const successMessage = document.getElementById('successMessage');
        const submitButton = form.querySelector('.submit-button');
        
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
        
        // Form submission with EmailJS
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            
            if (isNameValid && isEmailValid) {
                // Disable submit button and show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Prepare template parameters
                const templateParams = {
                    from_name: nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    message: messageInput.value.trim() || 'No message provided',
                    to_name: 'SwanSites' // You can customize this
                };
                
                // Send email using EmailJS
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Hide form and show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        
                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Reset form
                        form.reset();
                        
                        // Optional: Reset after delay
                        setTimeout(function() {
                            form.style.display = 'block';
                            successMessage.style.display = 'none';
                            submitButton.disabled = false;
                            submitButton.textContent = 'Send Message';
                        }, 5000);
                        
                    }, function(error) {
                        console.error('FAILED...', error);
                        
                        // Show error message
                        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
                        
                        // Re-enable submit button
                        submitButton.disabled = false;
                        submitButton.textContent = 'Send Message';
                    });
                    
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