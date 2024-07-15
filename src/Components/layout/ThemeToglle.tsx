import {
  ActionIcon,
  ActionIconProps,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';

import classes from '../../Styles/MantineCss/ActionToggle.module.css';

const ThemeTogle: React.FC<ActionIconProps> = ({ ...otherProps }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true
  });
  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      aria-label="Toggle color scheme"
      {...otherProps}
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};

export default ThemeTogle;
