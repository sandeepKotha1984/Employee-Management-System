import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Sidebar.css';

const menuItems = [
  { id: 'claims', label: 'Claims', icon: '/assets/3d-square.svg', chevron: true },
  { id: 'income', label: 'Income', icon: '/assets/wallet-money.svg', chevron: true },
  { id: 'promote', label: 'Promote', icon: '/assets/discount-shape.svg', chevron: true },
  { id: 'help', label: 'Help', icon: '/assets/message-question.svg', chevron: true },
] as const;

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export function Sidebar({ activeId = 'customers', onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__user-block" aria-label="User actions">
          <div className="sidebar__user-icon-wrap">
            <img className="sidebar__user-icon" src="/assets/profile-2user.svg" alt="User" width={22} height={22} />
          </div>
          <button type="button" className="sidebar__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <span className="sidebar__version">{user?.role ?? 'USER'}</span>
      </div>

      <nav className="sidebar__nav" aria-label="Main">
        {menuItems.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar__item${active ? ' sidebar__item--active' : ''}`}
              onClick={() => onNavigate?.(item.id)}
            >
              <span className="sidebar__item-main">
                <span className="sidebar__icon-wrap">
                  <img
                    className={`sidebar__icon${active ? ' sidebar__icon--active' : ''}`}
                    src={item.icon}
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
                <span className="sidebar__label">{item.label}</span>
              </span>
              {item.chevron && (
                <img
                  className="sidebar__chevron"
                  src={active ? '/assets/chevron-right-white.svg' : '/assets/chevron-right.svg'}
                  alt=""
                  width={16}
                  height={16}
                />
              )}
            </button>
          );
        })}
      </nav>

      
      
    </aside>
  );
}
