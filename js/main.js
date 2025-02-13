// Club Management System
class Club {
    constructor(name, description, committee = []) {
        this.name = name;
        this.description = description;
        this.committee = committee;
        this.successStories = [];
    }

    addCommitteeMember(member) {
        this.committee.push(member);
        this.saveToLocalStorage();
    }

    addSuccessStory(story) {
        this.successStories.push(story);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const clubs = JSON.parse(localStorage.getItem('vit_clubs') || '{}');
        clubs[this.name] = this;
        localStorage.setItem('vit_clubs', JSON.stringify(clubs));
    }
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    const errorDiv = input.nextElementSibling || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!input.nextElementSibling) {
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    input.classList.add('error');

    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
}

// Email Function
function sendEmail(story) {
    // In a real implementation, this would connect to a backend service
    // For now, we'll just show an alert
    alert('Success story has been emailed to all VIT students!');
}

// Initialize Default Clubs
function initializeClubs() {
    if (!localStorage.getItem('vit_clubs')) {
        const defaultClubs = {
            'Saarthi': new Club('Saarthi', 'Your guide to opportunities and college life'),
            'Technical': new Club('Technical', 'Promoting technical excellence'),
            'Cultural': new Club('Cultural', 'Celebrating art and culture'),
            'Sports': new Club('Sports', 'Physical fitness and sportsmanship')
        };
        localStorage.setItem('vit_clubs', JSON.stringify(defaultClubs));
    }
}

// Update UI Functions
function updateClubList() {
    const clubs = JSON.parse(localStorage.getItem('vit_clubs'));
    const clubList = document.getElementById('club-list');
    if (!clubList) return;
    
    clubList.innerHTML = '';
    for (let clubName in clubs) {
        const club = clubs[clubName];
        const clubElement = document.createElement('div');
        clubElement.className = 'club-card';
        clubElement.innerHTML = `
            <h3>${club.name}</h3>
            <p>${club.description}</p>
            <button onclick="showClubDetails('${club.name}')">View Details</button>
        `;
        clubList.appendChild(clubElement);
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animations on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Animate elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form.id)) {
                e.preventDefault();
            }
        });
    });

    // Add video background if not present
    if (!document.querySelector('#bg-video')) {
        const videoBackground = document.createElement('div');
        videoBackground.className = 'video-background';
        videoBackground.innerHTML = `
            <video autoplay muted loop id="bg-video">
                <source src="assets/background.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        document.body.insertBefore(videoBackground, document.body.firstChild);
    }

    initializeClubs();
    updateClubList();

    // Setup video background
    const video = document.getElementById('bg-video');
    if (video) {
        video.playbackRate = 0.75;
    }

    // Add smooth hover effects to all interactive elements
    document.querySelectorAll('.btn, .club-card, .feature-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
