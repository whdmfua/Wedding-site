// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Active page highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Language switching logic
    const pageMapping = {
        'index.html': 'index-th.html',
        'our-story.html': 'our-story-th.html',
        'gallery.html': 'gallery-th.html',
        'guestbook.html': 'guestbook-th.html',
        // Reverse mapping
        'index-th.html': 'index.html',
        'our-story-th.html': 'our-story.html',
        'gallery-th.html': 'gallery.html',
        'guestbook-th.html': 'guestbook.html'
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetLang = this.getAttribute('data-lang');
            const currentPageName = window.location.pathname.split('/').pop() || 'index.html';
            const hash = window.location.hash; // Preserve anchor links

            // Determine target page
            let targetPage;
            if (targetLang === 'th') {
                // Switch to Thai
                targetPage = pageMapping[currentPageName] || 'index-th.html';
            } else {
                // Switch to Korean
                targetPage = pageMapping[currentPageName] || 'index.html';
            }

            // Navigate to target page with hash preserved
            window.location.href = targetPage + hash;
        });
    });
});
