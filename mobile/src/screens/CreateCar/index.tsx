import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { api } from 'services/api';
import { queryClient } from 'services/query-client';
import { Button } from 'shared/components/Form/Buttons/Button';
import { Input } from 'shared/components/Form/Inputs/Input';
import { HeaderBackButton } from 'shared/components/Headers/HeaderBackButton';
import { Heading } from 'shared/components/Heading';
import { toastConfig } from 'shared/components/Toast';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import * as yup from 'yup';
import { Container, Content } from './styles';

type FormValues = {
  name: string;
  description: string;
  gas_consumption: number;
  alcohol_consumption: string;
};

const FormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  gas_consumption: yup.number().required('Gasolina obrigatória'),
  alcohol_consumption: yup.number().required('Álcool obrigatório'),
});

export function CreateCar() {
  const toast = useToast();
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });
  const navigation = useNavigation();

  const handleCreateCar = useCallback(
    async (data: FormValues) => {
      try {
        await api.post('/car', data);

        toast.show(
          toastConfig('Parabéns, seu carro foi criada com sucesso', 'success'),
        );

        queryClient.refetchQueries('my-cars');

        navigation.goBack();
      } catch (err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
      }
    },
    [navigation, toast],
  );

  return (
    <Container>
      <HeaderBackButton />
      <Content>
        <Heading
          title="Cadastrar carro"
          subTitle={`Cadastre seu carro em nosso sistema para realizar${'\n'}o cálculo do combustível`}
        />

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
          title="Criar carro"
          onPress={form.handleSubmit(handleCreateCar)}
          mt="12"
        />
      </Content>
    </Container>
  );
}
