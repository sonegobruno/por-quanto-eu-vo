import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Text, Button as NativeButton, Icon } from 'native-base';
import { Button } from '../Buttons/Button';
import { SelectType } from '.';
import { OptionIcon } from './OptionIcon';

interface Props {
  modalTitle: string;
  options: SelectType[];
  onChangeSelectValue: (value: SelectType['value']) => void;
  selectValue: SelectType['value'];
  openModal: boolean;
  onToggleModal: (value: boolean) => void;
}

export function SelectModal({
  modalTitle,
  selectValue,
  onChangeSelectValue,
  options,
  openModal,
  onToggleModal,
}: Props) {
  const [carSelected, setCarSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!openModal && carSelected !== selectValue) {
      setCarSelected(selectValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const handleSelectOption = useCallback(() => {
    onChangeSelectValue(carSelected);
    onToggleModal(false);
  }, [onChangeSelectValue, carSelected, onToggleModal]);

  const isSelectedValue = (value: string | undefined): boolean => {
    return value === carSelected;
  };

  return (
    <Modal isOpen={openModal} onClose={() => onToggleModal(false)} size="lg">
      <Modal.Content>
        <Modal.CloseButton color="neutral.700" />
        <Modal.Header borderBottomWidth={0}>
          <Text fontSize="xl" fontWeight="bold" color="neutral.700">
            {modalTitle}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <NativeButton.Group
            isAttached
            direction="column"
            colorScheme="primary"
          >
            {options.map(option => (
              <NativeButton
                key={option.value}
                onPress={() => setCarSelected(option.value)}
                variant={isSelectedValue(option.value) ? 'subtle' : 'ghost'}
                w="100%"
                justifyContent="space-between"
                _text={{
                  fontSize: 'lg',
                  color: 'neutral.700',
                  fontWeight: isSelectedValue(option.value) ? 'bold' : 'normal',
                }}
                borderRadius="0"
                leftIcon={
                  <Icon
                    as={
                      <OptionIcon
                        isOptionSelected={isSelectedValue(option.value)}
                      />
                    }
                  />
                }
              >
                {option.label}
              </NativeButton>
            ))}
          </NativeButton.Group>
          ;
        </Modal.Body>
        <Modal.Footer justifyContent="center" borderTopWidth={0}>
          <Button onPress={handleSelectOption} w="60%" title="Selecionar" />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
