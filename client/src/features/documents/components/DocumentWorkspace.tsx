import { useEffect, useState } from 'react';
import DocumentViewer from './DocumentViewer';
import './DocumentWorkspace.css';

export default function DocumentWorkspace() {
  const [fileUrl, setFileUrl] = useState<string | null>('documents/sample.pdf');

  useEffect(() => {
    return () => {
      if (fileUrl && fileUrl.startsWith('blob:')) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFileUrl(url);
  };

  return (
    <div className="document-workspace-root">
      <h2>Document Workspace</h2>

      

      <DocumentViewer fileUrl={fileUrl} />
    </div>
  );
}