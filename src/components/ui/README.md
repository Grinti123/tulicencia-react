# UI Component Library

This directory contains reusable UI components for the tulicencia-react application.

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

### 8. LinkButton
Button variant that uses React Router's Link.

```jsx
import { LinkButton } from '../components/ui';

<LinkButton to="/page" variant="primary" size="md">
  Go to Page
</LinkButton>
```

### 9. RadioGroup
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

### 10. Section
Consistent page section with container.

```jsx
import { Section } from '../components/ui';

<Section bg="light" containerSize="lg">
  Section content
</Section>
```

### 11. Tabs
Tab component with easy content switching.

```jsx
import { Tabs } from '../components/ui';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Tab 1 Content</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Tab 2 Content</div> }
];

<Tabs tabs={tabs} defaultTab="tab1" />
``` 