document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change icon on toggle
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                // Prevent default anchor click behavior if it's a page anchor
                if (this.pathname === window.location.pathname && this.hash) {
                    e.preventDefault();
                    const targetElement = document.querySelector(this.hash);
                    if (targetElement) {
                        // Close mobile nav if open
                        if (mainNav && mainNav.classList.contains('active')) {
                            mainNav.classList.remove('active');
                            menuToggle.querySelector('i').classList.remove('fa-times');
                            menuToggle.querySelector('i').classList.add('fa-bars');
                        }

                        let offset = 0;
                        const header = document.querySelector('.top-header');
                        if (header && getComputedStyle(header).position === 'sticky') {
                            offset = header.offsetHeight;
                        }
                        
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            }
        });
    });


    // Live Search Filter
    const searchInput = document.getElementById('toolSearch');
    const toolCards = document.querySelectorAll('.tool-card');
    const toolCategories = document.querySelectorAll('.tool-category');

    if (searchInput && toolCards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            toolCategories.forEach(category => {
                let categoryHasVisibleTool = false;
                const cardsInCategory = category.querySelectorAll('.tool-card');
                
                cardsInCategory.forEach(card => {
                    const toolName = card.querySelector('h3').textContent.toLowerCase();
                    const toolDescription = card.querySelector('p').textContent.toLowerCase();
                    const keywords = card.dataset.keywords ? card.dataset.keywords.toLowerCase() : '';
                    
                    const isMatch = toolName.includes(searchTerm) || 
                                    toolDescription.includes(searchTerm) ||
                                    keywords.includes(searchTerm);

                    if (isMatch) {
                        card.classList.remove('hidden-tool');
                        categoryHasVisibleTool = true;
                    } else {
                        card.classList.add('hidden-tool');
                    }
                });

                // Hide category if no tools match
                if (categoryHasVisibleTool) {
                    category.style.display = '';
                } else {
                    category.style.display = 'none';
                }
            });

             // If search is empty, show all categories and tools
            if (searchTerm === "") {
                toolCategories.forEach(category => category.style.display = '');
                toolCards.forEach(card => card.classList.remove('hidden-tool'));
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
