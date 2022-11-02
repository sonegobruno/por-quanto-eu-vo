/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import {
  FormControl,
  IFormControlProps,
  IInputProps,
  Input as NativeInput,
} from 'native-base';
import { Control, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { TogglePassword } from './TogglePassword';
import { Footer } from '../../Footer';
import { Label } from '../../Label';

interface ControllerProps
  extends Omit<React.ComponentProps<typeof Controller>, 'render'> {
  control: Control<any, any>;
}

interface Props extends IInputProps {
  controller: ControllerProps;
  label?: string;
  type?: 'text' | 'password';
  containerProps?: IFormControlProps;
}

export function Input({
  label = '',
  type = 'text',
  containerProps,
  controller,
  ...rest
}: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(
    type !== 'password',
  );

  const togglePasswordVisible = useCallback(() => {
    setPasswordIsVisible(prevState => !prevState);
  }, []);

  return (
    <Controller
      {...controller}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <FormControl isInvalid={!!error?.message} {...containerProps}>
            {label !== '' && <Label>{label}</Label>}
            <NativeInput
              ref={ref}
              type={passwordIsVisible ? 'text' : 'password'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              color="neutral.700"
              bg="neutral.200"
              borderRadius={6}
              borderColor="neutral.300"
              w="full"
              h={`${RFValue(44)}px`}
              fontSize="md"
              placeholderTextColor="neutral.600"
              _focus={{
                borderColor: error ? 'error.500' : 'secondary.300',
                borderWidth: 2,
                bg: error ? 'error.200' : 'secondary.100',
              }}
              _invalid={{
                borderColor: 'error.500',
                borderWidth: 2,
              }}
              InputRightElement={
                type === 'password' ? (
                  <TogglePassword
                    onTogglePasswordVisibility={togglePasswordVisible}
                    passwordIsVisible={passwordIsVisible}
                  />
                ) : (
                  rest.InputRightElement
                )
              }
              {...rest}
            />
            <Footer error={error} />
          </FormControl>
        );
      }}
    />
  );
}
