import React from 'react';
import AppRouter from './app/routes/AppRouter';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <div>
      <ErrorBoundary>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('An error occurred:', error.message);
      setHasError(true);
    };
  }
  );
  return (
    <React.Fragment>
      {hasError ? (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
}
