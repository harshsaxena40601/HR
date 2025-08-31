// Enhanced tilt animation function
function initTiltAnimation() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = (x - centerX) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Add depth effect to icons
            const icons = card.querySelectorAll('.feature-icon, .icon-container');
            icons.forEach(icon => {
                icon.style.transform = `translateZ(50px)`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
            
            // Reset icon position
            const icons = card.querySelectorAll('.feature-icon, .icon-container');
            icons.forEach(icon => {
                icon.style.transform = `translateZ(20px)`;
            });
        });
    });
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        // Add custom styles to the button
        mobileMenuBtn.style.background = 'transparent';
        mobileMenuBtn.classList.add('hover:bg-transparent', 'focus:outline-none');
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                requestAnimationFrame(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'scaleY(1)';
                });
            } else {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'scaleY(0.95)';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
            
            // Update button icon with adjusted styles
            mobileMenuBtn.innerHTML = isMenuOpen 
                ? `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                   </svg>`
                : `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                   </svg>`;
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                isMenuOpen = false;
                mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>`;
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
                isMenuOpen = false;
                mobileMenuBtn.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>`;
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-gray-900', 'bg-opacity-95');
        } else {
            navbar.classList.remove('bg-gray-900', 'bg-opacity-95');
        }
    });

    // Modal functionality
    const modal = document.getElementById('auth-modal');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const closeModal = document.getElementById('close-modal');

    if (modal && loginTab && registerTab && loginForm && registerForm && closeModal) {
        // Toggle modal
        document.querySelectorAll('[data-modal-target]').forEach(button => {
            button.addEventListener('click', () => {
                modal.classList.remove('hidden');
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Switch between login and register
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('bg-white', 'text-purple-600');
            registerTab.classList.remove('bg-white', 'text-purple-600');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('bg-white', 'text-purple-600');
            loginTab.classList.remove('bg-white', 'text-purple-600');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }

    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTiltAnimation();
});