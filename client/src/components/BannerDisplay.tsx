import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, media } from '../styles/designTokens';
import { convertGoogleDriveUrl } from '../utils/googleDriveUrl';

const API_BASE = import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api';

const BannerContainer = styled.div`
  width: 100%;
  margin-bottom: ${spacing[12]};
`;

const BannerSlider = styled.div`
  position: relative;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: ${colors.neutral[100]};
  aspect-ratio: 16 / 5;
  max-width: 100%;
  min-height: 420px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);

  @media (max-width: 1024px) {
    aspect-ratio: 16 / 7;
    min-height: 260px;
  }
  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    min-height: 180px;
  }
  @media (max-width: 480px) {
    aspect-ratio: 1 / 1;
    min-height: 120px;
  }
`;

const BannerSlide = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: ${colors.neutral[200]};
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const BannerOverlay = styled.div<{ $hasContent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$hasContent ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing[8]};
  text-align: center;
`;

const BannerTitle = styled.h2`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: white;
  margin-bottom: ${spacing[2]};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: ${typography.fontSize["2xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${typography.fontSize.lg};
  }
`;

const BannerDescription = styled.p`
  font-size: ${typography.fontSize.lg};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: ${typography.fontSize.base};
  }

  @media (max-width: 480px) {
    font-size: ${typography.fontSize.sm};
  }
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: ${spacing[6]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${spacing[2]};
  z-index: 10;

  ${media.mobile} {
    gap: ${spacing[1]};
    bottom: ${spacing[4]};
    /* ensure limited width on mobile */
    padding: 0 ${spacing[2]};
    max-width: 240px;
    overflow: hidden;
  }
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: white;
    transform: scale(1.2);
  }

  ${media.mobile} {
    width: 12px;
    height: 12px;
  }
`;

const NavigationButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$direction === 'left' ? 'left' : 'right'}: ${spacing[4]};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: ${typography.fontSize.xl};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${typography.fontSize.lg};
  }
`;

interface Banner {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  category?: string;
  type: string;
}

interface BannerDisplayProps {
  type?: string;
  limit?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
}

export const BannerDisplay = ({
  type = 'promotional',
  limit = 5,
  autoRotate = true,
  rotationInterval = 5000
}: BannerDisplayProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const url = type && type !== 'all'
          ? `${API_BASE}/banners?type=${type}&limit=${limit}`
          : `${API_BASE}/banners?limit=${limit}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch banners');

        const data = await response.json();
        setBanners(data.banners || []);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [type, limit]);

  useEffect(() => {
    if (!autoRotate || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, banners.length, rotationInterval]);

  // Track small screens to show fewer dots
  useEffect(() => {
    const check = () => setIsSmallScreen(typeof window !== 'undefined' && window.innerWidth <= 480);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (loading || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  const hasContent = !!(currentBanner.title && currentBanner.description);

  const handleClick = () => {
    if (currentBanner.link) {
      window.location.href = currentBanner.link;
    } else if (currentBanner.category) {
      navigate(`/catalog?category=${encodeURIComponent(currentBanner.category.toLowerCase())}`);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  return (
    <BannerContainer>
      <BannerSlider onClick={handleClick}>
        {banners.map((banner, index) => (
          <BannerSlide
            key={banner._id}
            $isActive={index === currentIndex}
            style={{ backgroundImage: `url('${convertGoogleDriveUrl(banner.imageUrl)}')` }}
          >
            <BannerOverlay $hasContent={hasContent}>
              {hasContent && (
                <>
                  <BannerTitle>{banner.title}</BannerTitle>
                  <BannerDescription>{banner.description}</BannerDescription>
                </>
              )}
            </BannerOverlay>
          </BannerSlide>
        ))}

        {banners.length > 1 && (
          <>
            <NavigationButton $direction="left" onClick={handlePrevious} title="Previous banner">
              ←
            </NavigationButton>
            <NavigationButton $direction="right" onClick={handleNext} title="Next banner">
              →
            </NavigationButton>
            <NavigationDots>
              {(() => {
                // On small screens show a limited window of dots (max 5)
                if (!isSmallScreen) {
                  return banners.map((_, index) => (
                    <Dot
                      key={index}
                      $isActive={index === currentIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      title={`Banner ${index + 1}`}
                    />
                  ));
                }

                const maxDots = 5;
                if (banners.length <= maxDots) {
                  return banners.map((_, index) => (
                    <Dot
                      key={index}
                      $isActive={index === currentIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      title={`Banner ${index + 1}`}
                    />
                  ));
                }

                // Center window around currentIndex
                let start = currentIndex - Math.floor(maxDots / 2);
                if (start < 0) start = 0;
                if (start + maxDots > banners.length) start = banners.length - maxDots;

                return banners.slice(start, start + maxDots).map((_, idx) => {
                  const index = start + idx;
                  return (
                    <Dot
                      key={index}
                      $isActive={index === currentIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      title={`Banner ${index + 1}`}
                    />
                  );
                });
              })()}
            </NavigationDots>
          </>
        )}
      </BannerSlider>
    </BannerContainer>
  );
};
