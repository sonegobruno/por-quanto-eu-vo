import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';

interface Props {
  children: ReactNode;
}

const AppHooksProvider: React.FC<Props> = React.memo(({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
});

export default AppHooksProvider;
