import { Button, FormControl, IFormControlProps } from 'native-base';
import React, { Key, useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import { Footer } from '../Footer';
import { Label } from '../Label';

export type ToggleButtonItem<T> = {
  value: T;
  label: string;
};

interface Props<T> {
  label?: string | null;
  error: FieldError | undefined;
  containerProps?: IFormControlProps;
  options: ToggleButtonItem<T>[];
  value: T;
  onChangeValue: (value: T) => void;
}

export function ToggleButton<T>({
  label,
  error,
  containerProps,
  options,
  value,
  onChangeValue,
}: Props<T>) {
  if (options.length > 2) {
    throw new Error('Much options on Toggle button');
  }

  const isSelected = useCallback(
    (buttonValue: T): boolean => {
      return value === buttonValue;
    },
    [value],
  );

  return (
    <FormControl isInvalid={!!error?.message} {...containerProps}>
      {label && <Label>{label}</Label>}
      <Button.Group colorScheme="primary">
        {options.map(option => (
          <Button
            key={option.value as Key}
            onPress={() => onChangeValue(option.value)}
            variant={isSelected(option.value) ? 'solid' : 'outline'}
            borderRadius={999}
            minW={120}
            borderColor={
              isSelected(option.value) ? 'primary.500' : 'neutral.600'
            }
            _text={{
              fontWeight: isSelected(option.value) ? 'bold' : 'normal',
              color: isSelected(option.value) ? 'neutral.100' : 'neutral.600',
            }}
          >
            {option.label}
          </Button>
        ))}
      </Button.Group>
      <Footer error={error} />
    </FormControl>
  );
}
