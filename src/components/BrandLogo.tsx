import React from 'react';
import { Language } from '../types';

interface BrandLogoProps {
  currentLang: Language;
  className?: string;
}

/**
 * Renders the official ТЕХНОПАРК БЗАЛ horizontal logo (/assets/aistudio/_________________________2__________8849418c.png)
 * and dynamically localizes the typography on the right half when switching to EN or ZH,
 * while preserving the exact 3D orange "Б" arrow emblem and proportions.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  currentLang,
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="82 396 916 286"
      className={className}
      role="img"
      aria-label={
        currentLang === 'ru'
          ? 'Технопарк БЗАЛ'
          : currentLang === 'en'
            ? 'Technopark BZAL'
            : 'BZAL 工业科技园'
      }
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="82" y="396" width="916" height="286" fill="#FFFFFF" />
      <image
        href="/assets/aistudio/_________________________2__________8849418c.png"
        x="0"
        y="0"
        width="1080"
        height="1080"
      />
      {currentLang === 'en' && (
        <g>
          <rect x="390" y="440" width="608" height="236" fill="#FFFFFF" />
          <text
            x="408"
            y="520"
            fill="#E95A0C"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize="72"
            textLength="574"
            lengthAdjust="spacingAndGlyphs"
          >
            TECHNOPARK
          </text>
          <text
            x="404"
            y="656"
            fill="#E95A0C"
            fontFamily="'Dela Gothic One', Montserrat, sans-serif"
            fontWeight="900"
            fontSize="162"
            textLength="578"
            lengthAdjust="spacingAndGlyphs"
          >
            BZAL
          </text>
        </g>
      )}
      {currentLang === 'zh' && (
        <g>
          <rect x="390" y="440" width="608" height="236" fill="#FFFFFF" />
          <text
            x="408"
            y="518"
            fill="#E95A0C"
            fontFamily="Montserrat, 'PingFang SC', 'Microsoft YaHei', sans-serif"
            fontWeight="900"
            fontSize="66"
            textLength="574"
            lengthAdjust="spacing"
          >
            巴拉诺维奇科技园
          </text>
          <text
            x="404"
            y="656"
            fill="#E95A0C"
            fontFamily="'Dela Gothic One', Montserrat, sans-serif"
            fontWeight="900"
            fontSize="162"
            textLength="578"
            lengthAdjust="spacingAndGlyphs"
          >
            BZAL
          </text>
        </g>
      )}
    </svg>
  );
};
