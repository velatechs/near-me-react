// src/components/NearMePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import AppBar from './AppBar';
import BannerSection from './BannerSection';
import SearchBar from './SearchBar';
import SubcategoryScroll from './SubcategoryScroll';
import LinkSection from './LinkSection';
import useScrollHandler from '../hooks/useScrollHandler';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 50px; // Adjusted to account for AppBar height
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// ... (rest of the imports and styled components remain the same)

const NearMePage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const linkSectionRefs = useRef([]);

  const filteredLinkData = data.linkdata.filter(category =>
    category.links.some(link =>
      link.link_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    linkSectionRefs.current = linkSectionRefs.current.slice(0, filteredLinkData.length);
  }, [filteredLinkData]);

  const activeIndex = useScrollHandler(linkSectionRefs);

  const handleSubcategoryClick = (index) => {
    linkSectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <AppBar />
      <BannerSection banners={data.banner} />
      <ContentContainer>
        <StickyHeader>
          <SearchBar onSearch={setSearchQuery} />
          <SubcategoryScroll
            subcategories={data.subcatdata}
            selectedIndex={activeIndex}
            onSubcategoryClick={handleSubcategoryClick}
          />
        </StickyHeader>
        {filteredLinkData.map((category, index) => (
          <LinkSection
            key={category.subcat_id}
            category={category}
            ref={el => linkSectionRefs.current[index] = el}
            isSelected={index === activeIndex}
          />
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default NearMePage;