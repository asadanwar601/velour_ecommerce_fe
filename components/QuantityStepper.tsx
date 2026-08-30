'use client';

import React from 'react';
import { MinusIcon, PlusIcon } from './Icons';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

export default function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="qty-stepper" role="group" aria-label="Quantity Stepper">
      <button
        type="button"
        className="qty-btn"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon size={14} />
      </button>

      <span className="qty-value" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        className="qty-btn"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
