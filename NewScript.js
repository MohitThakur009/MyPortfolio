document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Java Developer', 'Web Developer', 'Mobile App Developer', 'Digital Marketer'];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing effect on load
    if (textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Auto slide change every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({name, email, subject, message});
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a newsletter service
            console.log({email});
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Animate Skills Progress Bars on Scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.progress');
            const percent = item.querySelector('h4 span').textContent;
            progressBar.style.width = percent;
        });
    }
    
    // Intersection Observer for skills animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    
    if (document.querySelector('.skills')) {
        observer.observe(document.querySelector('.skills'));
    }
});
// Download cv button js

 document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    const downloadStatus = document.getElementById('downloadStatus');

    // Path to your CV file (update this to your actual file path)
    const cvFilePath = 'Mohit-Thakur-Resume.pdf';
    // The name you want the downloaded file to have
    const cvFileName = 'Mohit-Thakur-Resume.pdf';

    downloadBtn.addEventListener('click', function() {
        downloadFile(cvFilePath, cvFileName);
    });

    function downloadFile(filePath, fileName) {
        // Show loading state
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="download-icon">⏳</span> Preparing Download...';

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = filePath;
        a.download = fileName;
        a.style.display = 'none';
        
        // Append to body and trigger click
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        document.body.removeChild(a);
    
        setTimeout(() => {
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<span class="download-icon">↓</span> Download My CV';
            
            // Show success message (in a real scenario, this would depend on actual success)
            showStatusMessage('CV downloaded successfully!', 'success');
            
            // Hide message after 4 seconds
            setTimeout(() => {
                downloadStatus.classList.remove('visible');
            }, 4000);
        }, 1500);
    }

    function showStatusMessage(message, type) {
        downloadStatus.textContent = message;
        downloadStatus.className = 'download-status visible ' + type;
    }
});
