/**
 * Project: Freelance 360° Virtual Tour Creator
 * Main Interactions & Immersive Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initRTL();
    initScrollReveal();
    initPortfolioFilter();
    initHotspots();
    initBackToTop();
    initMobileNav();
    initLayerSwap();
});

// --- Navbar Scroll Effect ---
function initNavbar() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Theme Management ---
function initTheme() {
    const themeBtns = document.querySelectorAll('.theme-toggle');
    if (themeBtns.length === 0) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    });
}

// --- RTL Management ---
function initRTL() {
    const rtlBtns = document.querySelectorAll('.rtl-toggle');
    if (rtlBtns.length === 0) return;
    
    const currentDir = localStorage.getItem('dir') || 'ltr';
    if (currentDir === 'rtl') {
        document.body.classList.add('rtl');
        document.documentElement.dir = 'rtl';
    }

    rtlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('rtl');
            const dir = document.body.classList.contains('rtl') ? 'rtl' : 'ltr';
            document.documentElement.dir = dir;
            localStorage.setItem('dir', dir);
        });
    });
}

// --- Scroll Reveal Animations ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.view-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

// --- Portfolio Filtering ---
function initPortfolioFilter() {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// --- Hotspot Interactions ---
function initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hs => {
        hs.addEventListener('click', () => {
            const info = hs.querySelector('.hotspot-info');
            info.style.opacity = info.style.opacity === '1' ? '0' : '1';
            info.style.visibility = info.style.visibility === 'visible' ? 'hidden' : 'visible';
        });
    });
}

// --- Back to Top Logic ---
function initBackToTop() {
    const btn = document.createElement('div');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- Mobile Navigation ---
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const toggleIcon = toggle?.querySelector('i');
    const close = document.querySelector('.mobile-nav-close');
    const menu = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !menu || !overlay) return;

    const toggleMenu = () => {
        const isOpen = menu.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const openMenu = () => {
        menu.classList.add('active');
        overlay.classList.add('active');
        if (toggleIcon) {
            toggleIcon.classList.remove('bi-list');
            toggleIcon.classList.add('bi-x-lg');
        }
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        if (toggleIcon) {
            toggleIcon.classList.remove('bi-x-lg');
            toggleIcon.classList.add('bi-list');
        }
        document.body.style.overflow = 'auto';
    };

    toggle.addEventListener('click', toggleMenu);
    close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
}

// --- Form Validation ---
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock submission
        alert('Request received! Our spatial architects will contact you shortly.');
        form.reset();
    });
});

// --- Password Visibility Toggle ---
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

// --- Interactive Layer Swap ---
function initLayerSwap() {
    const layers = document.querySelectorAll('.floating-layer');
    if (layers.length === 0) return;

    layers.forEach(layer => {
        layer.addEventListener('click', () => {
            layers.forEach(l => {
                l.classList.remove('active-layer');
                l.style.zIndex = l.dataset.originalZ || '';
            });
            layer.classList.add('active-layer');
            layer.style.zIndex = '10';
        });
        // Store original z-index for resetting
        layer.dataset.originalZ = window.getComputedStyle(layer).zIndex;
    });
}
