/* eslint-disable @typescript-eslint/no-explicit-any */
// CustomTextInput.tsx

import React from 'react';
import { Select, SelectProps } from '@mantine/core';

type InputSelectProps = {
  error?: string;
  label: string;
  name: string;
  placeholder?: string;
  setType: (value: string) => void;
  required?: boolean;
   
  register?: any;
} & SelectProps;

const InputSelect: React.FC<InputSelectProps> = ({
  error,
  label,
  name,
  setType,
  placeholder,
  required = false,
  register = () => {},
  ...otherProps
}) => {
  return (
    <Select
      error={error}
      radius="lg"
      label={label}
      onChange={(event) => setType(event as string)}
      placeholder={placeholder}
      required={required}
      {...otherProps}
      {...register(name)}
    />
  );
};

export default InputSelect;
