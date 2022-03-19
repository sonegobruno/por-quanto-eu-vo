/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ForwardRefRenderFunction, forwardRef, useRef } from 'react';
import { Input as ElementInput, InputProps } from 'react-native-elements';
import { Control, Controller } from 'react-hook-form';

import * as S from './styles';

interface ControllerProps
  extends Omit<React.ComponentProps<typeof Controller>, 'render'> {
  control: Control<any, any>;
}

interface Props extends InputProps {
  controller: ControllerProps;
  label?: string;
  containerStyles?: React.ComponentProps<typeof S.Container>['style'];
}

const InputBase: ForwardRefRenderFunction<any, Props> = (
  { label = '', containerStyles, controller, ...rest },
  ref,
) => {
  const inputRef = useRef<any>(ref);

  return (
    <S.Container style={containerStyles}>
      <Controller
        {...controller}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <ElementInput
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={inputRef}
            errorMessage={error?.message}
            label={label}
            inputContainerStyle={[
              S.styles.inputContainerStyle,
              rest.inputContainerStyle,
            ]}
            labelStyle={[S.styles.labelStyle, rest.labelStyle]}
            containerStyle={[S.styles.containerStyle, rest.containerStyle]}
            {...rest}
          />
        )}
      />
    </S.Container>
  );
};

export const Input = forwardRef(InputBase);
