// CustomTextInput.tsx

import { ColorInput, ColorInputProps } from '@mantine/core';
import React from 'react';

type InputTextProps = {
  label: string;
} & ColorInputProps;

const InputColor: React.FC<InputTextProps> = ({
  label,

  ...otherProps
}) => {
  return <ColorInput radius="lg" label={label} {...otherProps} />;
};

export default InputColor;
