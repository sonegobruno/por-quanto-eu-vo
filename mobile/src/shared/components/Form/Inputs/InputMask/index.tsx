/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { Input as ElementInput, InputProps } from 'react-native-elements';
import { Control, Controller } from 'react-hook-form';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

import * as S from './styles';

interface ControllerProps
  extends Omit<React.ComponentProps<typeof Controller>, 'render'> {
  control: Control<any, any>;
}

interface Props extends InputProps {
  controller: ControllerProps;
  label?: string;
  containerStyles?: React.ComponentProps<typeof S.Container>['style'];
  type: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp | undefined;
}

export function InputMask({
  label = '',
  type,
  containerStyles,
  controller,
  options,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = useCallback(() => {
    setIsFocused(prevState => !prevState);
  }, []);

  return (
    <S.Container style={containerStyles}>
      <Controller
        {...controller}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          const state = isFocused
            ? 'focus'
            : error?.message
            ? 'error'
            : value
            ? 'filled'
            : 'normal';

          return (
            <TextInputMask
              customTextInput={ElementInput}
              onFocus={toggleFocus}
              onBlur={() => {
                toggleFocus();
                onBlur();
              }}
              onChangeText={textValue => onChange(textValue)}
              value={value}
              type={type}
              options={options}
              customTextInputProps={{
                errorMessage: error?.message,
                label,
                inputContainerStyle: [
                  S.styles.inputContainerStyle,
                  S.stateStyle[state],
                  rest.inputContainerStyle,
                ],
                inputStyle: [S.styles.inputStyle, rest.inputStyle],
                labelStyle: [S.styles.labelStyle, rest.labelStyle],
                containerStyle: [S.styles.containerStyle, rest.containerStyle],
                errorStyle: S.styles.errorStyle,
                ...rest,
              }}
            />
          );
        }}
      />
    </S.Container>
  );
}

// errorMessage={error?.message}
// label={label}
// inputContainerStyle={[
//   S.styles.inputContainerStyle,
//   S.stateStyle[state],
//   rest.inputContainerStyle,
// ]}
// inputStyle={[S.styles.inputStyle, rest.inputStyle]}
// labelStyle={[S.styles.labelStyle, rest.labelStyle]}
// containerStyle={[
//   S.styles.containerStyle,
//   rest.containerStyle,
// ]}
// errorStyle={S.styles.errorStyle}
