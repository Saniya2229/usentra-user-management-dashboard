import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import Users from './pages/Users';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className="bg-slate-950 text-slate-100 min-h-screen">
          <Users />
          <ToastContainer />
        </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}
