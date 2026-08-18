import { useState } from 'react';
import ClaimsGrid from './components/ClaimsGrid/ClaimsGrid';
import ClaimsToolbar from './components/ClaimsToolbar/ClaimsToolbar';
import { StatsCards } from './components/StatsCards/StatsCards';

export default function ClaimsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="claims-page">
      <StatsCards />

      <section className="claims">
        <header className="claims__header">
          <div>
            <h2 className="claims__title">Claims</h2>
            <p className="claims__subtitle">Claims management</p>
          </div>

          <div className="claims__tools">
            <ClaimsToolbar onSearch={setSearch} />
          </div>
        </header>

        <ClaimsGrid search={search} />
      </section>
    </div>
  );
}
