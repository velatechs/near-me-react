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
  padding-top: 50px; // Account for fixed AppBar
`;

const StickyWrapper = styled.div`
  position: relative;
  height: ${props => props.height}px;
`;

const StickyHeader = styled.div`
  position: ${props => props.isSticky ? 'fixed' : 'relative'};
  top: ${props => props.isSticky ? '50px' : 'auto'}; // 50px for AppBar height
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  z-index: 999;
  transition: all 0.3s ease-in-out;
`;

const NearMePage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const linkSectionRefs = useRef([]);
  const bannerRef = useRef(null);
  const headerRef = useRef(null);

  const filteredLinkData = data.linkdata.filter(category =>
    category.links.some(link =>
      link.link_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    linkSectionRefs.current = linkSectionRefs.current.slice(0, filteredLinkData.length);
  }, [filteredLinkData]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      if (bannerRef.current && headerRef.current) {
        const bannerBottom = bannerRef.current.getBoundingClientRect().bottom;
        const headerTop = headerRef.current.getBoundingClientRect().top;
        setIsHeaderSticky(bannerBottom <= 50); // 50px is the height of the AppBar
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = useScrollHandler(linkSectionRefs);

  const handleSubcategoryClick = (index) => {
    linkSectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <AppBar />
      <ContentContainer>
        <div ref={bannerRef}>
          <BannerSection banners={data.banner} />
        </div>
        <StickyWrapper height={headerHeight}>
          <StickyHeader ref={headerRef} isSticky={isHeaderSticky}>
            <SearchBar onSearch={setSearchQuery} />
            <SubcategoryScroll
              subcategories={data.subcatdata}
              selectedIndex={activeIndex}
              onSubcategoryClick={handleSubcategoryClick}
            />
          </StickyHeader>
        </StickyWrapper>
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