import React, { useCallback, useState } from 'react';
import { HStack, IconButton, useToast } from 'native-base';
import nativeBaseTheme from 'styles/native-base-theme';
import { Pencil, Trash } from 'phosphor-react-native';
import { useMutation } from 'react-query';
import { api } from 'services/api';
import { queryClient } from 'services/query-client';
import { toastConfig } from 'shared/components/Toast';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { AlertDialog } from 'shared/components/Dialogs/AlertDialog';
import { Car } from 'entities/car/car';

interface Props {
  carName: string;
  carId: string;
}

export function ActionsCard({ carName, carId }: Props) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const closeAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openAlert = useCallback(() => {
    setIsOpen(true);
  }, []);

  const mutationDeleteCar = useMutation(
    async () => {
      return api.delete(`/car/${carId}`);
    },
    {
      onSuccess() {
        const cars = queryClient.getQueryData<Car[]>('my-cars') ?? [];
        queryClient.setQueryData(
          'my-cars',
          cars.filter(car => car.id !== carId),
        );
        toast.show(toastConfig('Carro removido com sucesso', 'success'));
      },
      onError(err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
      },
    },
  );

  const handleDeleteCar = useCallback(() => {
    mutationDeleteCar.mutate();
  }, [mutationDeleteCar]);

  return (
    <HStack space="2" position="absolute" right="4" top="3">
      <IconButton
        size="sm"
        colorScheme="secondary"
        variant="outline"
        icon={
          <Pencil color={nativeBaseTheme.colors.secondary[500]} size={16} />
        }
      />
      <IconButton
        onPress={openAlert}
        size="sm"
        colorScheme="error"
        variant="outline"
        icon={<Trash color={nativeBaseTheme.colors.error[500]} size={16} />}
      />

      <AlertDialog
        isOpen={isOpen}
        title="Excluir Carro"
        text={`Tem certeza que deseja remover o carro: ${carName}?`}
        doneText="Excluir"
        onCancel={closeAlert}
        onDone={handleDeleteCar}
        doneIsLoading={mutationDeleteCar.isLoading}
      />
    </HStack>
  );
}
