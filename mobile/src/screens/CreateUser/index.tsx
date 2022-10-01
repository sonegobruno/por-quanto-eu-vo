import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { StatusBar } from 'shared/components/StatusBar';
import { Input } from 'shared/components/Form/Inputs/Input';
import { Button } from 'shared/components/Form/Buttons/Button';
import { useToast } from 'native-base';
import { api } from 'services/api';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { toastConfig } from 'shared/components/Toast';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from 'shared/components/Headers/HeaderBackButton';
import { Heading } from 'shared/components/Heading';
import * as S from './styles';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup
    .string()
    .min(8, 'A senha deve conter no minimo 8 caracteres')
    .max(22, 'A senha deve conter no maximo 22 caracteres')
    .required('Senha obrigatório'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Campos "Senha" e "Confirmar Senha" não são iguais',
    ),
});

export function CreateUser() {
  const toast = useToast();
  const navigation = useNavigation();
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      setIsLoading(true);

      try {
        await api.post('/user', data);

        toast.show(
          toastConfig('Parabéns, sua conta foi criada com sucesso', 'success'),
        );

        navigation.navigate('Login');
      } catch (err) {
        const error = apiResponseErrors(err);
        toast.show(toastConfig(error.message, 'error'));
      } finally {
        setIsLoading(false);
      }
    },
    [navigation, toast],
  );

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="#F8F9F9" />
      <S.Container>
        <HeaderBackButton />
        <S.Content>
          <Heading
            title="Criar conta"
            subTitle="Crie sua conta para começar a utilizar o App"
          />
          <Input
            label="Nome"
            controller={{
              name: 'name',
              control: form.control,
            }}
            placeholder="Digite seu nome"
            keyboardType="name-phone-pad"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('email')}
            containerProps={{ mt: '4' }}
          />

          <Input
            label="Email"
            controller={{
              name: 'email',
              control: form.control,
            }}
            placeholder="Digite seu email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('password')}
          />

          <Input
            label="Senha"
            controller={{
              name: 'password',
              control: form.control,
            }}
            placeholder="Digite sua senha"
            type="password"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('confirmPassword')}
          />

          <Input
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            controller={{
              name: 'confirmPassword',
              control: form.control,
            }}
            type="password"
            returnKeyType="send"
            onSubmitEditing={form.handleSubmit(handleSubmit)}
          />

          <Button
            isLoading={isLoading}
            type="primary"
            title="Cadastrar"
            onPress={form.handleSubmit(handleSubmit)}
            mt="8"
          />
        </S.Content>
      </S.Container>
    </>
  );
}
