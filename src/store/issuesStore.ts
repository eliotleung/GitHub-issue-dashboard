import { create } from 'zustand';

export type FilterType = 'all' | 'open' | 'closed';

export interface Issue {
  number: number;
  title: string;
  user: { login: string };
  labels: { id: number; name: string; color: string }[];
  updated_at: string;
  state: 'open' | 'closed';
  body: string;
}

interface IssuesState {
  repo: string;
  issues: Issue[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
  selectedIssue: Issue | null;
  setRepo: (repo: string) => void;
  setFilter: (filter: FilterType) => void;
  fetchIssues: () => Promise<void>;
  selectIssue: (issue: Issue | null) => void;
}

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
    try {
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
    } catch (e: unknown) {
      const message = typeof e === 'object' && e && 'message' in e ? (e as { message: string }).message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },
})); 