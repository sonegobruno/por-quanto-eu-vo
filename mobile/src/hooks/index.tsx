import React from 'react';
import { AuthProvider } from './auth';

const AppHooksProvider: React.FC = React.memo(({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
});

export default AppHooksProvider;
