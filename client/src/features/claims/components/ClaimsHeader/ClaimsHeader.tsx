import './ClaimsHeader.css';

export default function ClaimsHeader() {
  return (
    <header className="customers-header">
      <div>
        <p className="eyebrow">Claims management</p>
        <h1>Claims</h1>
      </div>
      <button className="primary-button">+ Add claim</button>
    </header>
  );
}
