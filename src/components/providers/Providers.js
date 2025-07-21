import { InertProvider } from './InertProvider';
import { AppProvider } from './AppProvider';

export const Providers = ({ children }) => (
  <InertProvider>
    <AppProvider>{children}</AppProvider>
  </InertProvider>
);
