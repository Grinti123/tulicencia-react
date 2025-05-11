# TuLicencia React - Custom Styles Guide

This guide documents the custom styles and utility classes available in this project. These styles have been configured in `tailwind.config.js` to provide consistent components and layouts.

## Color System

### Primary Colors
```jsx
// Green primary color system
<div className="bg-primary">Default primary green (#147A31)</div>
<div className="bg-primary-dark">Darker green for hover states (#0e6631)</div>
<div className="bg-primary-light">Lighter green for borders (#2a8951)</div>
<div className="bg-primary-lighter">Very light green for backgrounds (#e9f2e7)</div>

// Secondary colors
<div className="bg-secondary">Light green background (#e9f2e7)</div>
<div className="bg-secondary-dark">Darker green background (#d8e6d5)</div>

// Text colors
<div className="text-text-primary">Green text color (#1a602d)</div>
<div className="text-text-gray">Gray text color (#606060)</div>
<div className="text-text-dark">Dark text (#333333)</div>
<div className="text-text-light">Light gray text (#757575)</div>

// Background variations
<div className="bg-background-light">Light blue-white background (#f8f8ff)</div>
<div className="bg-background-gray">Gray background (#f1f1ff)</div>
<div className="bg-background-white">White background (#ffffff)</div>

// Form related colors
<input className="border-form-border" /> <!-- Border color for form elements -->
<input className="focus:ring-form-focus" /> <!-- Focus ring color -->
<div className="text-form-error">Error text (#ef4444)</div>
```

## Border Radius

```jsx
<div className="rounded-circle">50% circular radius</div>
<button className="rounded-button">Rounded button (9999px)</button>
<div className="rounded-card">Rounded card (20px)</div>
<input className="rounded-input">Rounded input field (8px)</input>
```

## Custom Spacing

```jsx
<div className="h-72">18rem height</div>
<div className="w-84">21rem width</div>
<div className="p-96">24rem padding</div>
<div className="m-128">32rem margin</div>
```

## Box Shadows

```jsx
<div className="shadow-card">Card shadow</div>
<button className="shadow-button">Button shadow with green tint</button>
<input className="shadow-input">Subtle input shadow</input>
```

## Animations

```jsx
<div className="animate-fade-in">Element fades in</div>
<div className="animate-slide-in">Element slides in from bottom</div>

// You can also use the utility classes directly
<div className="fade-in">Fades in</div>
<div className="slide-in">Slides in</div>
```

## Layout Containers

```jsx
<div className="content-container">
  Centered content with responsive padding
  Max width: 1200px
</div>
```

## Custom Component Classes

### Buttons

```jsx
<button className="btn btn-primary">Primary Green Button</button>
<button className="btn btn-secondary">White Button with Green Border</button>
<button className="btn btn-text">Text-only Button</button>
```

### Form Elements

```jsx
<input className="form-input" />
<input className="form-input form-error" /> <!-- Input with error state -->
```

### Cards

```jsx
<div className="card">
  White card with shadow and rounded corners
</div>
<div className="card card-primary">
  Light green background card
</div>
```

## Screen Sizes

The project includes a custom 'xs' breakpoint in addition to Tailwind's defaults:

```jsx
// xs: 475px
// sm: 640px (default)
// md: 768px (default)
// lg: 1024px (default)
// xl: 1280px (default)
// 2xl: 1536px (default)

<div className="hidden xs:block">Shows on screens 475px and larger</div>
```

## Usage with UI Components

When using these custom styles with the existing UI component library, you can still pass additional classes through the `className` prop:

```jsx
import { Button, Card } from '../../components/ui';

// Use custom styles with component library
<Button 
  variant="primary" 
  className="shadow-button" 
  onClick={handleSubmit}
>
  Submit
</Button>

<Card 
  variant="default" 
  className="animate-fade-in"
>
  Card content
</Card>
```

## Responsive Design

Follow the mobile-first approach when building UI:

```jsx
<div className="px-4 md:px-6 lg:px-8">
  Padding that increases at breakpoints
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid layout
</div>
```

For best results with the project's typical desktop/mobile layout pattern:

```jsx
{/* Mobile Version */}
<div className="lg:hidden">
  Mobile content
</div>

{/* Desktop Version */}
<div className="hidden lg:block">
  Desktop content
</div>
``` 