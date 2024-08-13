// src/components/NearMePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import BannerSection from './BannerSection';
import SearchBar from './SearchBar';
import SubcategoryScroll from './SubcategoryScroll';
import LinkSection from './LinkSection';
import useScrollHandler from '../hooks/useScrollHandler';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-bottom: 100px;
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log('Error caught by ErrorBoundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }

const PageTitle = styled.h1`
  ${({ theme }) => theme.typography.headlineSmall};
  color: ${({ theme }) => theme.colors.primaryText};
  padding: 16px;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NearMePage = ({ data }) => {
    console.log('NearMePage render, data:', data);
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
    <ErrorBoundary> 
    <PageContainer>
      <BannerSection banners={data.banner} />
      <ContentContainer>
        <PageTitle>Near Me</PageTitle>
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
    </ErrorBoundary>
  );
};

export default NearMePage;