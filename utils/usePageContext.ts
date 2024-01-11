import { createCtx } from './createContex';

type PageContextType = {
  selectedCitation: string | null;
  setSelectedCitation: (data: string) => void;
  generatingAnswer: boolean;
  setGeneratingAnswer: (data: boolean) => void;
  chatMode: boolean;
  setChatMode: (data: boolean) => void;
};

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [usePageContext, PageContextProvider] = createCtx<PageContextType>(
  'Attempted to call usePageContext outside of PageContextProvider'
);
