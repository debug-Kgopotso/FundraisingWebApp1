// ============================================
// MODERN BRYANSTON HIGH FUNDRAISER
// Interactive Features - ALL STARTING AT ZERO
// ============================================

(function() {
    'use strict';

    // ===== STATE - ALL STARTING AT ZERO =====
    let fundraiser = {
        raised: 0,
        target: 25000,
        supporters: 0,
        ticketsSold: 0
    };

    // ===== NAV TOGGLE (Mobile) =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== UPDATE PROGRESS =====
    function updateProgress() {
        const raisedEl = document.getElementById('raisedAmount');
        if (raisedEl) {
            raisedEl.textContent = 'R ' + fundraiser.raised.toLocaleString();
        }

        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const percent = Math.min((fundraiser.raised / fundraiser.target) * 100, 100);
            progressFill.style.width = percent + '%';
        }

        const percentEl = document.getElementById('progressPercent');
        if (percentEl) {
            const percent = Math.min((fundraiser.raised / fundraiser.target) * 100, 100);
            percentEl.textContent = Math.round(percent);
        }

        const supportersEl = document.getElementById('supportersCount');
        if (supportersEl) {
            supportersEl.textContent = fundraiser.supporters;
        }

        // Tickets page
        const totalTicketsEl = document.getElementById('totalTicketsSold');
        if (totalTicketsEl) {
            totalTicketsEl.textContent = fundraiser.ticketsSold;
        }

        const ticketsRemainingEl = document.getElementById('ticketsRemaining');
        if (ticketsRemainingEl) {
            const remaining = 500 - fundraiser.ticketsSold;
            ticketsRemainingEl.textContent = remaining;
        }
    }

    // ===== TICKET QUANTITY SELECTOR =====
    const qtyInput = document.getElementById('ticketQty');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const summaryQty = document.getElementById('summaryQty');
    const summaryTotal = document.getElementById('summaryTotal');

    function updatePrice() {
        if (qtyInput && totalPriceDisplay) {
            const qty = parseInt(qtyInput.value) || 1;
            const total = qty * 50;
            totalPriceDisplay.textContent = 'R ' + total;
            
            if (summaryQty) summaryQty.textContent = qty;
            if (summaryTotal) summaryTotal.textContent = 'R ' + total;
        }
    }

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', function() {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
                updatePrice();
            }
        });

        qtyPlus.addEventListener('click', function() {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 50) {
                qtyInput.value = val + 1;
                updatePrice();
            }
        });

        qtyInput.addEventListener('change', function() {
            let val = parseInt(this.value) || 1;
            if (val < 1) val = 1;
            if (val > 50) val = 50;
            this.value = val;
            updatePrice();
        });
    }

    // ===== TICKET TYPE SELECTION =====
    const ticketCards = document.querySelectorAll('.ticket-type-card');
    
    ticketCards.forEach(card => {
        card.addEventListener('click', function() {
            ticketCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update quantity based on selection
            if (qtyInput) {
                if (this.id === 'ticketTypeSingle') qtyInput.value = 1;
                else if (this.id === 'ticketTypeBundle5') qtyInput.value = 5;
                else if (this.id === 'ticketTypeBundle10') qtyInput.value = 10;
                updatePrice();
            }
        });
    });

    // ===== TICKET FORM SUBMISSION =====
    const ticketForm = document.getElementById('ticketForm');
    const ticketMessage = document.getElementById('ticketMessage');
    const messageText = document.getElementById('messageText');

    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('ticketName').value.trim() || 'John Doe';
            const email = document.getElementById('ticketEmail').value.trim() || 'john@example.com';
            const qty = parseInt(document.getElementById('ticketQty').value) || 1;
            const total = qty * 50;
            
            // Update fundraiser stats
            fundraiser.raised += total;
            fundraiser.supporters += qty;
            fundraiser.ticketsSold += qty;
            updateProgress();
            
            // Show success message
            if (ticketMessage && messageText) {
                messageText.textContent = `Thank you, ${name}! You purchased ${qty} ticket(s) for R${total}. A confirmation email has been sent to ${email}.`;
                ticketMessage.className = 'ticket-message show';
                
                setTimeout(() => {
                    ticketMessage.classList.remove('show');
                }, 8000);
            }
            
            // Reset form
            document.getElementById('ticketName').value = '';
            document.getElementById('ticketEmail').value = '';
            document.getElementById('ticketPhone').value = '';
            if (qtyInput) qtyInput.value = 1;
            updatePrice();
            
            // Reset ticket selection
            ticketCards.forEach(c => {
                c.classList.remove('selected');
            });
            const singleCard = document.getElementById('ticketTypeSingle');
            if (singleCard) singleCard.classList.add('selected');
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // ===== NEWSLETTER FORM =====
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input) {
                alert(`Thank you, ${input.value || 'John Doe'}! You've been added to our newsletter.`);
                input.value = '';
            }
        });
    });

    // ===== ANIMATE NUMBERS ON SCROLL =====
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-value[data-count], .number[data-count]');
        
        statNumbers.forEach(el => {
            const target = parseFloat(el.getAttribute('data-count'));
            if (!target) return;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = target * ease;
                
                if (target % 1 === 0) {
                    el.textContent = Math.round(current);
                } else {
                    el.textContent = current.toFixed(1);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    el.textContent = target;
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }

    // ===== INTERSECTION OBSERVER =====
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function() {
        // Observe elements
        document.querySelectorAll('.feature-card, .quote-card, .progress-card, .impact-card').forEach(el => {
            observer.observe(el);
        });

        // Animate numbers
        animateNumbers();

        // Update progress
        updateProgress();

        // Initialize price
        updatePrice();

        // NO AUTOMATIC FAKE GROWTH - Everything starts at 0 and only updates when tickets are purchased
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const heroBg = hero.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
            }
        });
    }

    console.log('🚀 Bryanston High Fundraiser loaded!');
    console.log('💰 Tickets: R50 each');
    console.log('👤 John Doe placeholder name');
    console.log('📊 All stats start at ZERO - only update on ticket purchase');

})();