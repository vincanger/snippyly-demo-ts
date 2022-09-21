import { createContext, useContext } from 'react';
import { Snippyly } from '@snippyly/sdk';

export const SnippylyContext = createContext<{ client: Snippyly }>({ client: null } as any);

export function useSnippylyClient() {
  return useContext(SnippylyContext);
}
