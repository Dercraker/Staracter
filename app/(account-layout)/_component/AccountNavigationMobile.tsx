'use client';

import { ACCOUNT_NAVIGATION_MOBILE_LINKS } from '@/utils/NavigationLinks';
import { Burger, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

export const AccountNavigationMobile = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Menu
      shadow="md"
      width="16em"
      position="bottom-end"
      transitionProps={{ transition: 'pop' }}
      withinPortal
      trigger="click"
      onClose={toggle}
    >
      <Menu.Target>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
          hiddenFrom="sm"
        />
      </Menu.Target>

      <Menu.Dropdown>
        {ACCOUNT_NAVIGATION_MOBILE_LINKS.map((group) => {
          const items = group.links.map((link) => (
            <Menu.Item
              key={link.href}
              leftSection={link.icon}
              component={Link}
              href={link.href}
            >
              {link.label}
            </Menu.Item>
          ));

          return (
            <>
              <Menu.Label key={group.title}>
                <Text tt="uppercase" c="dimmed">
                  {group.title}
                </Text>
              </Menu.Label>
              {items}
            </>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
