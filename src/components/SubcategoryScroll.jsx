// src/components/SubcategoryScroll.jsx
import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled'; 
const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  padding: 12px 0; // Increased padding for more space
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const SubcategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px; // Slightly wider for better visibility
  margin: 0 4px; // Add some horizontal spacing
  padding: 8px;
  cursor: pointer;
  border-radius: 12px; // Increased border radius
  transition: all 0.3s ease;
  background-color: ${({ isSelected }) => isSelected ? '#CF5F39' : 'white'};
  box-shadow: ${({ isSelected }) => 
    isSelected 
      ? '0 8px 12px rgba(207, 95, 57, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)' 
      : '0 2px 4px rgba(0, 0, 0, 0.1)'
  };
  transform: ${({ isSelected }) => isSelected ? 'translateY(-4px)' : 'none'};
`;

const SubcategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
  border: 2px solid ${({ isSelected }) => isSelected ? 'white' : 'transparent'};
`;
const SubcategoryName = styled.span`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ isSelected }) => isSelected ? 'white' : '#333'};
  text-align: center;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
`;



const SubcategoryScroll = ({ subcategories, selectedIndex, onSubcategoryClick }) => {
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (scrollRef.current && itemRefs.current[selectedIndex]) {
      const scrollContainer = scrollRef.current;
      const selectedItem = itemRefs.current[selectedIndex];
      const containerWidth = scrollContainer.offsetWidth;
      const itemWidth = selectedItem.offsetWidth;
      const scrollLeft = selectedItem.offsetLeft - containerWidth / 2 + itemWidth / 2;

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  return (
    <ScrollContainer ref={scrollRef}>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem
          key={subcategory.subcat_id}
          onClick={() => onSubcategoryClick(index)}
          ref={el => itemRefs.current[index] = el}
          isSelected={index === selectedIndex}
        >
          <SubcategoryImage 
            src={subcategory.sub_category_image} 
            alt={subcategory.sub_category_name} 
            isSelected={index === selectedIndex}
          />
          <SubcategoryName isSelected={index === selectedIndex}>
            {subcategory.sub_category_name}
          </SubcategoryName>
        </SubcategoryItem>
      ))}
    </ScrollContainer>
  );
};

export default SubcategoryScroll;