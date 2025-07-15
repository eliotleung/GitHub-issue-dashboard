# GitHub Issues Dashboard

This project is a simple, modern dashboard for browsing and searching GitHub issues from any public repository. It’s designed to be fast, accessible, and easy to use, with a clean UI and a focus on developer experience.

---

## Tech Stack

- React 19 with TypeScript (using hooks)
- Vite for fast development and builds
- Tailwind CSS v3 for styling, including dark mode and responsive design
- Zustand for state management
- Vitest and React Testing Library for unit and component testing
- ESLint and Prettier for code quality and formatting
- Cypress for end-to-end testing (optional)
- GitHub Actions for continuous integration (linting and tests)

---

## Features

- Enter any public GitHub repository in the format `owner/repo`
- Fetches up to 50 issues, sorted by most recently updated
- Shows issue title, number, creator, labels, last updated time, and status (open/closed)
- Filter issues by status: All, Open, or Closed
- Click an issue to view its details, with the body rendered as Markdown
- Search issues by title or author in real time
- Handles loading, error, and empty states gracefully
- Fully responsive layout with a dark mode toggle
- Caches issues locally for 10 minutes, with a manual refresh option
- Uses React.lazy and Suspense for code splitting
- Accessible and keyboard-friendly interface

---

## Test Coverage

- Components are tested to ensure correct rendering of issue lists, filtering, and detail views
- Tests cover loading, error, and empty UI states
- Linting is enforced with strict TypeScript rules (no use of `any`)
- Continuous integration runs lint and tests on every push

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
