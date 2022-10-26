import React, { useCallback } from 'react';
import { Input } from 'shared/components/Form/Inputs/Input';
import { toastConfig } from 'shared/components/Toast';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from 'services/api';
import { queryClient } from 'services/query-client';
import { Button } from 'shared/components/Form/Buttons/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';
import { Car } from 'entities/car/car';
import { CarFormValues, uniqueCarFormMapper } from 'mappers/carMapper';
import { TypePage } from '..';

const FormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  gas_consumption: yup.string().required('Gasolina obrigatória'),
  alcohol_consumption: yup.string().required('Álcool obrigatório'),
});

interface Props {
  car: Car | null;
  type: TypePage;
}

export function CreateAndEditCarForm({ car, type }: Props) {
  const toast = useToast();
  const form = useForm<CarFormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: uniqueCarFormMapper(car),
  });
  const navigation = useNavigation();

  const mutationCreateCar = useMutation(
    async (data: CarFormValues) => {
      return api.post('/car', data);
    },
    {
      onSuccess() {
        toast.show(
          toastConfig('Parabéns, seu carro foi criada com sucesso', 'success'),
        );

        queryClient.refetchQueries('my-cars');

        navigation.goBack();
      },
      onError(err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
      },
    },
  );

  const mutationUpdateCar = useMutation(
    async (data: CarFormValues) => {
      return api.put('/car', {
        id: car?.id,
        image_url: '',
        image_description: '',
        ...data,
      });
    },
    {
      onSuccess() {
        toast.show(
          toastConfig(
            'Parabéns, seu carro foi atualizado com sucesso',
            'success',
          ),
        );

        queryClient.refetchQueries('my-cars');

        navigation.goBack();
      },
      onError(err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
      },
    },
  );

  const handleCreateCar = useCallback(
    async (data: CarFormValues) => {
      switch (type) {
        case 'create':
          mutationCreateCar.mutate(data);
          break;

        case 'edit':
          mutationUpdateCar.mutate(data);
          break;

        default:
          throw new Error('Invalid Type');
      }
    },
    [mutationCreateCar, mutationUpdateCar, type],
  );

  return (
    <>
      <Input
        label="Qual marca/modelo do carro?"
        placeholder="Ex: Celta Life"
        controller={{
          name: 'name',
          control: form.control,
        }}
        returnKeyType="next"
        containerProps={{ mt: '4' }}
        onSubmitEditing={() => form.setFocus('description')}
      />

      <Input
        label="Dê uma descrição para o seu carro"
        placeholder="Digite a descrição"
        controller={{
          name: 'description',
          control: form.control,
        }}
        returnKeyType="next"
        onSubmitEditing={() => form.setFocus('gas_consumption')}
      />

      <Input
        label="Qual a quantidade de gasolina gasta por Km?"
        placeholder="Digite a quantidade de gasolina utilizada por seu veiculo"
        controller={{
          name: 'gas_consumption',
          control: form.control,
        }}
        returnKeyType="next"
        keyboardType="phone-pad"
        onSubmitEditing={() => form.setFocus('alcohol_consumption')}
      />

      <Input
        label="Qual a quantidade de álcool gasta por Km?"
        placeholder="Digite a quantidade de álcool utilizada por seu veiculo"
        controller={{
          name: 'alcohol_consumption',
          control: form.control,
        }}
        returnKeyType="next"
        keyboardType="phone-pad"
        onSubmitEditing={() => form.setFocus('gas_consumption')}
      />

      <Button
        title={type === 'create' ? 'Criar carro' : 'Atualizar carro'}
        onPress={form.handleSubmit(handleCreateCar)}
        mt="12"
        isLoading={mutationCreateCar.isLoading || mutationUpdateCar.isLoading}
      />
    </>
  );
}
