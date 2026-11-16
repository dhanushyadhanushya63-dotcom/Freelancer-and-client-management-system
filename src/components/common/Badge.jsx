import React from 'react';

const variants = {
  green:  'badge badge-green',
  red:    'badge badge-red',
  yellow: 'badge badge-yellow',
  amber:  'badge badge-yellow',
  blue:   'badge badge-blue',
  gray:   'badge badge-gray',
  purple: 'badge badge-purple',
  indigo: 'badge badge-blue',
};

export default function Badge({ children, color = 'gray' }) {
  return (
    <span className={variants[color] || variants.gray}>
      {children}
    </span>
  );
}
