import React from 'react';

import { Button as NativeButton, IIconButtonProps, Text } from 'native-base';

type Type = 'primary' | 'secondary' | 'link';

interface Props extends Omit<IIconButtonProps, 'title' | 'variant'> {
  type?: Type;
  title: string;
}

export function Button({ type = 'primary', title, ...rest }: Props) {
  if (type === 'link') {
    return (
      <NativeButton variant="link" {...rest}>
        <Text bold color="primary.600" fontSize="md">
          {title}
        </Text>
      </NativeButton>
    );
  }

  if (type === 'secondary') {
    return (
      <NativeButton borderColor="primary.600" variant="outline" {...rest}>
        <Text bold color="primary.600" fontSize="md">
          {title}
        </Text>
      </NativeButton>
    );
  }

  return (
    <NativeButton {...rest}>
      <Text bold color="neutral.100" fontSize="md">
        {title}
      </Text>
    </NativeButton>
  );
}
