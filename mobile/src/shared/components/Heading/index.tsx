import { Text, Heading as HeadingNative } from 'native-base';
import React from 'react';

interface Props {
  title: string;
  subTitle: string;
}

export function Heading({ title, subTitle }: Props) {
  return (
    <>
      <HeadingNative mt={4} color="neutral.700" lineHeight="sm" fontSize="3xl">
        {title}
      </HeadingNative>
      <Text color="neutral.600" lineHeight="sm" fontSize="xs">
        {subTitle}
      </Text>
    </>
  );
}
