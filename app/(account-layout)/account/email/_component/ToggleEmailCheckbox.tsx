'use client';

import { toggleSubscribedAction } from '@/features/account/email/mail-account.action';
import useNotify from '@/hook/useNotify';
import { Checkbox, Group } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

type ToggleEmailCheckboxProps = {
  unsubscribed: boolean;
};

export const ToggleEmailCheckbox = ({
  unsubscribed,
}: ToggleEmailCheckboxProps) => {
  const { SuccessNotify, ErrorNotify } = useNotify();

  const mutation = useMutation({
    mutationFn: async (unsubscribed: boolean) => {
      const { data, serverError } = await toggleSubscribedAction({
        unsubscribed,
      });

      if (!data) {
        return ErrorNotify({
          message: serverError,
        });
      }

      SuccessNotify({
        message: "You've updated your email settings.",
      });
    },
  });

  return (
    <Group my="lg">
      <Checkbox
        defaultChecked={unsubscribed}
        disabled={mutation.isPending}
        label="Unsubscribed"
        onChange={(event) => {
          const newChecked = Boolean(event.currentTarget.checked);

          mutation.mutate(newChecked);
        }}
        description="If enabled, you will not receive any marketing or promotional emails from us."
      />
    </Group>
  );
};
