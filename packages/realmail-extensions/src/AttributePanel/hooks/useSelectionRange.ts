/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useContext } from 'react';
import { SelectionRangeContext } from '@extensions/AttributePanel/components/provider/SelectionRangeProvider';
import { getShadowRoot, useRefState } from 'realmail-editor';

export function useSelectionRange() {
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext
  );
  const doc = getShadowRoot();

  const restoreRange = useCallback((range: Range) => {

    const selection = doc.getSelection();

    if (!selection) return;
    selection.removeAllRanges();
    const newRange = doc.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(range.endContainer, range.endOffset);

    selection.addRange(newRange);
  }, [doc]);

  const setRangeByElement = useCallback(
    (element: ChildNode) => {
      const selection = doc.getSelection();

      if (!selection) return;
      selection.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNode(element);
      setSelectionRange(newRange);
      selection.addRange(newRange);

    },
    [doc, setSelectionRange]
  );

  return {
    selectionRange,
    setSelectionRange,
    restoreRange,
    setRangeByElement,
  };
}
