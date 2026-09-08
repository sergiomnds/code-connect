import { configureAxe } from 'jest-axe'

/**
 * axe restricted to WCAG 2.0/2.1 level A + AA success criteria (the
 * project's accessibility target). Level A rules are included because
 * AA conformance requires A conformance too.
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
})
