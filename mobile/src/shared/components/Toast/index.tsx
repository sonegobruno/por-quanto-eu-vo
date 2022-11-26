import React from 'react';
import { Box, Icon, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

type Type = 'success' | 'error' | 'warning' | 'info';
interface Props {
  title: string;
  type: Type;
}

function Toast({ title, type }: Props) {
  const bg =
    type === 'success'
      ? 'emerald.500'
      : type === 'error'
      ? 'error.500'
      : type === 'warning'
      ? 'warning.400'
      : 'blue.500';

  const icon =
    type === 'success'
      ? 'check-circle'
      : type === 'error'
      ? 'alert-circle'
      : type === 'warning'
      ? 'alert-triangle'
      : 'info';

  return (
    <Box bg={bg} flexDir="row" w="100%" px="3" py="4" rounded="sm">
      <Icon as={<Feather name={icon} />} size={5} mr="2" color="neutral.100" />
      <Text color="neutral.100">{title}</Text>
    </Box>
  );
}

export function toastConfig(title: string, type: Type): InterfaceToastProps {
  return {
    render: () => <Toast title={title} type={type} />,
    placement: 'top',
  };
}
