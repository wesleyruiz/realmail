/* eslint-disable @typescript-eslint/no-unsafe-call */
import { RICH_TEXT_TOOL_BAR } from '@extensions/constants';
import { getShadowRoot, useLazyState } from 'realmail-editor';
import React, { useEffect, useMemo, useState } from 'react';

export const SelectionRangeContext = React.createContext<{
  selectionRange: Range | null;
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>;
}>({
  selectionRange: null,
  setSelectionRange: () => { },
});

export const SelectionRangeProvider: React.FC<{}> = (props) => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const iframeDoc = getShadowRoot();

  useEffect(() => {

    const onSelectionChange = () => {
      try {
        const range = iframeDoc.getSelection()?.getRangeAt(0);
        if (range) {
          const toolbar = iframeDoc.getElementById(RICH_TEXT_TOOL_BAR);
          if (toolbar && toolbar.contains(range.commonAncestorContainer))
            return;
          setSelectionRange(range);
        }
      } catch (error) { }
    };

    iframeDoc.addEventListener('selectionchange', onSelectionChange);

    return () => {
      iframeDoc.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [iframeDoc]);

  const value = useMemo(() => {
    return {
      selectionRange,
      setSelectionRange,
    };
  }, [selectionRange]);

  return useMemo(() => {
    return (
      <SelectionRangeContext.Provider value={value}>
        {props.children}
      </SelectionRangeContext.Provider>
    );
  }, [props.children, value]);
};