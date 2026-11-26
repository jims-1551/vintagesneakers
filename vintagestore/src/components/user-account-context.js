import { createContext, useContext } from 'react';

export const UserAccountContext = createContext(null);

export function useUserAccount() {
  const account = useContext(UserAccountContext);

  if (!account) {
    throw new Error('useUserAccount must be used within UserAccountContext.Provider.');
  }

  return account;
}
