import { Box, FormControl, WarningOutlineIcon } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  error: FieldError | undefined;
}

export const Footer = ({ error }: Props) => {
  return (
    <>
      <FormControl.ErrorMessage
        leftIcon={<WarningOutlineIcon color="error.500" size="xs" />}
        _text={{
          fontSize: RFValue(14),
          color: 'error.500',
          lineHeight: 'xs',
        }}
      >
        {error?.message}
      </FormControl.ErrorMessage>
      {!error?.message && <Box h={`${RFValue(28)}px`} />}
    </>
  );
};
