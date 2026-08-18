import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type DocumentViewerProps = {
  file?: string | null;
};

export default function DocumentViewer({ file }: DocumentViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [fitToWidth, setFitToWidth] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [docKey, setDocKey] = useState(0); // used to force reload
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  useEffect(() => {
    // reset page when file changes
    setPageNumber(1);
    setNumPages(0);
    setError(null);
    setLoadingProgress(null);
    setDocKey((k) => k + 1);
  }, [file]);

  // allow local file selection; fall back to a default PDF in `public/documents`
  const defaultDocPath = "/documents/sample.pdf";
  const effectiveFile = file || localFileUrl || defaultDocPath;

  useEffect(() => {
    return () => {
      if (localFileUrl) {
        try {
          URL.revokeObjectURL(localFileUrl);
        } catch {}
      }
    };
  }, [localFileUrl]);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setLocalFileUrl(url);
      setLocalFileName(f.name);
      setDocKey((k) => k + 1);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
    setLoadingProgress(null);
  };

  const handleDocumentLoadError = (err: any) => {
    console.error("PDF load error:", err);
    setError(err?.message || String(err));
    setLoadingProgress(null);
  };

  const handleProgress = (progressEvent: { loaded: number; total?: number }) => {
    if (progressEvent && typeof progressEvent.loaded === "number") {
      const total = progressEvent.total || 1;
      const pct = Math.min(100, Math.round((progressEvent.loaded / total) * 100));
      setLoadingProgress(pct);
    }
  };

  const goToPrev = () => setPageNumber((n) => Math.max(1, n - 1));
  const goToNext = () => setPageNumber((n) => Math.min(numPages || n + 1, n + 1));

  const zoomIn = () => setScale((s) => Math.min(4, +(s + 0.25).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.25, +(s - 0.25).toFixed(2)));

  useEffect(() => {
    if (fitToWidth && containerRef.current) {
      const width = containerRef.current.clientWidth;
      // let Page use `width` prop instead of scale
      // store width in state by setting scale to 0 as sentinel (we'll pass width directly)
      // but keep scale for zooming when not fitting
    }
  }, [fitToWidth]);

  const retry = () => {
    setError(null);
    setLoadingProgress(null);
    setDocKey((k) => k + 1);
  };

  // compute width for fit-to-width behavior
  const pageWidth = fitToWidth && containerRef.current ? containerRef.current.clientWidth : undefined;

  return (
    <div className="document-viewer" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="viewer-toolbar" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 13, color: "#333" }}>{localFileName || (typeof effectiveFile === "string" ? effectiveFile.split("/").pop() : "document")}</div>
          <label style={{ display: "inline-block" }}>
            <button type="button">Choose file</button>
            <input type="file" accept="application/pdf" onChange={handleFilePick} style={{ display: "none" }} />
          </label>
        </div>

        <button onClick={goToPrev} disabled={pageNumber <= 1} aria-label="Previous page">◀</button>
        <div>
          <label style={{ marginRight: 6 }}>Page</label>
          <input
            type="number"
            min={1}
            value={pageNumber}
            onChange={(e) => setPageNumber(Math.max(1, Math.min(numPages || 1, Number(e.target.value) || 1)))}
            style={{ width: 64 }}
          />
          <span style={{ marginLeft: 8 }}>{`of ${numPages || "—"}`}</span>
        </div>

        <button onClick={goToNext} disabled={pageNumber >= numPages} aria-label="Next page">▶</button>

        <div style={{ width: 1, height: 24, background: "#e0e0e0", margin: "0 8px" }} />

        <button onClick={zoomOut} aria-label="Zoom out">−</button>
        <span style={{ width: 56, textAlign: "center" }}>{Math.round(scale * 100)}%</span>
        <button onClick={zoomIn} aria-label="Zoom in">+</button>

        <label style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={fitToWidth}
            onChange={() => setFitToWidth((v) => !v)}
          />
          Fit to width
        </label>

        <div style={{ marginLeft: "auto" }}>
          {loadingProgress != null && (
            <span>Loading: {loadingProgress}%</span>
          )}
          {error && (
            <span style={{ color: "crimson", marginLeft: 8 }}>Error: {error}</span>
          )}
        </div>
      </div>

      <div ref={containerRef} style={{ flex: 1, overflow: "auto", position: "relative" }}>
        {loadingProgress != null && (
          <div style={{ position: "absolute", left: 12, top: 12, zIndex: 10, background: "rgba(255,255,255,0.9)", padding: 6, borderRadius: 4 }}>
            {loadingProgress < 100 ? `Loading ${loadingProgress}%` : "Processing..."}
          </div>
        )}

        {error ? (
          <div style={{ padding: 24 }}>
            <div style={{ color: "crimson", marginBottom: 12 }}>Failed to load document.</div>
            <div style={{ marginBottom: 12 }}>{error}</div>
            <button onClick={retry}>Retry</button>
          </div>
        ) : (
          <Document
            key={docKey}
            file={effectiveFile}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            onLoadProgress={handleProgress}
            loading={<div style={{ padding: 24 }}>Loading PDF…</div>}
            error={<div style={{ padding: 24, color: "crimson" }}>Unable to render PDF.</div>}
          >
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              scale={fitToWidth ? undefined : scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        )}
      </div>
    </div>
  );
}