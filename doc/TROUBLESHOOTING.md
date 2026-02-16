# Design System Troubleshooting Guide

Common issues and how to fix them.

---

## Issue: Component Styling Not Applying

### Problem

Your styled component looks correct but styles aren't showing up.

### Solution

1. **Check import**

```typescript
// Make sure you're importing from the right file
import styled from "styled-components";
import { colors, spacing } from "../styles/designTokens";
```

2. **Verify the token exists**

```typescript
// Check designTokens.ts for the exact property name
colors.primary.main      ✅ Correct
colors.primary.Main      ❌ Wrong (capital M)
colors.primaryColor      ❌ Wrong (different structure)
```

3. **Check for typos in CSS property**

```typescript
// CSS properties must be camelCase
backgroud: ...          ❌ Typo (background)
box-shadow: ...         ❌ Wrong format (use boxShadow)
boxShadow: ...          ✅ Correct
```

4. **Ensure component is exported**

```typescript
// Export the styled component
export const MyComponent = styled.div`
  // styles
`;

// Then use it
import { MyComponent } from "./path";
```

### Check the Fix

```bash
npm run build  # Look for TypeScript errors
npm run dev    # Open browser and inspect element
```

---

## Issue: Colors Look Wrong

### Problem

Your colors don't match the design system.

### Solution

1. **Verify color token**

```typescript
// These are the available main colors
colors.primary.main; // Bright blue
colors.secondary.main; // Orange
colors.neutral[0]; // White
colors.neutral[900]; // Black
colors.success.main; // Green
colors.error.main; // Red
colors.warning.main; // Orange
```

2. **Check color usage**

```typescript
// For backgrounds, use lighter shades
background: ${colors.primary.lighter};    // Right for backgrounds

// For text, use darker shades
color: ${colors.primary.dark};            // Right for text
```

3. **Verify contrast**

- Use WebAIM Contrast Checker
- Text should be 4.5:1 contrast ratio minimum
- Large text (18px+) can be 3:1

### Common Mistakes

```typescript
// ❌ Bad: Using main color for background and dark color for text
// (may not have enough contrast)
background: ${colors.primary.main};
color: ${colors.primary.dark};

// ✅ Good: Using light background and dark text
background: ${colors.primary.lighter};
color: ${colors.primary.dark};
```

---

## Issue: Spacing Looks Wrong

### Problem

Your padding/margin doesn't align with the design.

### Solution

1. **Always use spacing tokens**

```typescript
// ❌ Never hardcode pixels
padding: 16px;

// ✅ Always use tokens
padding: ${spacing[4]};  // Also 16px, but consistent!
```

2. **Choose right spacing value**

```typescript
// Small elements (badges, small buttons)
padding: ${spacing[1]} ${spacing[2]};    // 4px 8px

// Cards and containers
padding: ${spacing[4]};                   // 16px all sides

// Large sections
padding: ${spacing[6]};                   // 24px all sides

// Gaps between grid items
gap: ${spacing[3]};                       // 12px
```

3. **Check alignment grid**

- All spacing should be multiples of 4px
- Spacing values go: 4, 8, 12, 16, 20, 24, 32, 40, 48...
- Never use 10px, 15px, 17px, etc.

### Debug Tip

```typescript
// Add a border to see the box
border: 1px solid red;  // Remove after debugging

// Then check:
// 1. Does padding match the design?
// 2. Is it aligned with other elements?
// 3. Is there enough whitespace?
```

---

## Issue: Responsive Design Not Working

### Problem

Layout doesn't change when resizing browser.

### Solution

1. **Check media queries syntax**

```typescript
// ❌ Wrong
@media (max-width: 768px) {
  color: red;
}

// ✅ Right
${media.tablet} {
  color: red;
}
```

2. **Ensure mobile-first approach**

```typescript
// Base styles are for mobile
const Container = styled.div`
  grid-template-columns: 1fr; // Mobile: 1 column

  // Add tablet rules
  ${media.tablet} {
    grid-template-columns: 2fr 1fr;
  }

  // Add desktop rules
  ${media.desktop} {
    grid-template-columns: 3fr 1fr;
  }
`;
```

3. **Test at right breakpoints**

```
Mobile:     480px (phones)
Tablet:     768px (tablets)
Desktop:    1024px (laptops)
Wide:       1280px (large screens)
```

4. **Check browser dev tools**

- Open DevTools (F12)
- Click device toggle (top-left corner)
- Select an iPhone or iPad preset
- Your styles should change

### Common Mistakes

```typescript
// ❌ Wrong: Forgetting to add media queries for mobile
// (Desktop layout shown on mobile - broken!)
grid-template-columns: repeat(4, 1fr);

// ✅ Right: Responsive from the start
grid-template-columns: 1fr;  // Mobile
${media.tablet} {
  grid-template-columns: repeat(2, 1fr);
}
```

---

## Issue: Build Errors with TypeScript

### Problem

You get TypeScript errors when running `npm run build`.

### Solution

1. **Check for syntax errors**

```typescript
// ❌ Missing backtick
const Button = styled.button`
  color: red;

// ✅ Complete
const Button = styled.button`
  color: red;
`;
```

2. **Check token names**

```typescript
// ❌ Token doesn't exist
color: ${colors.notAColor};

// ✅ Use existing token
color: ${colors.primary.main};
```

3. **Check CSS syntax**

```typescript
// ❌ Invalid CSS property
colr: red; // Typo

// ✅ Valid CSS property
color: red;
```

4. **Run build to see errors**

```bash
npm run build
# Read the error message carefully
# It tells you exactly what's wrong and where
```

---

## Issue: Animations Look Choppy

### Problem

Your animations stutter or don't feel smooth.

### Solution

1. **Use CSS properties that animate smoothly**

```typescript
// ✅ Good properties to animate (performant)
transform: translateY(-2px);
opacity: 0.5;
color: ...;

// ❌ Bad properties to animate (causes layout shifts)
width: 100%;
height: 100%;
margin: 10px;
padding: 10px;
```

2. **Use correct transition syntax**

```typescript
// ❌ Old/verbose
transition-property: all;
transition-duration: 300ms;
transition-timing-function: ease-in-out;

// ✅ Clean and using tokens
transition: all ${transitions.base};
```

3. **Use transform for movement**

```typescript
// For hover effects, use transform instead of margin
&:hover {
  // ❌ Causes layout shift
  margin-top: -4px;

  // ✅ Smooth animation, no layout shift
  transform: translateY(-4px);
}
```

4. **Respect user preferences**

```typescript
// Always include this for accessibility
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Issue: Mobile Layout Broken

### Problem

Your site looks broken on mobile devices.

### Solution

1. **Check viewport meta tag**

```html
<!-- Should be in index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. **Ensure proper responsive breakpoints**

```typescript
// Base styles should work on mobile
const Container = styled.div`
  padding: ${spacing[3]}; // Not too large for mobile
  max-width: 100%; // Full width on mobile

  ${media.desktop} {
    padding: ${spacing[6]};
    max-width: 1280px;
  }
`;
```

3. **Check for overflow**

```typescript
// ❌ Can cause horizontal scroll
width: 500px;  // Fixed width on small screens

// ✅ Responsive width
width: 100%;
max-width: 500px;
```

4. **Test on real device**

- Use Chrome DevTools device emulation
- Or test on actual phone
- Check: Text readable? Buttons clickable? No scroll?

### Common Mobile Issues

- ❌ Text too small (use min 14px)
- ❌ Buttons too small (must be 44px+)
- ❌ Too much padding (use smaller tokens)
- ❌ Horizontal scroll (set max-width)

---

## Issue: Focus States Not Visible

### Problem

You can't see what's focused when using keyboard.

### Solution

1. **Add focus-visible states**

```typescript
button {
  &:focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }
}
```

2. **Test with keyboard**

- Press Tab to move through elements
- You should see a clear focus indicator
- The indicator should be:
  - ✅ Visible (at least 3:1 contrast)
  - ✅ Around 2px or larger
  - ✅ Distinct from hover state

3. **Check outline color contrast**

```typescript
// ❌ Wrong: Light color on light background
outline-color: ${colors.neutral[100]};

// ✅ Right: Dark color on light background
outline-color: ${colors.primary.main};
```

---

## Issue: Cards Look Different on Different Pages

### Problem

Your product cards don't look consistent.

### Solution

1. **Use the same token everywhere**

```typescript
// All cards should use the same base
const Card = styled.div`
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  padding: ${spacing[4]};
  background: ${colors.neutral[0]};
`;
```

2. **Create a reusable component**

```typescript
// cards.ts
export const Card = styled.div`
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  padding: ${spacing[4]};
  background: ${colors.neutral[0]};
`;

// Then import everywhere
import { Card } from "../components/cards";
```

3. **Don't override inconsistently**

```typescript
// ❌ Every component has different styling
const ProductCard = styled.div`
  border-radius: 6px; // Different!
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Different!
  padding: 15px; // Different!
`;

// ✅ Use tokens consistently
const ProductCard = styled.div`
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  padding: ${spacing[4]};
`;
```

---

## Issue: Text Hierarchy Looks Wrong

### Problem

Your headers, subheaders, and body text don't look properly differentiated.

### Solution

1. **Use font size tokens**

```typescript
// Never hardcode sizes
const Heading = styled.h1`
  font-size: fontSize[ "3xl"]; // 24px
`;

// Use tokens
const Heading = styled.h1`
  font-size: ${typography.fontSize["3xl"]}; // 24px
`;
```

2. **Proper hierarchy**

```typescript
// H1: Page title
h1 { font-size: ${typography.fontSize["3xl"]}; }  // 24px

// H2: Section title
h2 { font-size: ${typography.fontSize["2xl"]}; }  // 20px

// H3: Subsection
h3 { font-size: ${typography.fontSize.xl}; }     // 18px

// P: Body text
p { font-size: ${typography.fontSize.base}; }    // 14px

// Small: Caption
small { font-size: ${typography.fontSize.xs}; }  // 12px
```

3. **Use font weights to differentiate**

```typescript
// Main heading: Bold
h1 { font-weight: ${typography.fontWeight.bold}; }

// Subheading: Semibold
h2 { font-weight: ${typography.fontWeight.semibold}; }

// Label: Medium
label { font-weight: ${typography.fontWeight.medium}; }

// Body: Normal
p { font-weight: ${typography.fontWeight.normal}; }
```

---

## Issue: Component Performance Issues

### Problem

Site feels slow or laggy.

### Solution

1. **Check for expensive animations**

```typescript
// ❌ Bad: Animates size (causes repaints)
&:hover {
  width: 110%;
  height: 110%;
}

// ✅ Good: Uses transform (GPU accelerated)
&:hover {
  transform: scale(1.1);
}
```

2. **Use performant CSS properties**

```typescript
// Fast (use these)
transform;
opacity;
z - index;
filter;

// Slow (avoid these)
left / top;
width / height;
margin / padding;
box - shadow(sometimes);
```

3. **Check bundle size**

```bash
npm run build
# Look for: gzip: XXX kB

# Should be under 200KB gzipped
```

4. **Profile in DevTools**

- Open Chrome DevTools
- Go to Performance tab
- Record user interaction
- Look for long tasks or repaints

---

## Issue: "Token is not defined" Error

### Problem

You get an error like `colors is not defined`.

### Solution

1. **Check import statement**

```typescript
// ❌ Wrong (forgot import)
color: ${colors.primary.main};

// ✅ Right (import first)
import { colors } from "../styles/designTokens";
color: ${colors.primary.main};
```

2. **Check file path**

```typescript
// Make sure path is correct for your location
import { colors } from "../styles/designTokens"; // From src/components/
import { colors } from "../../styles/designTokens"; // From src/pages/subdirs/
import { colors } from "../../../styles/designTokens"; // From deeper folders
```

3. **Verify import is complete**

```typescript
// Import only what you need
import { colors, spacing } from "../styles/designTokens";

// Or import all
import * as designTokens from "../styles/designTokens";
// Then use: designTokens.colors.primary.main
```

---

## Issue: CSS Not Adding to Global Styles

### Problem

Your global styles from GlobalStyle.ts aren't working.

### Solution

1. **Check GlobalStyle is used in App**

```typescript
// app/App.tsx should have
import { GlobalStyle } from "./styles/GlobalStyle";

// And use it
function App() {
  return (
    <>
      <GlobalStyle />
      {/* Your app content */}
    </>
  );
}
```

2. **Ensure it's the first thing rendered**

- GlobalStyle should be at the top of App component
- Before all other content
- So it sets the base styles first

3. **Check for CSS conflicts**

- Look for other CSS files that might override
- Check `index.css` (might conflict with GlobalStyle)
- Remove conflicting styles

---

## Still Have Issues?

### Debugging Steps

1. **Run build** - Find errors

```bash
npm run build
```

2. **Check browser console** - Look for warnings

- Open DevTools (F12)
- Go to Console tab
- Look for red errors

3. **Inspect element** - See applied styles

- Right-click element
- Select "Inspect"
- Look at Styles panel
- See what's applied vs what's expected

4. **Check token exists** - Verify name

- Open `src/styles/designTokens.ts`
- Search for the token name
- Copy exact name and use it

5. **Read error message** - It tells you what's wrong

- TypeScript errors are very descriptive
- Follow them exactly
- Usually tells you line number and problem

### Ask for Help

If you're stuck:

1. Check the example components (Header, ProductCard)
2. Read the COMPONENT_STYLING_GUIDE.md
3. Create a minimal test case
4. Compare to known working component

---

## Most Common Mistakes

```typescript
// ❌ Using hardcoded values
margin: 10px;
color: blue;
border-radius: 5px;

// ✅ Using design tokens
margin: ${spacing[2]};
color: ${colors.primary.main};
border-radius: ${borderRadius.md};

// ❌ Missing media queries
grid-template-columns: repeat(4, 1fr);  // Broken on mobile!

// ✅ Responsive from start
grid-template-columns: 1fr;
${media.desktop} { grid-template-columns: repeat(4, 1fr); }

// ❌ Inefficient animations
width: 100%; transition: width 300ms;

// ✅ Performant animations
transform: scale(1); transition: transform 300ms;
```

---

## Quick Reference

| Issue                | Check                                 |
| -------------------- | ------------------------------------- |
| Styles not applying  | Import token? Spelled correctly?      |
| Wrong colors         | Using right token? Check contrast?    |
| Spacing off          | Using spacing token? Right size?      |
| Not responsive       | Mobile-first approach? Media queries? |
| Focus not visible    | Added focus-visible state?            |
| Animations choppy    | Using transform? GPU accelerated?     |
| Bundle too large     | Check for unused imports?             |
| Mobile broken        | Viewport meta tag? Overflow check?    |
| Text hierarchy wrong | Using typography scale? Font weights? |

---

**Last Updated**: February 15, 2026

**Need more help?** Join the design system channel or check the docs!
