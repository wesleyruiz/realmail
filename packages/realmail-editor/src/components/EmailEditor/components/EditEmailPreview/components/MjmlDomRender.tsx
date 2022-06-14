import React, { useEffect, useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { getPageIdx, IPage, JsonToMjml } from 'realmail-core';
import { cloneDeep, isEqual } from 'lodash';
import { useEditorContext } from '@/hooks/useEditorContext';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';
import { useEditorProps } from '@/hooks/useEditorProps';
import { getShadowRoot } from '@/utils';
import { DATA_RENDER_COUNT, FIXED_CONTAINER_ID } from '@/constants';
import { useValidationContext } from '@/components/Provider/EmailEditorProvider';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { useRefState } from '@/hooks/useRefState';

let count = 0;
export function MjmlDomRender() {
  const { pageData: content } = useEditorContext();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { dashed, mergeTags, enabledMergeTagsBadge } = useEditorProps();
  const [isTextFocus, setIsTextFocus] = useState(false);
  const { errorBlocksMap } = useValidationContext();
  const { activeTab } = useActiveTab();
  const activeTabRef = useRefState(activeTab);
  const [cacheDesktopNodes, setCacheDesktopNodes] = useState<React.ReactNode>(null);
  const [cacheMobileNodes, setCacheMobileNodes] = useState<React.ReactNode>(null);

  const isTextFocusing =
    getShadowRoot().activeElement?.getAttribute('contenteditable') === 'true';

  useEffect(() => {
    if (!isTextFocus && !isEqual(content, pageData)) {
      setPageData(cloneDeep(content));
    }
  }, [content, pageData, setPageData, isTextFocus]);

  useEffect(() => {
    setIsTextFocus(isTextFocusing);
  }, [isTextFocusing]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (getShadowRoot()?.contains(e.target as Node)) {
        return;
      }

      const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
      if (fixedContainer?.contains(e.target as Node)) {
        return;
      }
      // element has unmount
      if (!document.body.contains(e.target as Node)) {
        return;
      }
      setIsTextFocus(false);
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const root = getShadowRoot();
    if (!root) return;
    const onClick = (e: Event) => {
      const isFocusing =
        getShadowRoot().activeElement?.getAttribute('contenteditable') === 'true';
      if (isFocusing) {
        setIsTextFocus(true);
      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
    };
  }, []);

  const html = useEffect(() => {
    if (!pageData) return;

    const desktopData = pageData;
    const mobileData = {
      ...pageData,
      data: {
        ...pageData.data,
        value: {
          ...pageData.data.value,
          breakpoint: '2000px',
        },
      },
    };

    const renderHtml = (d: IPage) => {
      const html = mjml(
        JsonToMjml({
          data: d,
          idx: getPageIdx(),
          context: d,
          mode: 'testing',
          dataSource: cloneDeep(mergeTags),
        }),
      ).html;
      return HtmlStringToReactNodes(html, {
        enabledMergeTagsBadge: Boolean(enabledMergeTagsBadge),
      });
    };

    if (activeTabRef.current === ActiveTabKeys.MOBILE) {
      setCacheMobileNodes(renderHtml(mobileData));
      setTimeout(() => {
        setCacheMobileNodes(renderHtml(desktopData));
      }, 10);
    } else {
      setCacheDesktopNodes(renderHtml(desktopData));
      setTimeout(() => {
        setCacheMobileNodes(renderHtml(mobileData));
      }, 10);
    }
  }, [activeTabRef, enabledMergeTagsBadge, mergeTags, pageData]);

  const displayNodes = useMemo(() => {
    return activeTab === ActiveTabKeys.MOBILE ? cacheMobileNodes : cacheDesktopNodes;
  }, [activeTab, cacheDesktopNodes, cacheMobileNodes]);

  return useMemo(() => {
    return (
      <div
        {...{
          [DATA_RENDER_COUNT]: count++,
        }}
        data-dashed={dashed}
        ref={setRef}
        style={{
          outline: 'none',
          position: 'relative',
        }}
        role="tabpanel"
        tabIndex={0}
      >
        {ref && createPortal(displayNodes, ref)}
        <style>
          {Object.keys(errorBlocksMap)
            .map(idx => {
              return `
                [data-idx="${idx}"] {
                  outline: 2px solid var(--error-color);
                }
            `;
            })
            .join('\n')}
        </style>
      </div>
    );
  }, [dashed, ref, displayNodes, errorBlocksMap]);
}
