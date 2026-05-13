/**
 * Dashboard Logic
 * Single-page dynamic section switching
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardNav();
    initFileUpload();
    initStitchingReview();
    initSidebarToggle();
});

function initSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (toggle && sidebar && overlay) {
        const toggleMenu = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        };

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }
}

function initDashboardNav() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.section;

            // Update Menu
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update Content
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) {
                    sec.classList.add('active');
                }
            });

            // Close sidebar on mobile
            const sidebar = document.querySelector('.dashboard-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
}

function initFileUpload() {
    const dropzone = document.getElementById('upload-dropzone');
    const grid = document.querySelector('.upload-grid');

    if (!dropzone) return;

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#7c3aed';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        handleFiles(e.dataTransfer.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const item = document.createElement('div');
                    item.className = 'upload-item';
                    item.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <div class="upload-progress" style="width: 100%"></div>
                    `;
                    grid.appendChild(item);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function initStitchingReview() {
    // Mock stitching progress/comparison
    const progressBars = document.querySelectorAll('.stitching-progress');
    progressBars.forEach(bar => {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 1;
                bar.style.width = width + '%';
            }
        }, 30);
    });
}
