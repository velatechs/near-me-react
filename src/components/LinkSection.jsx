// src/components/LinkSection.jsx
import React from 'react';
import styled from '@emotion/styled';

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

const LinkItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const LinkImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
`;

const LinkName = styled.span`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  word-break: break-word;
`;

const LinkSection = React.forwardRef(({ category, isSelected }, ref) => {
  return (
    <SectionContainer ref={ref} isSelected={isSelected}>
      <SectionTitle>{category.sub_category_name}</SectionTitle>
      <LinksGrid>
        {category.links.map((link) => (
          <LinkItem key={link.link_id} href={link.link_URL} target="_blank" rel="noopener noreferrer">
            <LinkImage src={link.link_image} alt={link.link_name} />
            <LinkName>{link.link_name}</LinkName>
          </LinkItem>
        ))}
      </LinksGrid>
    </SectionContainer>
  );
});

export default LinkSection;