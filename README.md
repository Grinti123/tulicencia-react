# Tu Licencia - Full Stack Application

A modern web application for managing vehicle and driver's license procedures, available in both React and PHP versions.

## Overview

Tu Licencia is a comprehensive platform that streamlines various government procedures related to driver's licenses and vehicle registrations. This application provides an intuitive interface for users to complete procedures online, reducing paperwork and in-person visits.

## Project Versions

### React Version (Original)

The React version is a modern single-page application with the following features:

- **Dashboard**: User dashboard with procedure history and quick access to common procedures
- **Procedure System**: Multi-step forms for various license and vehicle procedures
- **Component Library**: Custom reusable UI components built for consistency

#### React Project Structure

```
src/
├── components/         # Reusable components
│   ├── ui/            # UI component library with documentation
│   ├── dashboard/     # Dashboard-specific components
│   └── procedures/    # Procedure-specific components
├── pages/             # Application pages
├── assets/           # Static assets
└── App.jsx           # Main application entry
```

### PHP Version (Converted)

The PHP version maintains feature parity with the React version while using traditional server-side rendering:

- User registration and login
- License renewal process
- Vehicle transfer documentation
- User dashboard
- Form validation
- Responsive design with Tailwind CSS

#### Why PHP Instead of Plain HTML?

We chose PHP for the conversion from React for several key reasons:

1. **Efficient Development Process**: Converting React components directly to plain HTML would be extremely time-consuming due to React's component-based architecture. PHP allows us to maintain a similar component-based structure, significantly speeding up the conversion process.

2. **Component Reusability**: Plain HTML doesn't support separate, reusable components, which would result in extremely long, monolithic HTML files. PHP enables us to maintain a modular structure similar to React while still writing standard HTML within PHP files.

#### PHP Project Structure

```
php_project/
├── assets/           # Images and other static assets
├── components/       # Reusable PHP components
│   ├── dashboard/    # Dashboard-specific components
│   └── ...
├── css/             # CSS stylesheets
├── includes/        # PHP includes (header, footer, etc.)
├── js/             # JavaScript files
├── pages/          # PHP pages
└── index.php       # Main entry point
```

## Development Setup

### React Version

Prerequisites:
- Node.js 16+
- npm or yarn

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### PHP Version

Prerequisites:
- PHP 7.4+
- Web server (Apache/Nginx) or PHP's built-in server

Using PHP's built-in server:
```bash
cd php_project
php -S localhost:8000
```

Or place the project in your web server's directory and access via:
`http://localhost/php_project`

## Implementation Notes

### React Version
- Built with modern React practices
- Uses React Router for navigation
- State management with React hooks
- Modern UI with Tailwind CSS

### PHP Version
- Session-based authentication
- Traditional server-side rendering
- Maintains React version's UI with Tailwind CSS
- JavaScript enhancements for interactivity

## Production Considerations

For production deployment:
- Set up proper database connections
- Implement secure authentication
- Configure server settings
- Add CSRF protection
- Implement proper error handling
- Set up SSL certificates

## License

This project is private and not available for public use.
