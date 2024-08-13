// src/components/SubcategoryScroll.jsx
import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  padding: 8px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubcategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  padding: 0 8px;
  cursor: pointer;
`;

const SubcategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 4px;
`;

const SubcategoryName = styled.span`
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.secondaryText};
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
        >
          <SubcategoryImage src={subcategory.sub_category_image} alt={subcategory.sub_category_name} />
          <SubcategoryName isSelected={index === selectedIndex}>
            {subcategory.sub_category_name}
          </SubcategoryName>
        </SubcategoryItem>
      ))}
    </ScrollContainer>
  );
};

export default SubcategoryScroll;