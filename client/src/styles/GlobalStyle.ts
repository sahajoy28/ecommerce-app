import { createGlobalStyle } from 'styled-components'
import { colors, typography, spacing, shadows, media, borderRadius } from './designTokens'

export const GlobalStyle = createGlobalStyle`
  /* ========================================================================
     RESET & BASE STYLES
     ======================================================================== */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  /* ========================================================================
     BODY & TYPOGRAPHY
     ======================================================================== */

  body {
    font-family: ${typography.fontFamily.base};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.normal};
    color: var(--color-text-primary, ${colors.neutral[900]});
    background-color: var(--color-bg-primary, ${colors.neutral[50]});
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
  }

  /* ========================================================================
     HEADINGS
     ======================================================================== */

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin: 0;
    color: var(--color-text-primary, ${colors.neutral[900]});
  }

  h1 {
    font-size: ${typography.fontSize["6xl"]};
    font-weight: ${typography.fontWeight.extrabold};
    
    ${media.mobile} {
      font-size: ${typography.fontSize["4xl"]};
    }
  }

  h2 {
    font-size: ${typography.fontSize["5xl"]};
    
    ${media.mobile} {
      font-size: ${typography.fontSize["3xl"]};
    }
  }

  h3 {
    font-size: ${typography.fontSize["3xl"]};
    
    ${media.mobile} {
      font-size: ${typography.fontSize["2xl"]};
    }
  }

  h4 {
    font-size: ${typography.fontSize["2xl"]};
  }

  h5 {
    font-size: ${typography.fontSize.xl};
  }

  h6 {
    font-size: ${typography.fontSize.lg};
  }

  /* ========================================================================
     LINKS & INTERACTIVE ELEMENTS
     ======================================================================== */

  a {
    color: var(--color-primary, ${colors.primary.main});
    text-decoration: none;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: var(--color-primary-dark, ${colors.primary.dark});
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary, ${colors.primary.main});
      outline-offset: 2px;
      border-radius: ${borderRadius.base};
    }
  }

  /* ========================================================================
     BUTTONS
     ======================================================================== */

  button {
    font-family: ${typography.fontFamily.base};
    font-size: inherit;
    border: none;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid ${colors.primary.main};
      outline-offset: 2px;
    }
  }

  /* ========================================================================
     FORM ELEMENTS
     ======================================================================== */

  input, textarea, select {
    font-family: ${typography.fontFamily.base};
    font-size: inherit;
    border: 1px solid var(--color-neutral-300, ${colors.neutral[300]});
    border-radius: ${borderRadius.md};
    padding: ${spacing[3]} ${spacing[4]};
    background: var(--color-neutral-0, ${colors.neutral[0]});
    color: var(--color-text-primary, ${colors.neutral[900]});
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &::placeholder {
      color: var(--color-text-secondary, ${colors.neutral[400]});
    }

    &:hover:not(:disabled) {
      border-color: var(--color-neutral-200, ${colors.neutral[400]});
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary, ${colors.primary.main});
      box-shadow: 0 0 0 3px var(--color-primary-lighter, ${colors.primary.lighter});
    }

    &:disabled {
      background: ${colors.neutral[100]};
      color: ${colors.neutral[400]};
      cursor: not-allowed;
    }
  }

  textarea {
    font-family: ${typography.fontFamily.mono};
    resize: vertical;
  }

  /* ========================================================================
     LISTS
     ======================================================================== */

  ul, ol {
    margin: ${spacing[4]} 0;
    padding-left: ${spacing[6]};
  }

  li {
    margin: ${spacing[2]} 0;
  }

  /* ========================================================================
     SCROLLBAR STYLING (Webkit browsers)
     ======================================================================== */

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.neutral[100]};
    border-radius: ${borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.neutral[400]};
    border-radius: ${borderRadius.full};
    border: 3px solid ${colors.neutral[100]};
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.neutral[500]};
  }

  /* ========================================================================
     CODE BLOCKS
     ======================================================================== */

  code {
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.fontSize.sm};
    background: ${colors.neutral[100]};
    padding: ${spacing[1]} ${spacing[2]};
    border-radius: ${borderRadius.sm};
    color: ${colors.error};
  }

  pre {
    background: ${colors.neutral[900]};
    color: ${colors.neutral[0]};
    padding: ${spacing[4]};
    border-radius: ${borderRadius.md};
    overflow-x: auto;
    font-size: ${typography.fontSize.sm};

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  /* ========================================================================
     MAIN CONTENT AREA
     ======================================================================== */

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }

  /* ========================================================================
     IMPORTANT FOR LAYOUT PAGES
     ======================================================================== */

  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-wrapper {
    flex: 1;
  }

  /* ========================================================================
     SCROLLBAR STYLES - Hide scrollbars while keeping scroll functionality
     ======================================================================== */

  /* Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  /* Firefox */
  * {
    scrollbar-width: none;
  }

  /* Internet Explorer and Edge */
  * {
    -ms-overflow-style: none;
  }

  /* ========================================================================
     ACCESSIBILITY: Reduced Motion
     ======================================================================== */

  ${media.reducedMotion} {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ========================================================================
     RESPONSIVE UTILITIES
     ======================================================================== */

  /* Mobile-first responsive classes */
  ${media.mobile} {
    body {
      font-size: ${typography.fontSize.base};
    }
  }

  /* Touch device adjustments */
  ${media.touch} {
    button, a, input {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* ========================================================================
     PRINT STYLES
     ======================================================================== */

  @media print {
    body {
      background: white;
      color: black;
    }

    a {
      text-decoration: underline;
    }

    button,
    .no-print {
      display: none !important;
    }
  }
`