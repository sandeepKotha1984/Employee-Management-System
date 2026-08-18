import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModuleRegistry } from "ag-grid-community";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { InfiniteRowModelModule } from "ag-grid-community";
import './styles/globals.css';

ModuleRegistry.registerModules([
  InfiniteRowModelModule,
]);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
