import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from 'shared/components/Form/Inputs/Input';
import { StatusBar } from 'shared/components/StatusBar';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import * as S from './styles';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatória'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatório'),
  confirmPassword: yup.string().required('Confirmar senha obrigatório'),
});

export function CreateUser() {
  const ref = useRef();
  const form = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });

  const handleSumValues = useCallback((data: FormValues) => {
    console.log(data);
  }, []);

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="#F8F9F9" />
      <S.Container>
        <S.LogoContainer>
          <Logo width={RFValue(300)} height={RFValue(115)} />
        </S.LogoContainer>

        <S.Background />

        <S.Content>
          <S.Title>Criar conta</S.Title>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            controller={{
              name: 'name',
              control: form.control,
            }}
            keyboardType="name-phone-pad"
            returnKeyType="next"
          />

          <Input
            ref={ref}
            label="Email"
            placeholder="Digite seu email"
            controller={{
              name: 'email',
              control: form.control,
            }}
            keyboardType="email-address"
            returnKeyType="next"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            controller={{
              name: 'password',
              control: form.control,
            }}
            type="password"
            keyboardType="visible-password"
            returnKeyType="next"
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
            onSubmitEditing={form.handleSubmit(handleSumValues)}
          />

          <S.CreateButton
            title="Cadastrar"
            onPress={form.handleSubmit(handleSumValues)}
          />

          <S.Footer>
            <S.AlreadyAccountQuestion>
              Já tem uma conta?
            </S.AlreadyAccountQuestion>
            <S.RedirectLoginButton>
              <S.RedirectLoginText>Fazer login</S.RedirectLoginText>
            </S.RedirectLoginButton>
          </S.Footer>
        </S.Content>
      </S.Container>
    </>
  );
}
