import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useImageLoader from '../hooks/useImageLoader';
import CustomCircularProgress from './CustomCircularProgress';

const BannerContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const StyledCustomCircularProgress = styled(CustomCircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.secondaryText};
  margin: 0 4px;
`;

const BannerSection = ({ banners }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const loading = useImageLoader(banners[currentBannerIndex].gallery_image);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        (prevIndex + 1) % banners.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <BannerContainer>
      <ImageWrapper>
        <BannerImage
          src={banners[currentBannerIndex].gallery_image}
          alt={banners[currentBannerIndex].gallery_name}
          loading={loading}
        />
        {loading && <StyledCustomCircularProgress />}
      </ImageWrapper>
      <DotContainer>
        {banners.map((_, index) => (
          <Dot key={index} active={index === currentBannerIndex} />
        ))}
      </DotContainer>
    </BannerContainer>
  );
};

export default BannerSection;