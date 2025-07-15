import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueList from './IssueList';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

const issues = [
  {
    number: 1,
    title: 'First Issue',
    user: { login: 'alice' },
    labels: [
      { id: 1, name: 'bug', color: 'd73a4a' },
    ],
    updated_at: '2023-01-01T00:00:00Z',
    state: 'open' as const,
  },
  {
    number: 2,
    title: 'Second Issue',
    user: { login: 'bob' },
    labels: [],
    updated_at: '2023-01-02T00:00:00Z',
    state: 'closed' as const,
  },
];

describe('IssueList', () => {
  it('renders a list of issues', () => {
    render(<IssueList issues={issues} onIssueClick={() => {}} />);
    expect(screen.getByText('First Issue')).toBeInTheDocument();
    expect(screen.getByText('Second Issue')).toBeInTheDocument();
  });

  it('calls onIssueClick when an item is clicked', () => {
    const onIssueClick = vi.fn();
    render(<IssueList issues={issues} onIssueClick={onIssueClick} />);
    fireEvent.click(screen.getByText('First Issue'));
    expect(onIssueClick).toHaveBeenCalled();
  });
}); 