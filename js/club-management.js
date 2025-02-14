// Object-oriented JavaScript for Club Management
class ClubManagement {
    constructor() {
        this.clubs = [];
        this.currentUser = null;
        this.initLocalStorage();
    }

    initLocalStorage() {
        // Initialize local storage for credentials and club data
        if (!localStorage.getItem('clubCredentials')) {
            localStorage.setItem('clubCredentials', JSON.stringify({}));
        }
        if (!localStorage.getItem('clubData')) {
            localStorage.setItem('clubData', JSON.stringify({}));
        }
    }

    registerUser(username, password, role) {
        const credentials = JSON.parse(localStorage.getItem('clubCredentials'));
        credentials[username] = { password, role };
        localStorage.setItem('clubCredentials', JSON.stringify(credentials));
    }

    login(username, password) {
        const credentials = JSON.parse(localStorage.getItem('clubCredentials'));
        if (credentials[username] && credentials[username].password === password) {
            this.currentUser = { username, role: credentials[username].role };
            return true;
        }
        return false;
    }

    updateClubCommittee(clubName, committeeData) {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            console.error('Unauthorized access');
            return false;
        }

        const clubData = JSON.parse(localStorage.getItem('clubData'));
        clubData[clubName] = { ...clubData[clubName], committee: committeeData };
        localStorage.setItem('clubData', JSON.stringify(clubData));
        return true;
    }

    addSuccessStory(clubName, story) {
        if (!this.currentUser) {
            console.error('Login required');
            return false;
        }

        const clubData = JSON.parse(localStorage.getItem('clubData'));
        if (!clubData[clubName].successStories) {
            clubData[clubName].successStories = [];
        }
        clubData[clubName].successStories.push(story);
        localStorage.setItem('clubData', JSON.stringify(clubData));
        return true;
    }

    emailSuccessStories(clubName) {
        const clubData = JSON.parse(localStorage.getItem('clubData'));
        const stories = clubData[clubName].successStories;
        
        // In a real-world scenario, this would use a backend email service
        console.log('Emailing success stories:', stories);
        alert('Success stories have been prepared for email distribution');
    }
}

// Initialize the club management system
const clubManager = new ClubManagement();

// jQuery validation and interactivity
$(document).ready(function() {
    // Form validation
    $('#committee-form').validate({
        rules: {
            name: { required: true },
            position: { required: true }
        },
        submitHandler: function(form) {
            const clubName = $('#club-select').val();
            const committeeData = {
                name: $('#name').val(),
                position: $('#position').val()
            };
            clubManager.updateClubCommittee(clubName, committeeData);
            form.reset();
        }
    });

    $('#success-story-form').validate({
        rules: {
            story: { required: true }
        },
        submitHandler: function(form) {
            const clubName = $('#club-select').val();
            const story = $('#story').val();
            clubManager.addSuccessStory(clubName, story);
            form.reset();
        }
    });

    // Email success stories button
    $('#email-stories').on('click', function() {
        const clubName = $('#club-select').val();
        clubManager.emailSuccessStories(clubName);
    });
});
