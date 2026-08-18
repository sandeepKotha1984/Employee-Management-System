import './StatsCards.css';

const avatars = [
  '/assets/avatar-1.svg',
  '/assets/avatar-2.svg',
  '/assets/avatar-3.svg',
  '/assets/avatar-4.svg',
  '/assets/avatar-5.svg',
];

export function StatsCards() {
  return (
    <section className="stats" aria-label="Claims stats">
      <article className="stats__card">
        <div className="stats__icon-wrap">
          <img className="stats__icon-bg" src="/assets/stat-bg.svg" alt="" width={84} height={84} />
          <img
            className="stats__icon"
            src="/assets/profile-2user.svg"
            alt=""
            width={42}
            height={42}
          />
        </div>
        <div className="stats__content">
          <p className="stats__label">Total Claims</p>
          <p className="stats__value">5,423</p>
          <p className="stats__trend">
            <img src="/assets/arrow-up.svg" alt="" width={20} height={20} />
            <span>
              <strong className="stats__trend--up">16%</strong> this month
            </span>
          </p>
        </div>
      </article>

      <div className="stats__divider" aria-hidden="true" />

      <article className="stats__card">
        <div className="stats__icon-wrap">
          <img className="stats__icon-bg" src="/assets/stat-bg.svg" alt="" width={84} height={84} />
          <img
            className="stats__icon stats__icon--tick"
            src="/assets/profile-tick.svg"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="stats__content">
          <p className="stats__label">Members</p>
          <p className="stats__value">1,893</p>
          <p className="stats__trend">
            <img
              className="stats__arrow-down"
              src="/assets/arrow-down.svg"
              alt=""
              width={20}
              height={20}
            />
            <span>
              <strong className="stats__trend--down">1%</strong> this month
            </span>
          </p>
        </div>
      </article>

      <div className="stats__divider" aria-hidden="true" />

      <article className="stats__card">
        <div className="stats__icon-wrap">
          <img className="stats__icon-bg" src="/assets/stat-bg.svg" alt="" width={84} height={84} />
          <img className="stats__icon" src="/assets/monitor.svg" alt="" width={42} height={42} />
        </div>
        <div className="stats__content">
          <p className="stats__label">Active Now</p>
          <p className="stats__value">189</p>
          <div className="stats__avatars" aria-label="Active users">
            {avatars.map((src) => (
              <img key={src} className="stats__avatar" src={src} alt="" width={26} height={26} />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
