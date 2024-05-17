'use client';

import { DASHBOARD_NAVIGATION_LINKS, LINKS } from '@/utils/NavigationLinks';
import { Burger, Menu, Text } from '@mantine/core';
import { useDisclosure, useId } from '@mantine/hooks';
import Link from 'next/link';

export const DashboardNavigationMobile = () => {
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
          hiddenFrom="md"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          key={useId()}
          leftSection={LINKS.Dashboard.Dashboard.icon}
          component={Link}
          href={LINKS.Dashboard.Dashboard.href}
        >
          {LINKS.Dashboard.Dashboard.label}
        </Menu.Item>

        {DASHBOARD_NAVIGATION_LINKS.map((group, idx) => {
          const items = group.links.map((link, idx) => (
            <Menu.Item
              key={idx}
              leftSection={link.icon}
              component={Link}
              href={link.href}
            >
              {link.label}
            </Menu.Item>
          ));

          return (
            <>
              <Menu.Label key={idx}>
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
