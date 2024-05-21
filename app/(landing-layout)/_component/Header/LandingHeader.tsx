'use client';
import AuthButtonClient from '@/components/auth/AuthButtonClient';
import { SiteName } from '@/components/layout/SiteName';
import type { NavigationLink } from '@/types/NavigationLink.schema';
import { HEADER_LINKS } from '@/utils/NavigationLinks';
import { Group, UnstyledButton } from '@mantine/core';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './Header.module.css';

const useBoundedScroll = (threshold: number) => {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    const onChange = (current: number) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    };

    const deleteEvent = scrollY.on('change', onChange);

    const listener = () => {
      const currentScroll = window.scrollY;
      onChange(currentScroll);
    };

    window.addEventListener('scroll', listener);

    return () => {
      deleteEvent();
      window.removeEventListener('scroll', listener);
    };
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
};

const LandingHeader = () => {
  const session = useSession();

  const { scrollYBoundedProgress } = useBoundedScroll(400);
  const scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  const links = HEADER_LINKS.map((link: NavigationLink) => {
    if (link.auth && session.status !== 'authenticated') {
      return null;
    }

    return (
      <UnstyledButton
        p="xs"
        key={link.label}
        className={styles.control}
        component={Link}
        href={link.href}
      >
        <Group gap="3px">
          {link.icon}
          {link.label}
        </Group>
      </UnstyledButton>
    );
  });

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressDelayed, [0, 1], [80, 50]),
      }}
      className="fixed inset-x-0 z-50 flex h-20 w-screen shadow backdrop-blur-md"
    >
      <Group
        h="100%"
        align="center"
        justify="space-between"
        px="1em"
        mx="auto"
        className="w-full max-w-4xl"
      >
        <motion.p
          style={{
            scale: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0.9]
            ),
          }}
        >
          <SiteName nameVisibleFrom="xs" />
        </motion.p>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
        >
          <Group>
            <Group gap="0">{links}</Group>
            <AuthButtonClient />
          </Group>
        </motion.nav>
      </Group>
    </motion.header>
    // <AppShell.Header>
    //   <Group h="100%" justify="space-between" px="md">
    //     <Group>
    //       <SiteName />
    //     </Group>
    //     <Group>
    //       <Group gap="0">{links}</Group>
    //       <AuthButtonClient />
    //     </Group>
    //   </Group>
    // </AppShell.Header>
  );
};

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

export default LandingHeader;
