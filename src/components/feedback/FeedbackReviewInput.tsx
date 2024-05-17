import { Rating, Tooltip, rem } from '@mantine/core';
import {
  IconMoodAngry,
  IconMoodConfuzed,
  IconMoodEmpty,
  IconMoodHeart,
} from '@tabler/icons-react';

type FeedbackReviewInputProps = {
  value: number;
  onChange(value: number): void;
};

export const FeedbackReviewInput = ({
  onChange,
  value,
}: FeedbackReviewInputProps) => {
  const getIconStyle = (color?: string) => ({
    width: rem(24),
    height: rem(24),
    color: color ? `var(--mantine-color-${color}-7)` : undefined,
  });

  const getEmptyIcon = (value: number) => {
    const iconStyle = getIconStyle();

    switch (value) {
      case 1:
        return <IconMoodAngry style={iconStyle} />;
      case 2:
        return <IconMoodConfuzed style={iconStyle} />;
      case 3:
        return <IconMoodEmpty style={iconStyle} />;
      case 4:
        return <IconMoodHeart style={iconStyle} />;
      default:
        return null;
    }
  };

  const getFullIcon = (value: number) => {
    switch (value) {
      case 1:
        return (
          <Tooltip label="Extremely Dissatisfied">
            <IconMoodAngry style={getIconStyle('red')} />
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip label="Somewhat Dissatisfied">
            <IconMoodConfuzed style={getIconStyle('orange')} />
          </Tooltip>
        );
      case 3:
        return (
          <Tooltip label="Neutral">
            <IconMoodEmpty style={getIconStyle('yellow')} />
          </Tooltip>
        );
      case 4:
        return (
          <Tooltip label="Satisfied">
            <IconMoodHeart style={getIconStyle('green')} />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <Rating
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
      highlightSelectedOnly
      count={4}
      value={value}
      onChange={onChange}
    />
  );
};
