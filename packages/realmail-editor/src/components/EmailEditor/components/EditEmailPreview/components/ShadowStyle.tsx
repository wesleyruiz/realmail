import React from 'react';
import iconfontText from '@/assets/font/iconfont.css?inline';
import styles from '@/styles/block-shadowDom-interactive.scss?inline';
import { useEditorProps } from '@/hooks/useEditorProps';

export function ShadowStyle() {
  const style = getComputedStyle(document.body);

  const {
    interactiveStyle: {
      hoverColor = `rgb(${style.getPropertyValue('--primary-4') || '24,144,255'})`,
      selectedColor = `rgb(${style.getPropertyValue('--primary-6') || '24,144,255'})`,
      errorColor = 'transparent',
    } = {},
  } = useEditorProps();

  return (
    <>
      <style>{iconfontText}</style>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              --hover-color: ${hoverColor};
              --selected-color: ${selectedColor};
              --error-color: ${errorColor};
            }

            :host(*){
              all: initial;
            }

            html {
              overflow: overlay !important;
            }

            ${styles}

            `,
        }}
      />
    </>
  );
}
