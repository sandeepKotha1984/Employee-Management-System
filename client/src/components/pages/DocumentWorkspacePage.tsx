import { useNavigate } from 'react-router-dom';
import './DocumentWorkspacePage.css';

export default function DocumentWorkspacePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/main/claims')} aria-label="Back to Claims" className="back-btn">
        ← Back to Claims
      </button>

      <DocumentWorkspace />
    </div>
  );
}
import DocumentWorkspace from "../../features/documents/components/DocumentWorkspace";

