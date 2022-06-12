import { BasicType } from './../../constants';
import { BlockManager } from './../BlockManager';

import { JsonToMjml } from '../JsonToMjml';
const Page = BlockManager.getBlockByType(BasicType.PAGE)!;
const Section = BlockManager.getBlockByType(BasicType.SECTION)!;
const Column = BlockManager.getBlockByType(BasicType.COLUMN)!;
const Text = BlockManager.getBlockByType(BasicType.TEXT)!;
describe('Test JsonToMjml when responsive is "false"', () => {
  const content = Page.create({
    data: {
      value: {
        responsive: false,
      },
    },
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
    beautify: true
  });

  it('should contains the mark of "<meta name="viewport" />"', () => {
    expect(parseHtml).toContain('<meta name="viewport" />');
  });
});

describe('Test JsonToMjml when responsive is "true"', () => {
  const content = Page.create({
    data: {
      value: {
        responsive: true,
      },
    },
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
    beautify: true
  });

  it('should contains the mark of responsive="true"', () => {
    expect(
      parseHtml.includes('attribute-name="responsive" responsive="true"')
    ).toBeTruthy();
  });
});

describe('Test JsonToMjml when mode is "testing"', () => {
  const content = Page.create({
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'testing',
    context: content,
    idx: 'content',
    beautify: true
  });

  it('should contains node-type-page', () => {
    expect(parseHtml).toContain('node-type-page');
  });

  it('should render as expected', () => {
    expect(parseHtml).toMatchSnapshot();
  });
});

describe('Test JsonToMjml when mode is "production"', () => {
  const content = Page.create({
    children: [
      Section.create({
        children: [
          Column.create({
            children: [Text.create({})],
          }),
        ],
      }),
    ],
  });

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
    beautify: true
  });

  it('should not contains node-type-page', () => {
    expect(parseHtml.includes('node-type-page')).toBeFalsy();
  });

  it('should render as expected', () => {
    expect(parseHtml).toMatchSnapshot();
  });
});

describe('Test JsonToMjml when advancedBlock', () => {
  const content = {
    "type": "page",
    "data": {
      "value": {
        "breakpoint": "480px",
        "headAttributes": "",
        "font-size": "14px",
        "font-weight": "400",
        "line-height": "1.7",
        "headStyles": [],
        "fonts": [],
        "responsive": true,
        "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif",
        "text-color": "#000000"
      }
    },
    "attributes": {
      "background-color": "#efeeea",
      "width": "600px"
    },
    "children": [
      {
        "type": "advanced_text",
        "data": {
          "value": {
            "content": "Make it easy for everyone to compose emails!"
          }
        },
        "attributes": {
          "padding": "0px 25px 0px 25px",
          "align": "center"
        },
        "children": []
      }
    ]
  };

  const parseHtml = JsonToMjml({
    data: content,
    mode: 'production',
    context: content,
    beautify: true
  });


  it('should render as expected', () => {
    expect(parseHtml).toMatchSnapshot();
  });
});
