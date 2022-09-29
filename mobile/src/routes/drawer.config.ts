import nativeBaseTheme from 'styles/native-base-theme';

export const drawerIconConfig = (focused: boolean) => ({
  size: 24,
  color: focused
    ? nativeBaseTheme.colors.neutral[100]
    : nativeBaseTheme.colors.neutral[500],
});
