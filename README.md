# VIT Clubs Management Website

An interactive website for managing various clubs at Vishwakarma Institute of Technology.

## Features
- Responsive design using Bootstrap
- Background video on homepage
- Object-oriented JavaScript for club management
- Interactive forms for:
  - Club committee updates
  - Success stories management
- Client-side credential storage
- Form validation
- Email functionality for success stories

## Setup Instructions
1. Clone the repository
2. Open the project in a web browser
3. Use the login/register functionality to access club management features

## Project Structure

```
├── assets/
│   └── background.mp4
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
└── README.md
```

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery
- Bootstrap 5
- Local Storage API

## Local Storage Structure
- `clubCredentials`: Stores user login information
- `clubData`: Stores club-specific information like committees and success stories

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Note
Credentials are stored client-side and should only be used for demonstration purposes. 
For a production environment, implement server-side authentication.

## Future Improvements
- Implement server-side authentication
- Add more robust error handling
- Create a backend API for email distribution

## Note

This website uses client-side storage (localStorage) to maintain data. Make sure your browser has JavaScript enabled and allows local storage.
