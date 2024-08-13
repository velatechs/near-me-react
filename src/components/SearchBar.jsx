// src/components/SearchBar.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Search, X } from 'lucide-react';

const SearchContainer = styled.div`
  padding: 8px 16px 4px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 40px;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 16px;
  outline: none;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position}: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <IconWrapper position="left">
          <Search size={20} />
        </IconWrapper>
        {searchTerm && (
          <IconWrapper position="right" onClick={clearSearch}>
            <X size={20} />
          </IconWrapper>
        )}
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;