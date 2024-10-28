'use client';
import React, { useState } from 'react';

interface MultiSelectProps {
  options: { value: string; label: string }[]; // value é o ID e label é o nome a ser exibido
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Impede o envio do formulário
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 w-full text-left flex justify-between items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        <span>
          {selectedValues.length > 0
            ? options
                .filter((option) => selectedValues.includes(option.value))
                .map((option) => option.label)
                .join(', ')
            : placeholder || 'Select...'}
        </span>
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-lg w-full">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedValues.includes(option.value)
                  ? 'bg-gray-200 dark:bg-gray-600'
                  : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
