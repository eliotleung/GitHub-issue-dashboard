import React from 'react';
import IssueItem, { type IssueItemProps } from '../molecules/IssueItem';

interface IssueListProps {
  issues: IssueItemProps[];
  onIssueClick: (issue: IssueItemProps) => void;
}

const IssueList: React.FC<IssueListProps> = ({ issues, onIssueClick }) => (
  <div className="space-y-4">
    {issues.length === 0 ? (
      <div className="text-blue-400 text-center py-8">No issues found.</div>
    ) : (
      issues.map(issue => (
        <IssueItem key={issue.number} {...issue} onClick={() => onIssueClick(issue)} />
      ))
    )}
  </div>
);

export default IssueList; 