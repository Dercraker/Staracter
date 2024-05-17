import type { ComponentPropsWithoutRef } from 'react';

export type LogoSvgProps = ComponentPropsWithoutRef<'svg'> & { size?: number };

export const FullLogoSvg = ({ size = 24, ...props }: LogoSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g clipPath="url(#clip0_2003_2)">
        <rect
          width="100"
          height="100"
          rx="30"
          fill="url(#paint0_linear_2003_2)"
        />
        <g filter="url(#filter0_d_2003_2)">
          <rect
            x="14.7887"
            y="14.7887"
            width="70.4225"
            height="70.4225"
            fill="url(#pattern0_2003_2)"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="27.5"
        stroke="url(#paint1_linear_2003_2)"
        strokeWidth="5"
        style={{ mixBlendMode: 'difference' }}
      />
      <defs>
        <filter
          id="filter0_d_2003_2"
          x="-35.2113"
          y="-35.2113"
          width="170.422"
          height="170.423"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.133333 0 0 0 0 0.301961 0 0 0 0 0.576471 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2003_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2003_2"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_2003_2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2003_2" transform="scale(0.0025)" />
        </pattern>
        <linearGradient
          id="paint0_linear_2003_2"
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0C0D0E" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2003_2"
          x1="100"
          y1="100"
          x2="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#064A7C" />
          <stop offset="1" stopColor="#89CDFF" />
        </linearGradient>
        <clipPath id="clip0_2003_2">
          <rect width="100" height="100" rx="30" fill="white" />
        </clipPath>
        <image
          id="image0_2003_2"
          width="400"
          height="400"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
