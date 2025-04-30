# Tu Licencia React

A modern web application for managing vehicle and driver's license procedures.

## Overview

Tu Licencia is a comprehensive platform that streamlines various government procedures related to driver's licenses and vehicle registrations. This application provides an intuitive interface for users to complete procedures online, reducing paperwork and in-person visits.

## Features

- **Dashboard**: User dashboard with procedure history and quick access to common procedures
- **Procedure System**: Multi-step forms for various license and vehicle procedures
- **Component Library**: Custom reusable UI components built for consistency

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── ui/             # UI component library with documentation
│   ├── dashboard/      # Dashboard-specific components
│   └── procedures/     # Procedure-specific components
├── pages/              # Application pages
│   ├── procedures/     # Full procedure pages
│   ├── dashboard/      # Dashboard pages
│   └── auth/           # Authentication pages
├── assets/             # Static assets
└── App.jsx             # Main application entry
```

## Component System

This application uses a structured component system:

1. **UI Components**: Base UI components in `/src/components/ui`
2. **Application Components**: Shared components like Header and Footer
3. **Page Components**: Full pages composed of smaller components

### Documentation

Comprehensive documentation for UI components is available in:
- `/src/components/ui/README.md` - Detailed component API and usage guidelines

## Procedures System

The application includes a complete procedure management system:

- **Procedure Pages**: Multi-step forms for each procedure type
- **Form Components**: Reusable form sections and input components 
- **Progress Tracking**: Step-by-step progress indicators

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## License

This project is private and not available for public use.
