import React, { FC } from 'react';

interface InputProps {
  id: string;
  label?: string;
  name?: string;
  type?: string;
  defaultVal?: string;
  value?: string | number;
  error?: string | boolean | undefined;
  touch?: string | boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

interface SelectProps {
  id: string;
  label?: string;
  name?: string;
  value?: string | number;
  error?: string | boolean | undefined;
  touch?: string | boolean | undefined;
  options?: Array<string>;
  onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

export const Input: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
  touch,
}) => {
  return (
    <div className="h-16 w-full">
      <input
        className={`input w-full bg-base-200 ${
          error && touch ? 'input-error' : ''
        }`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
      />
      <p>
        {error && touch && <span className="text-sm text-error">{error}</span>}
      </p>
    </div>
  );
};

export const Select: FC<SelectProps> = ({
  id,
  label,
  name,
  options,
  value,
  error,
  onChangeSelect,
  onBlur,
  touch,
}) => {
  return (
    <div className="h-16 w-full">
      <select
        className={`select w-full bg-base-200 ${
          error && touch ? 'select-error' : ''
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChangeSelect}
        onBlur={onBlur}
      >
        <option
          disabled
          selected
        >
          {label}
        </option>
        {options?.map((prop) => {
          return <option>{prop}</option>;
        })}
      </select>
      <p>
        {error && touch && <span className="text-sm text-error">{error}</span>}
      </p>
    </div>
  );
};
