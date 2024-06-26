import LinksGroup from '@/components/linksGroup/LinksGroup';
import { LogoSvg } from '@/components/svg/LogoSvg';
import { FOOTER_LINKS } from '@/utils/NavigationLinks';
import { SiteConfig } from '@/utils/site-config';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandGithub, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const groups = FOOTER_LINKS.map((group) => (
    <LinksGroup data={group.links} title={group.title} key={group.title} />
  ));

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.logo}>
          <Group>
            <LogoSvg size={30} />
            <Text size="xl">{SiteConfig.title}</Text>
          </Group>
          <Text size="xs" c="dimmed" className={styles.description}>
            {SiteConfig.description}
          </Text>
        </div>
        <div className={styles.groups}>{groups}</div>
      </Container>
      <Container className={styles.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 {SiteConfig.title} All rights reserved.
        </Text>

        <Group
          gap={0}
          className={styles.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component={Link}
            href={SiteConfig.github}
          >
            <IconBrandGithub stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconMail stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
