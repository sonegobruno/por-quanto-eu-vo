import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { StatusBar } from 'shared/components/StatusBar';
import { RFValue } from 'react-native-responsive-fontsize';
import { Input } from 'shared/components/Form/Inputs/Input';
import { Button } from 'shared/components/Form/Buttons/Button';
import { Center as Footer, Heading, Text, useToast } from 'native-base';
import { api } from 'services/api';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { toastConfig } from 'shared/components/Toast';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
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
  const navigation = useNavigation<any>();
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

        navigation.navigate('Home');
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
        <S.LogoContainer>
          <Logo width={RFValue(300)} height={RFValue(115)} />
        </S.LogoContainer>

        <S.Background />

        <S.Content>
          <Heading fontSize="2xl" color="neutral.700">
            Criar conta
          </Heading>

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
            keyboardType="visible-password"
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
            keyboardType="visible-password"
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

          <Footer flexDir="row" mt="4">
            <Text color="neutral.600" fontSize="md">
              Já tem uma conta?
            </Text>
            <Button
              onPress={() => navigation.navigate('Home')}
              type="link"
              title="Fazer login"
            />
          </Footer>
        </S.Content>
      </S.Container>
    </>
  );
}
