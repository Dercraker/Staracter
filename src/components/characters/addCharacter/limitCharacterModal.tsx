'use client';

import { ContactSupportDialog } from '@/components/contact/support/ContactSupportDialog';
import {
  Box,
  Button,
  ButtonGroup,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import type { User } from '@prisma/client';
import { IconX } from '@tabler/icons-react';

export type LimitCharacterModalProps = {
  isOpen: boolean;
  user: User;
  close: () => void;
};

export const LimitCharacterModal = ({
  isOpen,
  close,
}: LimitCharacterModalProps) => {
  const handleCloseModal = () => {
    close();
  };

  return (
    <Modal.Root opened={isOpen} onClose={handleCloseModal} centered>
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Title>Character limit reached</Title>
          </Modal.Title>
          <Modal.CloseButton icon={<IconX />} />
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Box>
              <Text>You've reached the limit, character.</Text>
              <Text>Please delete a character before adding a new one.</Text>
              <Text>If necessary, you can contact support</Text>
            </Box>

            <Group justify="center">
              <ButtonGroup>
                <Button variant="outline" onClick={handleCloseModal}>
                  Go back
                </Button>
                <ContactSupportDialog variant="outline" />
              </ButtonGroup>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
