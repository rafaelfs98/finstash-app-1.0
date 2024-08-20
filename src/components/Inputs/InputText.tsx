// CustomTextInput.tsx

import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

type InputTextProps = {
  error?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  type: string;
} & TextInputProps;

const InputText: React.FC<InputTextProps> = ({
  error,
  label,
  name,
  placeholder,
  required = false,
  register = () => {},
  ...otherProps
}) => {
  return (
    <TextInput
      error={error}
      radius="lg"
      label={label}
      placeholder={placeholder}
      required={required}
      {...otherProps}
      {...register(name)}
    />
  );
};

export default InputText;
