import React from 'react';

type FilterType = 'all' | 'open' | 'closed';

interface FilterTabsProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

const tabs: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
];

const FilterTabs: React.FC<FilterTabsProps> = ({ value, onChange }) => (
  <div className="mb-6">
    <nav className="flex space-x-4 border-b border-blue-200" aria-label="Tabs">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`relative py-3 px-6 text-base font-semibold transition-colors
            ${value === tab.value
              ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50'
              : 'text-blue-400 hover:text-blue-700 hover:bg-blue-50 border-b-2 border-transparent'}
          `}
          onClick={() => onChange(tab.value)}
          aria-current={value === tab.value ? 'page' : undefined}
        >
          {tab.label}
          {value === tab.value && (
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded-full animate-pulse" />
          )}
        </button>
      ))}
    </nav>
  </div>
);

export default FilterTabs; 