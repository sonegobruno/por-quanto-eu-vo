import React from 'react';
import { Text, Spinner } from 'native-base';

interface Props {
  isLoading: boolean;
  title: string;
  color: 'primary' | 'secondary';
}

export function Children({ isLoading, title, color }: Props) {
  const DSColor = color === 'primary' ? 'neutral.100' : 'primary.600';

  if (isLoading) {
    return <Spinner color={DSColor} />;
  }

  return (
    <Text bold color={DSColor} fontSize="md">
      {title}
    </Text>
  );
}
