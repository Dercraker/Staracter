'use client';

import { addEmailAction } from '@/features/email/email.action';
import type { EmailActionSchemaType } from '@/features/email/email.schema';
import { EmailActionSchema } from '@/features/email/email.schema';
import useNotify from '@/hook/useNotify';
import { Alert, Button, Group, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconCircleCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

export type EmailFormProps = {
  successMessage?: string;
};

export const EmailForm = ({
  successMessage = 'You have subscribed to our newsletter.',
}: EmailFormProps) => {
  const { ErrorNotify } = useNotify();

  const emailForm = useForm<EmailActionSchemaType>({
    validateInputOnChange: true,
    initialValues: {
      email: '',
    },
    validate: zodResolver(EmailActionSchema),
  });

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async ({ email }: EmailActionSchemaType) => {
      const { serverError, data } = await addEmailAction({ email });

      if (data) {
        return data;
      } else {
        throw new Error(serverError);
      }
    },
    onError: () => {
      ErrorNotify({
        title: 'An error occurred while subscribing to our newsletter.',
        message: 'Try another email address or contact us',
      });
    },
  });

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: 'auto',
            opacity: 1,
          }}
        >
          <Alert
            variant="outline"
            color="var(--mantine-color-teal-6)"
            c="var(--mantine-color-teal-6)"
          >
            <Group>
              <IconCircleCheck color="var(--mantine-color-teal-6)" />
              <Text>{successMessage}</Text>
            </Group>
          </Alert>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          animate={{
            height: 'auto',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
        >
          <Group justify="center" align="start" w="100%">
            <TextInput
              type="email"
              withAsterisk
              placeholder="Ton Email"
              {...emailForm.getInputProps('email')}
              w={300}
            />
            <Button
              onClick={() => mutateAsync({ email: emailForm.values.email })}
              loading={isPending}
              disabled={isPending || !emailForm.isValid()}
            >
              Join
            </Button>
          </Group>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
