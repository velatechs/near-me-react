// src/components/LinkSection.jsx
import React from 'react';
import styled from '@emotion/styled';
import useImageLoader from '../hooks/useImageLoader';
import CustomCircularProgress from './CustomCircularProgress';

const SectionContainer = styled.div`
  margin: 16px;
  padding: 16px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? `${theme.colors.primary}10` : theme.colors.secondaryBackground};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 16px;
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 16px;
  justify-content: center;
`;

 

 

const LinkName = styled.span`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  word-break: break-word;
`;
const LinkItemWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  margin-bottom: 8px;
`;

const LinkImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
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

 
const LinkItem = ({ link }) => {
    const loading = useImageLoader(link?.link_image);
  
    if (!link) return null; // Return null if link is undefined
  
    return (
      <LinkItemWrapper href={link.link_URL} target="_blank" rel="noopener noreferrer">
        <ImageWrapper>
          <LinkImage src={link.link_image} alt={link.link_name} loading={loading} />
          {loading && <StyledCustomCircularProgress />}
        </ImageWrapper>
        <LinkName>{link.link_name}</LinkName>
      </LinkItemWrapper>
    );
  };
  
  const LinkSection = React.forwardRef(({ category, isSelected }, ref) => {
    return (
      <SectionContainer ref={ref} isSelected={isSelected}>
        <SectionTitle>{category.sub_category_name}</SectionTitle>
        <LinksGrid>
          {category.links.map((link) => (
            <LinkItem key={link.link_id} link={link} />
          ))}
        </LinksGrid>
      </SectionContainer>
    );
  });
  
  export default LinkSection;