import { Grid, PopoverProps, Space, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, isIFrameChildElement, Stack, TextStyle } from 'realmail-editor';
import { SearchField, SwitchField } from '@extensions/components/Form';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'realmail-core';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}
function getAnchorElement(
  node: Node | null,
): HTMLAnchorElement | null {
  if (!node) return null;
  if ((node as any)?.tagName?.toLocaleLowerCase() === 'a') {
    return node as HTMLAnchorElement;
  }
  if ((node as any)?.classList?.contains(EMAIL_BLOCK_CLASS_NAME)) return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.startContainer);
  return linkNode;
}

export function Link(props: LinkProps) {

  const initialValues = useMemo((): LinkParams => {
    let link = '';
    let blank = true;
    let underline = true;
    let linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.getAttribute('href') || '';
      blank = linkNode.getAttribute('target') === '_blank';
      underline = linkNode.style.textDecoration === 'underline';
    }
    return {
      link,
      blank,
      underline,
      linkNode,
    };
  }, [props.currentRange]);

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props]
  );

  return (
    <Form
      key={initialValues.link}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (

          <ToolItem
            isActive={Boolean(initialValues.link)}
            action='click'
            theme='light'
            title={(
              <div style={{ color: '#333', fontSize: 12, padding: 12 }}>
                <Stack vertical spacing='none'>
                  <SearchField
                    size='small'
                    name='link'
                    label=''
                    searchButton='Apply'
                    placeholder='https://www.example.com'
                    onSearch={() => handleSubmit()}
                  />
                </Stack>
                <Grid.Row>
                  <Grid.Col span={12}>
                    <Space align='center' size='mini'>
                      <TextStyle size='smallest'>Target</TextStyle>
                      <SwitchField
                        size='small'
                        name='blank'
                        checkedText='blank'
                        uncheckedText='self'
                        inline
                      />
                    </Space>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Space align='center' size='mini'>
                      <TextStyle size='smallest'>Underline</TextStyle>
                      <SwitchField
                        size='small'
                        name='underline'
                        checkedText='off'
                        uncheckedText='on'
                        inline
                      />
                    </Space>
                  </Grid.Col>
                </Grid.Row>
              </div>
            )}
            icon={<IconFont iconName='icon-link' />}
          />

        );
      }}
    </Form>
  );
}

