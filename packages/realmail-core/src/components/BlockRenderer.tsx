import {
  AdvancedType,
  BasicType,
  HIDE_DESKTOP_BLOCK_CLASS_NAME,
  HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME,
  HIDE_MOBILE_BLOCK_CLASS_NAME,
  HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME,
} from '@core/constants';
import { IBlock } from '@core/typings';
import { BlockManager } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import { useEmailRenderContext } from '@core/utils/JsonToMjml';
import { get, set } from 'lodash';
import React from 'react';

type BlockDataItem = Omit<
  Parameters<IBlock['render']>[0],
  'mode' | 'context' | 'dataSource'
>;

const inlineBlockTypes = [
  AdvancedType.GROUP,
  AdvancedType.COLUMN,
  BasicType.GROUP,
  BasicType.COLUMN,
] as string[];

export const BlockRenderer = (props: BlockDataItem) => {
  const { data } = props;
  const { mode, context, dataSource, displayMode } = useEmailRenderContext();
  const block = BlockManager.getBlockByType(data.type);
  if (!block) return null;
  const cloneData = {
    ...data,
    attributes: { ...data.attributes },
  };
  const hideDesktopClassName = inlineBlockTypes.includes(block.type)
    ? HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME
    : HIDE_DESKTOP_BLOCK_CLASS_NAME;

  const hideMobileClassName = inlineBlockTypes.includes(block.type)
    ? HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME
    : HIDE_MOBILE_BLOCK_CLASS_NAME;

  const cssClass: string = get(cloneData, 'attributes.css-class') || '';

  if (displayMode === 'only-desktop') {
    if (cssClass.includes(hideDesktopClassName)) {
      return null;
    }
    if (!cssClass.includes(hideMobileClassName)) {
      set(cloneData, 'attributes.css-class', classnames(cssClass, hideMobileClassName));
    }
  } else if (displayMode === 'only-mobile') {
    if (cssClass.includes(hideMobileClassName)) {
      return null;
    }
    if (!cssClass.includes(hideDesktopClassName)) {
      set(cloneData, 'attributes.css-class', classnames(cssClass, hideDesktopClassName));
    }
  }
  return <>{block.render({ ...props, data: cloneData, mode, context, dataSource })}</>;
};

// const BlockEditRenderer = (props: BlockDataItem) => {
//   const [refEle, setRefEle] = useState<HTMLElement | null>(null);
//   const { data, renderPortal, ...rest } = props;
//   const block = BlockManager.getBlockByType(data.type);

//   const onCallbackBlockNode = (node: HTMLElement) => {

//     if (!node) return;
//     if (node instanceof HTMLElement) {
//       if (node.classList.contains(getNodeTypeClassName(data.type))) {
//         setRefEle(node);
//       } else {
//         const ele = node.querySelector(`.${getNodeTypeClassName(data.type)}`) as HTMLElement;
//         setRefEle(ele);
//       }

//     }

//   };

//   if (!block) return null;
//   const reactBlock = block.render(props);
//   if (!reactBlock) return null;
//   return (
//     <>
//       {
//         createElement(reactBlock.type, {
//           ...reactBlock.props,
//           ref: onCallbackBlockNode,
//         })
//       }
//       {
//         refEle && renderPortal && createPortal(<>{renderPortal({ ...rest, data, refEle })}</>, refEle)
//       }
//     </>
//   );
// };
