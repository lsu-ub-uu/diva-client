/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

interface InputChipProps {
  label?: string;
  onClose?: () => void;
}

export const InputChip = ({ label = 'Contact', onClose }: InputChipProps) => {
  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 16px',
    minHeight: '32px',
    borderRadius: '8px',
    border: '1px solid #79747E',
    background: '#E7E0EC',
    color: '#49454F',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.1px',
    lineHeight: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconStyle: React.CSSProperties = {
    display: 'inline-flex',
    width: '18px',
    height: '18px',
    background: '#6750A4',
    borderRadius: '50%',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    lineHeight: 1,
  };

  return (
    <button style={chipStyle} type='button'>
      {label}
      {onClose && (
        <span
          style={iconStyle}
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          ×
        </span>
      )}
    </button>
  );
};

// Usage: <InputChip label="Filter" onClose={() => console.log('Closed')} />
