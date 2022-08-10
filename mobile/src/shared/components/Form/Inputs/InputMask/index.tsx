/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  IFormControlProps,
  IInputProps,
  Input as NativeInput,
} from 'native-base';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

import { RFValue } from 'react-native-responsive-fontsize';
import { Footer } from '../InputNative/Footer';

interface ControllerProps
  extends Omit<React.ComponentProps<typeof Controller>, 'render'> {
  control: Control<any, any>;
}

interface Props extends IInputProps {
  controller: ControllerProps;
  label?: string;
  maskType: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp | undefined;
  containerProps?: IFormControlProps;
}

export function InputMask({
  label = '',
  maskType,
  controller,
  containerProps,
  maskOptions,
  ...rest
}: Props) {
  return (
    <Controller
      {...controller}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <FormControl isInvalid={!!error?.message} {...containerProps}>
            <FormControl.Label
              _text={{
                color: 'neutral.700',
                fontSize: RFValue(16),
              }}
            >
              {label}
            </FormControl.Label>
            <TextInputMask
              customTextInput={NativeInput}
              onBlur={onBlur}
              onChangeText={textValue => onChange(textValue)}
              value={value}
              type={maskType}
              options={maskOptions}
              customTextInputProps={{
                ref,
                color: 'neutral.700',
                bg: 'neutral.200',
                borderRadius: 6,
                borderColor: 'neutral.300',
                w: 'full',
                h: `${RFValue(44)}px`,
                fontSize: 'md',
                placeholderTextColor: 'neutral.600',
                _focus: {
                  borderColor: error ? 'error.500' : 'secondary.300',
                  borderWidth: 2,
                  bg: error ? 'error.200' : 'secondary.100',
                },
                _invalid: {
                  borderColor: 'error.500',
                  borderWidth: 2,
                },
                ...rest,
              }}
            />
            <Footer error={error} />
          </FormControl>
        );
      }}
    />
  );
}
