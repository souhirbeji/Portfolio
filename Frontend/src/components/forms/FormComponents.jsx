import { useState } from 'react';
import React from 'react';

export const FormField = ({ label, children, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
);

export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition duration-150 ease-in-out ${className}`}
    {...props}
  />
));

export const Select = React.forwardRef(({ options, className = '', ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition duration-150 ease-in-out ${className}`}
    {...props}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

export const TextArea = React.forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition duration-150 ease-in-out resize-y ${className}`}
    {...props}
  />
));

export const Button = ({ variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-violet-500 hover:bg-violet-600 text-white',
    secondary: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out 
      disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export const TagInput = ({ value, onChange, suggestions, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const addTag = (tag) => {
    const newTags = [...value, tag];
    onChange(newTags);
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    const newTags = value.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm
            bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {suggestions
              .filter(s => s.toLowerCase().includes(inputValue.toLowerCase()))
              .slice(0, 5)
              .map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addTag(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {suggestion}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};


export const DatePicker = React.forwardRef(({ value, onChange, disabled, required, className = '', ...props }, ref) => {
  const formatDate = (date) => {
    if (!date) return '';
    // Accepte soit une string ISO soit un objet Date
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Ajoute le jour 1 pour créer une date valide
      const fullDate = new Date(`${dateValue}-01T00:00:00.000Z`);
      onChange(fullDate.toISOString());
    } else {
      onChange(null);
    }
  };

  return (
    <input
      ref={ref}
      type="month"
      value={formatDate(value)}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      className={`w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
        focus:ring-2 focus:ring-violet-500 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        transition duration-150 ease-in-out ${className}`}
      {...props}
    />
  );
});

