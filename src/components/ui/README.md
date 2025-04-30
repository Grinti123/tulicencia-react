# UI Component Library

This directory contains reusable UI components for the tulicencia-react application.

## Component Reuse Guidelines

To maintain consistency throughout the application, follow these guidelines for reusing components:

### Import Patterns

Always import UI components using the destructured import syntax from the index file:

```jsx
// Correct
import { Button, InputForm, RadioGroup } from '../../components/ui';

// Incorrect
import Button from '../../components/ui/Button';
```

For shared application components (Header, Footer, etc.), import using:

```jsx
import { Header, Footer } from '../../components';
```

### Form Fields

Always use the `InputForm` component for form fields instead of basic HTML inputs:

```jsx
// Correct
<InputForm
  id="email"
  name="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={handleChange}
  placeholder="Enter your email"
  required={true}
/>

// Avoid
<div>
  <label htmlFor="email">Email Address</label>
  <input
    type="email"
    id="email"
    name="email"
    value={email}
    onChange={handleChange}
    placeholder="Enter your email"
    required
  />
</div>
```

### Radio Button Groups

Use the `RadioGroup` component for groups of radio buttons:

```jsx
// Correct
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

<RadioGroup
  options={options}
  name="option-group"
  value={selectedOption}
  onChange={setSelectedOption}
/>

// Avoid
<div>
  <div className="flex items-center">
    <input
      type="radio"
      id="option1"
      name="option-group"
      value="option1"
      onChange={(e) => setSelectedOption(e.target.value)}
      checked={selectedOption === 'option1'}
    />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center">
    <input
      type="radio"
      id="option2"
      name="option-group"
      value="option2"
      onChange={(e) => setSelectedOption(e.target.value)}
      checked={selectedOption === 'option2'}
    />
    <label htmlFor="option2">Option 2</label>
  </div>
</div>
```

### Common Implementation Patterns

For multi-step forms (like procedures), follow this structure:
1. Import UI components
2. Use `InputForm` for all form fields
3. Use `Button` for navigation controls
4. Use `RadioGroup` for option selection
5. Maintain consistent styling for all similar forms

### Example Code

Procedure page implementation:
```jsx
import React, { useState } from 'react';
import { Button, InputForm } from '../../components/ui';
import { Header, Footer } from '../../components';

const ProcedurePage = () => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  return (
    <div>
      <Header />
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-[#157a3c] mb-6">Procedure Title</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputForm
                id="fullName"
                name="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName || ''}
                onChange={handleChange}
                required={true}
              />
              {/* Additional form fields */}
            </div>
            <div className="mt-8 flex justify-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProcedurePage;
```

## Available Components

### 1. Accordion
Expandable/collapsible content sections.

```jsx
import { Accordion } from '../components/ui';

const items = [
  { id: 'item1', title: 'Item 1', content: 'Content 1' },
  { id: 'item2', title: 'Item 2', content: 'Content 2' }
];

<Accordion items={items} allowMultiple={false} />
```

### 2. Button
Customizable button with different variants and sizes.

```jsx
import { Button } from '../components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### 3. Card
Container with different background variants.

```jsx
import { Card } from '../components/ui';

<Card variant="primary" shadow={true}>
  Card content
</Card>
```

### 4. Container
Responsive container with consistent padding and max-width.

```jsx
import { Container } from '../components/ui';

<Container size="lg">
  Container content
</Container>
```

### 5. DotLottiePlayer
Wrapper for dotLottie animations.

```jsx
import { DotLottiePlayer } from '../components/ui';

<DotLottiePlayer
  src="/json/animation.json"
  autoplay
  loop
  className="w-40 h-40"
/>
```

### 6. FadeIn
Animation component for fade-in effects.

```jsx
import { FadeIn } from '../components/ui';

<FadeIn duration="0.5s">
  This content will fade in
</FadeIn>
```

### 7. Icon
Consistent icon usage throughout the application.

```jsx
import { Icon } from '../components/ui';

<Icon name="menu" size="24" />
```

### 8. InputForm
Versatile form input component with support for various input types and states.

```jsx
import { InputForm } from '../components/ui';

<InputForm
  id="email"
  name="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={handleChange}
  placeholder="Enter your email"
  required={true}
/>
```

Key features:
- Supports multiple input types (text, email, password, select, etc.)
- Consistent styling with error states
- Password toggle visibility option
- Select dropdown support with options array

Props:
- `id` (required): Unique identifier for the input
- `name` (required): Form field name
- `label`: Label text to display above the input
- `type` (default: 'text'): Input type ('text', 'email', 'password', 'select', etc.)
- `value`: Current input value
- `onChange`: Handler for input changes
- `placeholder`: Placeholder text
- `required` (default: false): Whether the field is required
- `maxLength`: Maximum character length
- `className`: Additional CSS classes
- `disabled` (default: false): Whether the input is disabled
- `options`: Array of options for select inputs `[{value: 'val', label: 'Label'}]`
- `error`: Error message to display
- `showPasswordToggle` (default: false): For password fields, shows toggle to view password
- `onPasswordToggle`: Handler for password toggle
- `showPassword`: State for password visibility

### 9. LinkButton
Button variant that uses React Router's Link.

```jsx
import { LinkButton } from '../components/ui';

<LinkButton to="/page" variant="primary" size="md">
  Go to Page
</LinkButton>
```

### 10. RadioGroup
Group of radio button options.

```jsx
import { RadioGroup } from '../components/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
];

<RadioGroup
  options={options}
  name="option-group"
  value={selectedOption}
  onChange={setSelectedOption}
/>
```

### 11. Section
Consistent page section with container.

```jsx
import { Section } from '../components/ui';

<Section bg="light" containerSize="lg">
  Section content
</Section>
```

### 12. Tabs
Tab component with easy content switching.

```jsx
import { Tabs } from '../components/ui';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Tab 1 Content</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Tab 2 Content</div> }
];

<Tabs tabs={tabs} defaultTab="tab1" />
``` 