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
    const inputs = form.getElementsByTagName('input');
    let isValid = true;

    for (let input of inputs) {
        if (input.hasAttribute('required') && !input.value) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('invalid');
                isValid = false;
            }
        }
    }
    return isValid;
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeClubs();
    updateClubList();
    
    // Setup video background
    const video = document.getElementById('bg-video');
    if (video) {
        video.playbackRate = 0.75;
    }
});
