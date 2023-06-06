import React, { FC } from 'react';

interface InputProps {
  id: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string | number;
  error?: string | boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Input: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
}) => {
  return (
    <input
      className="input w-full bg-base-200"
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
    />
  );
};

export const Select: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChangeSelect,
}) => {
  return (
    <select
      className="select w-full bg-base-200"
      id={id}
      name={name}
      value={value}
      onChange={onChangeSelect}
      placeholder={label}
    />
  );
};
