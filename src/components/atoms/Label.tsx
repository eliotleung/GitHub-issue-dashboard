import React from 'react';

type LabelProps = {
  name: string;
  color: string;
};

const Label: React.FC<LabelProps> = ({ name, color }) => (
  <span
    className="inline-block px-2 py-0.5 text-xs font-semibold rounded mr-1"
    style={{ backgroundColor: `#${color}`, color: '#fff' }}
  >
    {name}
  </span>
);

export default Label; 