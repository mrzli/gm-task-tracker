import React from 'react';

export function disableArg() {
  return { table: { disable: true } };
}

export function onSubmit(value) {
  console.log('Submitted:', value);
}

export const PLACEHOLDER_CONTENT = (
  <div style={{ width: 100, height: 100, backgroundColor: 'orange' }} />
);
