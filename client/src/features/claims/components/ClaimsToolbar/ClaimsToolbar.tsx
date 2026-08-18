import { useState } from 'react';
import './ClaimsToolbar.css';

type SortOption = 'newest' | 'oldest' | 'name';
type ClaimsToolbarProps = {
  onSearch: (query: string) => void;
};

export default function ClaimsToolbar({ onSearch }: ClaimsToolbarProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  return (
    <div className="claims__tools">
      <label className="claims__search">
        <img src="/assets/search.svg" alt="" width={24} height={24} />
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </label>
    </div>
  );
}
