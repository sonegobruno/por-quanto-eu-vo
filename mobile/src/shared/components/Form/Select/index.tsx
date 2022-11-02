import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormControl, Pressable, Input, IInputProps } from 'native-base';
import { FieldError } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { Footer } from '../Footer';
import { Label } from '../Label';
import { SelectModal } from './SelectModal';

export type SelectType = {
  value: string | undefined;
  label: string;
};

interface Props extends IInputProps {
  label?: string | null;
  modalTitle: string;
  options: SelectType[];
  error: FieldError | undefined;
  onChangeSelectValue: (value: SelectType['value']) => void;
  selectValue: SelectType['value'];
}

const SelectBase: ForwardRefRenderFunction<any, Props> = (
  {
    label = null,
    modalTitle,
    options,
    error,
    onChangeSelectValue,
    selectValue,
    ...rest
  },
  ref,
) => {
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const finalRef = useRef<typeof Pressable>(null);

  const selectedlabel = useMemo(() => {
    return options.find(option => option.value === selectValue)?.label ?? '';
  }, [options, selectValue]);

  const toggleSelectModal = useCallback((value: boolean) => {
    setOpenSelectModal(value);
  }, []);

  return (
    <>
      <FormControl isInvalid={!!error?.message}>
        {label && <Label>{label}</Label>}
        <Pressable ref={finalRef} onPress={() => setOpenSelectModal(true)}>
          {({ isFocused, isPressed }) => (
            <Input
              ref={ref as any}
              isReadOnly
              value={selectedlabel}
              color="neutral.700"
              bg="neutral.200"
              borderRadius={6}
              borderColor="neutral.300"
              w="full"
              h={`${RFValue(44)}px`}
              fontSize="md"
              placeholderTextColor="neutral.600"
              isFocused={isPressed || isFocused}
              _focus={{
                borderColor: error ? 'error.500' : 'secondary.300',
                borderWidth: 2,
                bg: error ? 'error.200' : 'secondary.100',
              }}
              _invalid={{
                borderColor: 'error.500',
                borderWidth: 2,
              }}
              {...rest}
            />
          )}
        </Pressable>
        <Footer error={error} />
      </FormControl>

      <SelectModal
        modalTitle={modalTitle}
        onChangeSelectValue={onChangeSelectValue}
        onToggleModal={toggleSelectModal}
        openModal={openSelectModal}
        options={options}
        selectValue={selectValue}
      />
    </>
  );
};

export const Select = forwardRef(SelectBase);
