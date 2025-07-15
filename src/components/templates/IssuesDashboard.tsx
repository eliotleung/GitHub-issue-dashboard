import React, { useEffect, useState } from 'react';
import { useIssuesStore } from '../../store/issuesStore';
import FilterTabs from '../molecules/FilterTabs';
import IssueList from '../organisms/IssueList';
import Loading from '../atoms/Loading';
import ErrorMessage from '../atoms/ErrorMessage';

// Main dashboard component for GitHub Issues
const IssuesDashboard: React.FC = () => {
  // Zustand store hooks for state and actions
  const {
    repo,
    setRepo,
    filter,
    setFilter,
    fetchIssues,
    issues,
    loading,
    error,
    selectedIssue,
    selectIssue,
  } = useIssuesStore();
  const [input, setInput] = useState(repo);
  const [dark, setDark] = useState(false);

  // Fetch issues when repo or filter changes
  useEffect(() => {
    if (repo) fetchIssues();
    // eslint-disable-next-line
  }, [repo, filter]);

  // Toggle dark mode by adding/removing 'dark' class on html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  // Handle repo input form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepo(input.trim());
  };

  return (
    <div className="flex w-screen min-h-screen justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-2xl p-4 sm:p-8 bg-white shadow-xl rounded-2xl border border-blue-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800 mt-8">
        {/* Dark mode toggle button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-900 dark:bg-gray-800 dark:text-gray-100 font-semibold shadow hover:bg-blue-200 dark:hover:bg-gray-700 transition"
            onClick={() => setDark(d => !d)}
          >
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        {/* Repo input form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="repo-input" className="block text-sm font-medium text-blue-900 mb-2 dark:text-gray-100">GitHub Repository</label>
          <div className="flex rounded-2xl shadow-sm bg-blue-50 border border-blue-100 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-800 dark:border-gray-700">
            <input
              id="repo-input"
              type="text"
              className="flex-1 block w-full rounded-l-2xl border-0 px-6 py-3 text-lg bg-blue-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="owner/repo"
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Repository name"
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 border-0 rounded-r-2xl bg-blue-600 text-white text-lg font-bold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Load
            </button>
          </div>
        </form>
        {/* Filter tabs for issue state */}
        <FilterTabs value={filter} onChange={setFilter} />
        {/* Loading, error, and issue list display */}
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <IssueList
            issues={issues}
            onIssueClick={issue => selectIssue(issue)}
          />
        )}
        {/* Issue detail modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-blue-900 bg-opacity-40 flex items-center justify-center z-50 dark:bg-black dark:bg-opacity-60">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-y-auto max-h-[90vh] text-blue-900 border border-blue-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
              <button
                className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => selectIssue(null)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedIssue.title}</h2>
              <div className="mb-2 text-sm text-blue-500 dark:text-gray-300">#{selectedIssue.number} opened by {selectedIssue.user.login}</div>
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedIssue.labels.map(label => (
                  <span key={label.id} className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-gray-200">{label.name}</span>
                ))}
              </div>
              {/* Render issue body as Markdown */}
              <div className="prose max-w-none markdown-body dark:prose-invert" dangerouslySetInnerHTML={{ __html: window.marked?.parse(selectedIssue.body || '') || selectedIssue.body }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesDashboard; 