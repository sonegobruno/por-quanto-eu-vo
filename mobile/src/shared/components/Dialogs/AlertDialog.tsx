import React, { useRef } from 'react';
import {
  AlertDialog as AlertDialogNative,
  Button,
  Heading,
  Text,
} from 'native-base';

interface Props {
  isOpen: boolean;
  title: string;
  text: string;
  doneText: string;
  onCancel: () => void;
  onDone: () => void;
  doneIsLoading?: boolean;
}

export function AlertDialog({
  isOpen,
  title,
  text,
  doneText,
  onCancel,
  onDone,
  doneIsLoading = false,
}: Props) {
  const cancelRef = useRef<typeof Button>(null);

  return (
    <AlertDialogNative
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <AlertDialogNative.Content bg="neutral.100">
        <AlertDialogNative.CloseButton />
        <AlertDialogNative.Header bg="transparent" borderBottomWidth={0}>
          <Heading fontSize="lg" color="neutral.700">
            {title}
          </Heading>
        </AlertDialogNative.Header>
        <AlertDialogNative.Body bg="transparent" py="0">
          <Text fontSize="md" color="neutral.700">
            {text}
          </Text>
        </AlertDialogNative.Body>
        <AlertDialogNative.Footer borderTopWidth={0} bg="transparent">
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="neutral"
              onPress={onCancel}
              ref={cancelRef}
            >
              <Text fontSize="md" fontWeight="600" color="neutral.700">
                Cancelar
              </Text>
            </Button>
            <Button
              colorScheme="red"
              onPress={onDone}
              isLoading={doneIsLoading}
            >
              <Text fontSize="md" fontWeight="bold" color="neutral.100">
                {doneText}
              </Text>
            </Button>
          </Button.Group>
        </AlertDialogNative.Footer>
      </AlertDialogNative.Content>
    </AlertDialogNative>
  );
}
