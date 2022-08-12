import React from 'react';

import { Button as NativeButton, IIconButtonProps } from 'native-base';
import { Children } from './Children';

type Type = 'primary' | 'secondary' | 'link';

interface Props extends Omit<IIconButtonProps, 'title' | 'variant'> {
  type?: Type;
  title: string;
  isLoading?: boolean;
}

export function Button({
  type = 'primary',
  title,
  isLoading = false,
  ...rest
}: Props) {
  if (type === 'link') {
    return (
      <NativeButton
        testID="NativeButton"
        variant="link"
        disabled={isLoading || rest.disabled}
        {...rest}
      >
        <Children color="secondary" isLoading={isLoading} title={title} />
      </NativeButton>
    );
  }

  if (type === 'secondary') {
    return (
      <NativeButton
        testID="NativeButton"
        borderColor="primary.600"
        variant="outline"
        disabled={isLoading || rest.disabled}
        {...rest}
      >
        <Children color="secondary" isLoading={isLoading} title={title} />
      </NativeButton>
    );
  }

  return (
    <NativeButton
      testID="NativeButton"
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      <Children color="primary" isLoading={isLoading} title={title} />
    </NativeButton>
  );
}
