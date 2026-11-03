import { createContext, useContext } from 'react';

// { show: (message: string) => void }
export const ToastContext = createContext({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}
