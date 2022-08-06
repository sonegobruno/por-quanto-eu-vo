/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Icon, Input as ElementInput, InputProps } from 'react-native-elements';
import { Control, Controller } from 'react-hook-form';

import * as S from './styles';

interface ControllerProps
  extends Omit<React.ComponentProps<typeof Controller>, 'render'> {
  control: Control<any, any>;
}

interface Props extends InputProps {
  controller: ControllerProps;
  label?: string;
  type?: 'text' | 'password';
  containerStyles?: React.ComponentProps<typeof S.Container>['style'];
}

const InputBase: ForwardRefRenderFunction<any, Props> = (
  { label = '', type = 'text', containerStyles, controller, ...rest },
  ref,
) => {
  const inputRef = useRef<any>(ref);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(
    type !== 'password',
  );

  const toggleFocus = useCallback(() => {
    setIsFocused(prevState => !prevState);
  }, []);

  const togglePasswordVisible = useCallback(() => {
    setPasswordIsVisible(prevState => !prevState);
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
            <ElementInput
              onChangeText={onChange}
              onBlur={() => {
                toggleFocus();
                onBlur();
              }}
              value={value}
              onFocus={toggleFocus}
              ref={inputRef}
              errorMessage={error?.message}
              label={label}
              inputContainerStyle={[
                S.styles.inputContainerStyle,
                S.stateStyle[state],
                rest.inputContainerStyle,
              ]}
              inputStyle={[S.styles.inputStyle, rest.inputStyle]}
              labelStyle={[S.styles.labelStyle, rest.labelStyle]}
              containerStyle={[S.styles.containerStyle, rest.containerStyle]}
              errorStyle={S.styles.errorStyle}
              secureTextEntry={!passwordIsVisible}
              rightIcon={
                type === 'password' && (
                  <Icon
                    name={passwordIsVisible ? 'eye' : 'eye-off'}
                    tvParallaxProperties={undefined}
                    onPress={togglePasswordVisible}
                    {...S.styles.passwordButtonStyle}
                  />
                )
              }
              {...rest}
            />
          );
        }}
      />
    </S.Container>
  );
};

export const Input = forwardRef(InputBase);
