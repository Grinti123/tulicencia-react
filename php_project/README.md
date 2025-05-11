# Tu Licencia - PHP Version

This is the PHP version of the Tu Licencia application, converted from a React project. The application helps users manage license renewals and vehicle documentation procedures.

## Project Structure

```
php_project/
├── assets/           # Images and other static assets
├── components/       # Reusable PHP components
│   ├── dashboard/    # Dashboard-specific components
│   └── ...
├── css/              # CSS stylesheets
├── includes/         # PHP includes (header, footer, etc.)
├── js/               # JavaScript files
├── pages/            # PHP pages
│   ├── home.php
│   ├── login.php
│   └── ...
└── index.php         # Main entry point
```

## Features

- User registration and login
- License renewal process
- Vehicle transfer documentation
- User dashboard
- Form validation
- Responsive design with Tailwind CSS

## Technologies Used

- PHP
- Tailwind CSS
- JavaScript
- HTML

## Setup Instructions

1. Clone the repository
2. Set up a local PHP server (like XAMPP, WAMP, or built-in PHP server)
3. Place the project in the server's web directory
4. Access the application through your browser at `http://localhost/php_project`

## Using the Built-in PHP Server

You can also use PHP's built-in server for development:

```bash
cd php_project
php -S localhost:8000
```

Then access the application at `http://localhost:8000`

## Notes

- This is a demonstration project without a real database connection
- User authentication is simulated with session variables
- In a production environment, you would need to:
  - Set up a proper database
  - Implement secure password hashing
  - Configure proper server settings
  - Add CSRF protection
  - Implement proper error handling

## License

This project is for demonstration purposes only. 