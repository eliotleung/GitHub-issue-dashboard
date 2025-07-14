import { create } from 'zustand';

// Type for issue filter
export type FilterType = 'all' | 'open' | 'closed';

// Type for a GitHub issue
export interface Issue {
  number: number;
  title: string;
  user: { login: string };
  labels: { id: number; name: string; color: string }[];
  updated_at: string;
  state: 'open' | 'closed';
  body: string;
}

// Zustand store state and actions for issues dashboard
interface IssuesState {
  repo: string; // Current repository name (owner/repo)
  issues: Issue[]; // List of fetched issues
  filter: FilterType; // Current filter (all/open/closed)
  loading: boolean; // Loading state
  error: string | null; // Error message
  selectedIssue: Issue | null; // Currently selected issue for detail view
  setRepo: (repo: string) => void; // Set repository name
  setFilter: (filter: FilterType) => void; // Set filter
  fetchIssues: () => Promise<void>; // Fetch issues from GitHub API or cache
  selectIssue: (issue: Issue | null) => void; // Select or deselect an issue
}

const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes in ms

// Zustand store implementation
export const useIssuesStore = create<IssuesState>((set, get) => ({
  repo: '',
  issues: [],
  filter: 'all',
  loading: false,
  error: null,
  selectedIssue: null,
  setRepo: (repo) => set({ repo }),
  setFilter: (filter) => set({ filter }),
  selectIssue: (issue) => set({ selectedIssue: issue }),
  fetchIssues: async () => {
    const { repo, filter } = get();
    if (!repo) return;
    set({ loading: true, error: null, issues: [] });
    const cacheKey = `issues:${repo}:${filter}`;
    try {
      // Try to load from cache
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          set({ issues: data, loading: false });
          return;
        }
      }
      // Fetch issues from GitHub REST API
      const url = `https://api.github.com/repos/${repo}/issues?per_page=50&sort=updated&direction=desc&state=${filter === 'all' ? 'all' : filter}`;
      const res = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch issues: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      set({ issues: data, loading: false });
      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e: unknown) {
      // Handle fetch or network errors
      const message = typeof e === 'object' && e && 'message' in e ? (e as { message: string }).message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },
})); 