import React from 'react';
import Label from '../atoms/Label';

export interface IssueItemProps {
  number: number;
  title: string;
  user: { login: string };
  labels: { id: number; name: string; color: string }[];
  updated_at: string;
  state: 'open' | 'closed';
  onClick?: () => void;
}

const IssueItem: React.FC<IssueItemProps> = ({ number, title, user, labels, updated_at, state, onClick }) => (
  <div
    className="border border-blue-100 rounded-xl p-6 mb-2 cursor-pointer hover:shadow-lg hover:bg-blue-50 transition bg-white text-blue-900 shadow-sm"
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-pressed="false"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="font-semibold text-lg text-blue-900">{title}</div>
      <span className={`text-xs px-3 py-1 rounded-full font-bold ${state === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-blue-200 text-blue-500'}`}>{state}</span>
    </div>
    <div className="text-sm text-blue-500 mb-2">#{number} opened by {user.login}</div>
    <div className="flex flex-wrap gap-2 mb-2">
      {labels.map(label => (
        <Label key={label.id} name={label.name} color={label.color} />
      ))}
    </div>
    <div className="text-xs text-blue-400">Last updated: {new Date(updated_at).toLocaleString()}</div>
  </div>
);

export default IssueItem; 