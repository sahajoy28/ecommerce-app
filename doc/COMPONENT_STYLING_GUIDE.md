# Component Styling Guide

## Overview

This guide shows how to use the design system tokens to style components consistently throughout the application.

---

## Using Design Tokens

All design tokens are exported from `src/styles/designTokens.ts`:

```typescript
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  media,
} from "../styles/designTokens";
```

---

## Common Patterns

### 1. Basic Styled Component

```typescript
import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
} from "../styles/designTokens";

const Card = styled.div`
  padding: ${spacing[4]};
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.sm};
  transition: all ${transitions.base};

  &:hover {
    box-shadow: ${shadows.lg};
    transform: translateY(-2px);
  }
`;
```

### 2. Button Styles

```typescript
const PrimaryButton = styled.button`
  padding: ${spacing[2]} ${spacing[4]};
  background: linear-gradient(
    135deg,
    ${colors.primary.main},
    ${colors.primary.dark}
  );
  color: ${colors.neutral[0]};
  border: none;
  border-radius: ${borderRadius.md};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.light};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

### 3. Form Input

```typescript
const Input = styled.input`
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.neutral[200]};
  border-radius: ${borderRadius.sm};
  font-size: ${typography.fontSize.base};
  transition: all ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${colors.primary.main};
    box-shadow: 0 0 0 3px ${colors.primary.lighter};
  }

  &:focus-visible {
    border-color: ${colors.primary.main};
  }

  &::placeholder {
    color: ${colors.neutral[400]};
  }
`;
```

### 4. Text Variants

```typescript
const Heading = styled.h1`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  color: ${colors.neutral[900]};
  margin: 0;
`;

const Body = styled.p`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.normal};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral[700]};
`;

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.neutral[600]};
`;
```

### 5. Badge Component

```typescript
const Badge = styled.span`
  display: inline-block;
  padding: ${spacing[1]} ${spacing[2]};
  background: ${colors.primary.lighter};
  color: ${colors.primary.dark};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
`;
```

### 6. Responsive Layouts

```typescript
const ResponsiveGrid = styled.div`
  display: grid;
  gap: ${spacing[6]};
  grid-template-columns: repeat(4, 1fr);

  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing[5]};
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[4]};
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing[3]};
  }
`;
```

---

## Color Usage Examples

### Background Colors

```typescript
// Light background
background: ${colors.neutral[50]};

// Main background
background: ${colors.neutral[0]};

// Accent background
background: ${colors.primary.lighter};

// Status backgrounds
background: ${colors.success.light}; // Success
background: ${colors.warning.light}; // Warning
background: ${colors.error.light};   // Error
```

### Text Colors

```typescript
// Primary text
color: ${colors.neutral[900]};

// Secondary text
color: ${colors.neutral[600]};

// Muted text
color: ${colors.neutral[500]};

// Accent text
color: ${colors.primary.main};

// Status text
color: ${colors.success.main};
color: ${colors.warning.main};
color: ${colors.error.main};
```

### Gradient Examples

```typescript
// Primary gradient
background: linear-gradient(135deg, ${colors.gradients.primary.start}, ${colors.gradients.primary.end});

// Warm gradient
background: linear-gradient(to right, ${colors.warning.main}, ${colors.success.main});

// Text gradient
background: linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Spacing Examples

### Padding

```typescript
// Small padding
padding: ${spacing[2]}; // 8px

// Medium padding
padding: ${spacing[4]}; // 16px

// Large padding
padding: ${spacing[6]}; // 24px

// Asymmetric padding
padding: ${spacing[2]} ${spacing[4]}; // vertical horizontal
padding: ${spacing[3]} ${spacing[4]} ${spacing[5]} ${spacing[6]};
```

### Margins

```typescript
// Stack elements
margin-bottom: ${spacing[4]};

// Center with margins
margin-left: auto;
margin-right: auto;

// Large gaps
margin: ${spacing[6]} 0;

// Between items
gap: ${spacing[3]};
```

--- ## Shadow Examples

```typescript
// Subtle shadow (hover states)
box-shadow: ${shadows.xs};

// Regular shadow (cards)
box-shadow: ${shadows.sm};

// Medium shadow (interactive)
box-shadow: ${shadows.md};

// Large shadow (elevated)
box-shadow: ${shadows.lg};

// Extra large shadow (modals)
box-shadow: ${shadows.xl};
```

---

## Transition Examples

```typescript
// Fast transition (quick feedback)
transition: all ${transitions.fast};

// Standard transition (smooth animation)
transition: all ${transitions.base};

// Slow transition (attention-drawing)
transition: all ${transitions.slow};

// Slowest transition (major layout change)
transition: all ${transitions.slowest};

// Specific properties
transition: background-color ${transitions.fast}, transform ${transitions.base};
```

---

## Media Query Examples

```typescript
// Mobile-first approach (base styles are mobile)
const Container = styled.div`
  padding: ${spacing[3]};

  // Add tablet styles
  ${media.tablet} {
    padding: ${spacing[4]};
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  // Add desktop styles
  ${media.desktop} {
    padding: ${spacing[6]};
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
`;
```

---

## Animation Examples

### Fade In

```typescript
const FadeIn = styled.div`
  animation: fadeIn ${transitions.base} ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
```

### Slide Up

```typescript
const SlideUp = styled.div`
  animation: slideUp ${transitions.base} ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
```

### Scale Animation

```typescript
const ScaleIn = styled.div`
  animation: scaleIn ${transitions.fast} ease-out;

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
```

### Pulse Animation

```typescript
const Pulse = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
```

---

## Complete Component Examples

### Card Component

```typescript
import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
} from "../styles/designTokens";

export const Card = styled.div`
  background: ${colors.neutral[0]};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[5]};
  box-shadow: ${shadows.sm};
  transition: all ${transitions.base};
  cursor: pointer;

  &:hover {
    box-shadow: ${shadows.lg};
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${spacing[2]} 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.neutral[900]};
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.neutral[600]};
  line-height: 1.5;
`;
```

### Button Component

```typescript
import styled from "styled-components";
import {
  colors,
  spacing,
  borderRadius,
  transitions,
  typography,
} from "../styles/designTokens";

export const Button = styled.button`
  padding: ${spacing[2]} ${spacing[4]};
  background: ${colors.primary.main};
  color: ${colors.neutral[0]};
  border: none;
  border-radius: ${borderRadius.md};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  cursor: pointer;
  transition: all ${transitions.fast};
  min-height: 44px; // Touch target

  &:hover {
    background: ${colors.primary.dark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.light};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${colors.neutral[100]};
  color: ${colors.neutral[900]};

  &:hover {
    background: ${colors.neutral[200]};
  }
`;

export const GhostButton = styled(Button)`
  background: transparent;
  color: ${colors.primary.main};
  border: 1px solid ${colors.primary.main};

  &:hover {
    background: ${colors.primary.lighter};
  }
`;
```

### Alert Component

```typescript
import styled from "styled-components";
import { colors, spacing, borderRadius } from "../styles/designTokens";

export const Alert = styled.div`
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  border-left: 4px solid ${(props) => props.color || colors.primary.main};
  background: ${(props) =>
    props.variant === "error"
      ? colors.error.lighter
      : props.variant === "success"
        ? colors.success.lighter
        : props.variant === "warning"
          ? colors.warning.lighter
          : colors.primary.lighter};
  color: ${(props) =>
    props.variant === "error"
      ? colors.error.dark
      : props.variant === "success"
        ? colors.success.dark
        : props.variant === "warning"
          ? colors.warning.dark
          : colors.primary.dark};
`;
```

---

## Do's and Don'ts

### ✅ DO

- ✅ Use spacing tokens (spacing[1-24])
- ✅ Use color tokens from the palette
- ✅ Use consistent border-radius
- ✅ Use transitions for smooth animations
- ✅ Use media queries for responsive design
- ✅ Use shadows from the system
- ✅ Test on multiple screen sizes
- ✅ Ensure proper color contrast
- ✅ Use semantic color meanings

### ❌ DON'T

- ❌ Use hardcoded pixels for spacing
- ❌ Use arbitrary colors not in palette
- ❌ Mix border-radius values
- ❌ Create instant transitions (jarring)
- ❌ Ignore mobile responsiveness
- ❌ Use random shadow values
- ❌ Skip accessibility testing
- ❌ Use color just for decoration
- ❌ Hardcode font sizes

---

## Accessibility Tips

### Focus States

```typescript
&:focus-visible {
  outline: 2px solid ${colors.primary.main};
  outline-offset: 2px;
}
```

### Color Contrast

```typescript
// Good contrast (4.5:1)
color: ${colors.neutral[900]};
background: ${colors.neutral[0]};

// Not recommended
color: ${colors.neutral[400]};
background: ${colors.neutral[100]};
```

### Reduced Motion Support

```typescript
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Your Styles

1. **Responsive**: Test at 480px, 768px, 1024px, 1280px
2. **Contrast**: Use WebAIM Contrast Checker
3. **Focus**: Tab through with keyboard
4. **Animations**: Check prefers-reduced-motion
5. **Mobile**: Test on actual device
6. **Touch**: Ensure 44px minimum tap targets
7. **Performance**: Check for layout shifts
8. **Browser**: Test in Chrome, Safari, Firefox

---

## Quick Reference

| Token                            | Usage                   | Example         |
| -------------------------------- | ----------------------- | --------------- |
| `colors.primary.main`            | Primary action color    | Buttons, links  |
| `spacing[4]`                     | Standard padding/margin | Card padding    |
| `borderRadius.md`                | Standard border radius  | Cards, inputs   |
| `shadows.sm`                     | Subtle elevation        | Cards           |
| `transitions.base`               | Standard animation      | All transitions |
| `media.mobile`                   | Mobile viewport         | Hide on mobile  |
| `typography.fontSize.base`       | Body text               | Paragraphs      |
| `typography.fontWeight.semibold` | Semi-bold text          | Labels          |

---

**Last Updated**: February 15, 2026  
**Version**: 1.0  
**Maintained By**: Design System Team
