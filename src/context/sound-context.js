import { createContext, useContext } from 'react';

// { enabled: boolean, toggle: () => void, play: (type) => void }
export const SoundContext = createContext({
  enabled: true,
  toggle: () => {},
  play: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}
