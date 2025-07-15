import React from 'react';

// Utility to determine if a hex color is light
function isColorLight(hex: string): boolean {
  if (!hex) return false;
  // Remove # if present
  hex = hex.replace('#', '');
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Perceived brightness formula
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

type LabelProps = {
  name: string;
  color: string;
};

const Label: React.FC<LabelProps> = ({ name, color }) => {
  const textColor = isColorLight(color) ? '#222' : '#fff';
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-semibold rounded mr-1"
      style={{ backgroundColor: `#${color}`, color: textColor }}
    >
      {name}
    </span>
  );
};

export default Label; 