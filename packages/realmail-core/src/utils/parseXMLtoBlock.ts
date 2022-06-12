import mjml from 'mjml';
import { IBlockData } from '@core/typings';
import { BlockType, BasicType } from './../constants';
import { MjmlToJson } from './MjmlToJson';

const domParser = new DOMParser();
export function parseXMLtoBlock(text: string) {
  const dom = domParser.parseFromString(text, 'text/html');
  const root = dom.body.firstChild as Element;

  if (!(dom.firstChild instanceof Element)) {
    throw new Error('Invalid content');
  }
  if (root.tagName === 'mjml') {
    const { json } = mjml(text, {
      validationLevel: 'soft',
    });
    const parseValue = MjmlToJson(json);
    return parseValue;
  }

  const transform = (node: Element): IBlockData => {
    if (node.tagName === 'parsererror') {
      throw new Error('Invalid content');
    }
    const attributes: IBlockData['attributes'] = {};
    node.getAttributeNames().forEach((name) => {
      attributes[name] = node.getAttribute(name);
    });
    const type = node.tagName.toLowerCase().replace('mj-', '');

    const block: IBlockData = {
      type: type as BlockType,
      attributes: attributes,
      data: {
        value: {
          content: node.innerHTML?.trim(),
        },
      },
      children: [],
    };
    if (([BasicType.TEXT, BasicType.BUTTON] as string[]).includes(type)) {
      block.data.value.content = node.innerHTML;
      block.children = [];
    } else {
      block.children = [...node.children]
        .filter((item) => item instanceof Element)
        .map(transform as any);
    }
    return block;
  };

  return transform(root);

}

