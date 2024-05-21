'use client';
import { useDisclosure } from '@mantine/hooks';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type PropsWithChildren } from 'react';

type AnimatedTooltipProps = {
  label: string;
};

export const AnimatedTooltip = ({
  label,
  children,
}: PropsWithChildren<AnimatedTooltipProps>) => {
  const [isHovered, { close, open }] = useDisclosure(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  return (
    <div className="relative group" onMouseEnter={open} onMouseLeave={close}>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 10,
            },
          }}
          exit={{ opacity: 0, y: 20, scale: 0.6 }}
          style={{
            translateX: translateX,
            rotate: rotate,
            whiteSpace: 'nowrap',
          }}
          className="absolute top-9 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md shadow-xl px-4 py-2 bg-sky-900/55"
        >
          <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
          <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
          <div className="font-bold text-white relative z-30 text-base">
            {label}
          </div>
        </motion.div>
      )}
      {children}
    </div>
  );
};
