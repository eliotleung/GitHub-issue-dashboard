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

## Suggestions for Further Improvement

Below are some ideas for enhancing the dashboard, with a focus on security, performance, and user experience. All suggestions use Australian English spelling and conventions.

### Security
- Warn users if they are approaching GitHub’s API rate limit (60 requests per hour for unauthenticated users).
- Optionally, allow users to enter a GitHub personal access token for higher rate limits (with a clear privacy notice).
- Strictly validate the `owner/repo` input format before making API calls.
- Sanitize all user input to prevent injection attacks.
- Ensure Markdown is rendered safely (avoid XSS) by using a library such as `dompurify` in combination with your Markdown parser.
- Gracefully handle all fetch errors, including network issues, API errors, and unexpected data formats.

### Performance
- Support loading more than 50 or 100 issues by implementing pagination or infinite scroll, reducing initial load time and memory usage.
- Debounce the search input to avoid unnecessary re-renders on every keystroke.
- Use `React.memo` for pure components to avoid unnecessary re-renders.
- Consider virtualisation (e.g., `react-window`) for very large lists.
- Use IndexedDB for larger or more persistent caches.
- Invalidate cache if the repository or filter changes, or allow users to clear the cache.
- Analyse and optimise bundle size (e.g., only import what you use from libraries).

### User Interface and Experience
- Ensure all interactive elements are keyboard accessible.
- Add ARIA labels and roles where appropriate.
- Use focus outlines and visible states for all controls.
- Further optimise for mobile: larger touch targets, better spacing, and responsive font sizes.
- Use skeleton loaders instead of spinners for a smoother perceived experience.
- Provide friendly, actionable messages for empty results and errors (e.g., “No issues found”, “Repository not found”).
- Use the actual GitHub label colours for better visual consistency.
- Allow users to select system theme or remember their dark/light mode preference.
- Display the creator’s avatar next to their name for a more engaging UI.
- Make issue titles clickable, opening the issue on GitHub in a new tab.
- Support images, code blocks, and tables in Markdown rendering. Optionally, allow users to copy code blocks easily.
- Add a simple settings panel for advanced options (e.g., token input, cache clear, theme).

### Advanced (Optional)
- Make the app installable and usable offline (for cached data) as a Progressive Web App (PWA).
- Support multiple languages (localisation).
- Track usage (with user consent) to improve features.
