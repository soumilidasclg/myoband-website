document.addEventListener('DOMContentLoaded', () => {
    // Mouse Glow Effect
    const mouseGlow = document.querySelector('.mouse-glow');
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Glitch Text Effect
    // Glitch Text Effect
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        // We target the first child node specifically because we know the structure is:
        // TEXT_NODE + <br> + <span class="highlight-text">...</span>
        // We only want to glitch the "INTERFACE WITH THE " part.

        const firstTextNode = glitchElement.childNodes[0];

        if (firstTextNode && firstTextNode.nodeType === Node.TEXT_NODE) {
            const originalText = firstTextNode.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

            function glitchEffect() {
                let iterations = 0;
                const interval = setInterval(() => {
                    firstTextNode.textContent = originalText
                        .split('')
                        .map((letter, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            // Keep spaces clean
                            if (letter === ' ' || letter === '\n') return letter;
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                        firstTextNode.textContent = originalText; // Ensure it settles back to normal
                    }

                    iterations += 1 / 3;
                }, 30);
            }

            // Trigger on load
            setTimeout(glitchEffect, 1000);

            // Trigger on hover
            glitchElement.addEventListener('mouseenter', glitchEffect);
        }
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('.feature-card, .about-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Helper class for the observer
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
