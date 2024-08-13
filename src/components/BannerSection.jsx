// src/components/BannerSection.jsx
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const BannerContainer = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
      <BannerImage src={banners[currentBannerIndex].gallery_image} alt={banners[currentBannerIndex].gallery_name} />
      <DotContainer>
        {banners.map((_, index) => (
          <Dot key={index} active={index === currentBannerIndex} />
        ))}
      </DotContainer>
    </BannerContainer>
  );
};

export default BannerSection;