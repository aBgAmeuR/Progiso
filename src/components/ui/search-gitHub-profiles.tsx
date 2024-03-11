'use client'

import { SearchSelect, SearchSelectItem, SearchSelectProps } from '@tremor/react';
import { useState } from 'react';

type Props = {
  access_token?: string | null;
};

const SearchGitHubProfiles = ({ access_token }: Props) => {
  const [searchResults, setSearchResults] = useState<SearchSelectProps[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  const searchProfiles = async (searchTerm: string) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await response.json();
    setSearchResults(
      data.items?.map((item: { id: number; login: string }) => ({
        id: item.id,
        value: item.login,
      }))
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!access_token) return;
    const { value } = event.target;
    if (!value || value.length < 2) return;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = window.setTimeout(() => {
      searchProfiles(value);
    }, 1000);

    setTypingTimeout(timeoutId);
  }

  return (
    <SearchSelect
      placeholder="Ajouter un membre"
      onSelect={handleChange}
    >
      {Array.isArray(searchResults) ? searchResults.map((result) => (
        <SearchSelectItem key={result.id} value={result.id || ''}>
          {result.value}
        </SearchSelectItem>
      )) : null}
    </SearchSelect>
  );
};

export default SearchGitHubProfiles;
