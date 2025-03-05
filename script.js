document.addEventListener('DOMContentLoaded', function() {
    
    const links = document.querySelectorAll('.navbar a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Allow external links to open normally
            if (href.startsWith('http')) {
                return; 
            }

            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.querySelector(`.${targetId}`);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for floating navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Elements to animate
    const welcome = document.querySelector('.cont1 h2');
    const name = document.querySelector('.cont1 h1');
    const description = document.querySelector('.cont1 h4');
    const iconContainer = document.querySelector('.icon-container');
    const contentDivs = document.querySelectorAll('.cont2, .cont3, .cont4, .cont5, .cont6, .contact');
    const footer = document.querySelector('footer');
    
    // Cursor elements
    const cursor1 = document.querySelector('#cursor'); // First cursor
    const cursor2 = document.querySelector('#cursor2'); // Second cursor
    
    // Initially hide the second cursor completely
    if (cursor2) {
        cursor2.style.opacity = '0'; // Make second cursor transparent initially
        cursor2.style.display = 'none'; // Keep it hidden until needed
    }
    
    // Get the transition duration from CSS for name element
    const nameTransition = getComputedStyle(name).getPropertyValue('transition-duration');
    // Convert to milliseconds (CSS returns values like "1s")
    const nameTransitionMs = parseFloat(nameTransition) * 1000 || 1000; // Default to 1000ms if not found
    
    // Start animation sequence
    setTimeout(() => {
        welcome.classList.add('visible'); // Show welcome text first
        console.log('Welcome visible'); // Debug log
        
        // Fade out the first cursor before the name starts appearing
        setTimeout(() => {
            if (cursor1) {
                cursor1.style.transition = 'opacity 0.5s ease';
                cursor1.style.opacity = '0';
                
                // After fade-out, hide it completely
                setTimeout(() => {
                    if (cursor1) {
                        cursor1.style.display = 'none';
                    }
                }, 500);
            }
        }, 1500); // 1.5 seconds after welcome appears

        // After welcome is visible, show name
        setTimeout(() => {
            if (cursor2) {
                cursor2.style.display = 'inline-block'; // Make second cursor visible
                cursor2.style.opacity = '1';
            }
            name.classList.add('visible'); // Show name after delay
            console.log('Name visible'); // Debug log
            
            // After name is visible, show description
            setTimeout(() => {
                description.classList.add('visible'); // Show description after delay
                console.log('Description visible'); // Debug log
                
                // After description is visible, show icons
                setTimeout(() => {
                    iconContainer.classList.add('visible'); // Show social icons
                    
                    // Show the rest of the content with a slight delay between each
                    let delay = 300;
                    contentDivs.forEach(div => {
                        setTimeout(() => {
                            div.classList.add('visible'); // Show content sections one by one
                        }, delay);
                        delay += 300; // Increment delay for next element
                    });
                    
                    // Finally show the footer
                    setTimeout(() => {
                        footer.classList.add('visible'); // Show footer last
                    }, delay);
                    
                }, 1000);
            }, 2000); // 2 seconds after name
        }, 2000); // 2 seconds after welcome
    }, 100); // Small initial delay to ensure DOM is fully loaded

    // Custom Cursor Setup
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Ensure cursor remains custom on clickable elements
    document.querySelectorAll('a, button, input, textarea').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });
});
