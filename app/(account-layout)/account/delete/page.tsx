'use client';

import { LINKS } from '@/utils/NavigationLinks';
import {
  Alert,
  Button,
  Group,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalRoot,
  ModalTitle,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { deleteAccountAction } from '../../../../src/features/account/delete/delete-account.action';

export default function DeleteProfilePage() {
  const [IsConfirmDeleteOpened, modalController] = useDisclosure(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => deleteAccountAction({}),
    onSuccess: async () => {
      await signOut({ callbackUrl: LINKS.Landing.Landing.href });
    },
  });

  return (
    <>
      <Alert variant="default" title="Delete your account" p="xl" my="lg">
        <Stack>
          <Text c="dimmed">
            Deleting your account means that all your personal data will be
            permanently erased and your ongoing subscription will be terminated.
            Please be aware that this action is irreversible.
          </Text>
          <Button variant="outline" color="red" onClick={modalController.open}>
            Delete
          </Button>
        </Stack>
      </Alert>

      <ModalRoot
        opened={IsConfirmDeleteOpened}
        onClose={modalController.close}
        centered
      >
        <ModalOverlay backgroundOpacity={0.55} blur={3} />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              <Title order={2}>Delete your account</Title>
            </ModalTitle>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Stack>
              <Text>Are you sure you want to delete your profile?</Text>
              <Group justify="end">
                <Button variant="outline" onClick={modalController.close}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  disabled={isPending}
                  loading={isPending}
                  onClick={() => mutateAsync()}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalRoot>
    </>
  );
}
