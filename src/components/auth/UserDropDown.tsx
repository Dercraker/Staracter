import AvatarImage from '@/components/ui/Avatar';
import { displayName } from '@/utils/format/displayName';
import { LINKS } from '@/utils/NavigationLinks';
import {
  ActionIcon,
  Box,
  Group,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  rem,
  Text,
} from '@mantine/core';
import {
  IconChevronRight,
  IconHearts,
  IconSettings,
  IconShieldLock,
  IconUsers,
} from '@tabler/icons-react';
import type { User } from 'next-auth';
import Link from 'next/link';
import LogoutMenuItem from './LogoutMenuItem';

export type UserDropDownVariant = 'outline' | 'minimal';

type UserDropDownProps = {
  user: User;
  variant?: UserDropDownVariant;
};

const UserDropDown = ({ user, variant = 'minimal' }: UserDropDownProps) => {
  return (
    <Group>
      <Menu
        withArrow
        width={300}
        position="bottom-end"
        transitionProps={{ transition: 'pop' }}
        withinPortal
        trigger="click-hover"
      >
        <MenuTarget>
          {variant === 'minimal' ? (
            <ActionIcon variant="transparent" radius="xl" size="xl">
              <AvatarImage user={user} />
            </ActionIcon>
          ) : (
            <Group
              align="center"
              justify="center"
              style={{ cursor: 'pointer' }}
            >
              <Box>
                <Group>
                  <ActionIcon variant="transparent" radius="xl" size="xl">
                    <AvatarImage user={{ ...user, email: user.email || '' }} />
                  </ActionIcon>
                  <Text>
                    {displayName({ ...user, email: user.email || '' })}
                  </Text>
                </Group>
              </Box>
            </Group>
          )}
        </MenuTarget>
        <MenuDropdown>
          <MenuItem
            rightSection={
              <IconChevronRight
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Account.Profile.href}
          >
            <Group>
              <AvatarImage user={user} />
              <div>
                <Text fw={500}>{user.name}</Text>
                <Text size="xs" c="dimmed">
                  {user.email}
                </Text>
              </div>
            </Group>
          </MenuItem>

          <MenuDivider />

          <MenuLabel>Application</MenuLabel>
          <MenuItem
            leftSection={
              <IconShieldLock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Dashboard.Dashboard.href}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            leftSection={
              <IconUsers
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Dashboard.Characters.href}
          >
            My Characters
          </MenuItem>
          <MenuItem
            leftSection={
              <IconHearts
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color="var(--mantine-color-pink-5)"
              />
            }
            component={Link}
            href={LINKS.Dashboard.LikedCharacters.href}
          >
            {LINKS.Dashboard.LikedCharacters.label}
          </MenuItem>

          <MenuLabel>Settings</MenuLabel>
          <MenuItem
            leftSection={
              <IconSettings
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            component={Link}
            href={LINKS.Account.Settings.href}
          >
            Settings
          </MenuItem>
          <LogoutMenuItem />
        </MenuDropdown>
      </Menu>
    </Group>
  );
};

export default UserDropDown;
