import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import IssueItem, { type IssueItemProps } from './IssueItem';
import React from 'react';
import { describe, it, expect } from 'vitest';

describe('IssueItem', () => {
  const props: IssueItemProps = {
    number: 123,
    title: 'Test Issue',
    user: { login: 'testuser' },
    labels: [
      { id: 1, name: 'bug', color: 'd73a4a' },
      { id: 2, name: 'help wanted', color: '008672' },
    ],
    updated_at: '2023-01-01T00:00:00Z',
    state: 'open',
  };

  it('renders issue title, number, user, and labels', () => {
    render(<IssueItem {...props} />);
    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(screen.getByText('#123 opened by testuser')).toBeInTheDocument();
    expect(screen.getByText('bug')).toBeInTheDocument();
    expect(screen.getByText('help wanted')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
  });
}); 