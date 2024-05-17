'use client';

import useNotify from '@/hook/useNotify';
import { SiteConfig } from '@/utils/site-config';
import type { ButtonProps } from '@mantine/core';
import {
  Box,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconHelp, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { contactSupportAction } from '../../../features/contact/support/contact-support.action';
import type { ContactSupportSchemaType } from '../../../features/contact/support/contact-support.schema';
import { ContactSupportSchema } from '../../../features/contact/support/contact-support.schema';

export const ContactSupportDialog = (buttonProps: ButtonProps) => {
  const { SuccessNotify, ErrorNotify } = useNotify();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const session = useSession();
  const email = session.data?.user.email ?? null;
  const form = useForm<ContactSupportSchemaType>({
    validateInputOnChange: true,
    initialValues: {
      email: email ?? '',
      subject: '',
      message: '',
    },
    validate: zodResolver(ContactSupportSchema),
  });

  const mutation = useMutation({
    mutationFn: (input: ContactSupportSchemaType) =>
      contactSupportAction(input),
    onError: () =>
      ErrorNotify({
        title: 'Error',
        message: 'Failed to send message',
      }),
    onSuccess: () => {
      SuccessNotify({
        title: 'Success',
        message: 'Message sent successfully',
      });
      form.reset();
      closeModal();
    },
  });

  const handleOpenModal = () => {
    if (email) form.setFieldValue('email', email);

    openModal();
  };

  return (
    <>
      <Stack my="xl">
        <Button
          leftSection={<IconHelp />}
          onClick={handleOpenModal}
          {...buttonProps}
        >
          Contact Support
        </Button>
      </Stack>
      <Modal.Root
        opened={isModalOpen}
        onClose={closeModal}
        centered
        size="auto"
      >
        <Modal.Overlay backgroundOpacity={0.55} blur={3} />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <Title order={3}>Contact support</Title>
              <Text c="dimmed" fs="italic">
                Fill the form bellow or send an email to{' '}
                <Link
                  className="text-primary"
                  href={`mailto:${SiteConfig.email.contact}`}
                >
                  {SiteConfig.email.contact}
                </Link>
              </Text>
            </Modal.Title>
            <Modal.CloseButton icon={<IconX />} />
          </Modal.Header>
          <Modal.Body>
            <form onReset={() => form.reset()}>
              <Stack>
                <Box>
                  {!email && (
                    <TextInput
                      withAsterisk
                      label="Email"
                      {...form.getInputProps('email')}
                    />
                  )}
                  <TextInput
                    withAsterisk
                    label="Subject"
                    {...form.getInputProps('subject')}
                  />
                  <Textarea
                    withAsterisk
                    resize="vertical"
                    label="Message"
                    autosize
                    {...form.getInputProps('message')}
                  />
                </Box>
                <Button
                  onClick={() => mutation.mutateAsync(form.values)}
                  disabled={!form.isValid() || mutation.isPending}
                >
                  Send
                </Button>
              </Stack>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
