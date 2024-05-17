'use client';

import type {
  SignUpCredentialSchemaType} from '@/features/auth/signUp/SignUpCredential.schema';
import {
  SignUpCredentialSchema
} from '@/features/auth/signUp/SignUpCredential.schema';
import { signUpAction } from '@/features/auth/signUp/signup.action';
import useNotify from '@/hook/useNotify';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export const SignUpCredentialsForm = () => {
  const { ErrorNotify } = useNotify();

  const registerForm = useForm<SignUpCredentialSchemaType>({
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      verifyPassword: '',
    },
    validate: zodResolver(SignUpCredentialSchema),
  });

  const submitMutation = useMutation({
    mutationFn: async (values: SignUpCredentialSchemaType) => {
      const { serverError } = await signUpAction(values);
      if (serverError) {
        return ErrorNotify({
          title: 'Sign Up Error',
          message: serverError,
        });
      }
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}/`,
      });
    },
  });

  const handleSubmitForm = async () => {
    await submitMutation.mutateAsync(
      SignUpCredentialSchema.parse(registerForm.values)
    );
  };

  return (
    <Stack w="80%">
      <form>
        <Stack>
          <TextInput
            {...registerForm.getInputProps('name')}
            label="Name"
            placeholder="John Doe"
            withAsterisk
          />
          <TextInput
            {...registerForm.getInputProps('email')}
            label="Email"
            placeholder="john@doe.com"
            withAsterisk
          />
          <PasswordInput
            {...registerForm.getInputProps('password')}
            label="Password"
            withAsterisk
          />
          <PasswordInput
            {...registerForm.getInputProps('verifyPassword')}
            label="Verify Password"
            withAsterisk
          />
          <Button
            fullWidth
            disabled={!registerForm.isValid() || submitMutation.isPending}
            onClick={handleSubmitForm}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
