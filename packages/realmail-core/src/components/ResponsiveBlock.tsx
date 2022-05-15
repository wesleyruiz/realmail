import React from 'react';
import { Template } from './Template';
import { Raw } from './Raw';
import { IBlockData } from '@core/typings';
import { AdvancedType, HIDE_DESKTOP_BLOCK_CLASS_NAME, HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME, HIDE_MOBILE_BLOCK_CLASS_NAME, HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME } from '@core/constants';
import { AdvancedBlock } from '@core/blocks/advanced/generateAdvancedBlock';
import { classnames } from '@core/utils/classnames';

export interface ResponsiveBlockProps {
  desktop: React.ReactElement
  | Array<React.ReactElement | IBlockData>
  | IBlockData;
  mobile: React.ReactElement
  | Array<React.ReactElement | IBlockData>
  | IBlockData;
  blockData: AdvancedBlock;
  mode: 'testing' | 'production';
}

const inlineBlockTypes = ([AdvancedType.GROUP, AdvancedType.COLUMN] as string[]);

export function ResponsiveBlock(props: ResponsiveBlockProps) {
  const { blockData, mode } = props;
  const display = inlineBlockTypes.includes(blockData.type) ? 'inline-block' : 'block';
  const desktopClassName: string = blockData.attributes['css-class'] || '';
  const mobileClassName: string = blockData.mobileAttributes['css-class'] || '';

  const hideDesktopClassName = display === 'block' ? HIDE_DESKTOP_BLOCK_CLASS_NAME : HIDE_DESKTOP_INLINE_BLOCK_CLASS_NAME;

  const hideMobileClassName = display === 'block' ? HIDE_MOBILE_BLOCK_CLASS_NAME : HIDE_MOBILE_INLINE_BLOCK_CLASS_NAME;

  if (mode === 'testing') {

    return (
      <Template>
        {/* only visible in desktop */}
        <Template className={classnames(hideMobileClassName, 'desktop-responsive-preview')}>
          {props.desktop}
        </Template>
        {/* only visible in mobile */}
        <Template className={classnames(hideDesktopClassName, 'mobile-responsive-preview')}>
          <Raw>
            {`
                <!-- htmlmin:ignore -->
                  <!--[if !mso]><!-->
                <!-- htmlmin:ignore -->
                `}
          </Raw>
          {props.mobile as any}
          <Raw>
            {`
                <!-- htmlmin:ignore -->
               	  <!--<![endif]-->
                <!-- htmlmin:ignore -->
                `}
          </Raw>
        </Template>
      </Template>
    );
  }

  return (
    <Template>
      {/* only visible in desktop */}
      {
        desktopClassName.includes(hideDesktopClassName)
          ? null
          : (
            <Template className={hideMobileClassName}>
              {props.desktop}
            </Template>
          )}

      {/* only visible in mobile */}
      {mobileClassName.includes(hideMobileClassName)
        ? null
        : (
          <Template className={hideDesktopClassName}>
            <Raw>
              {`
                <!-- htmlmin:ignore -->
                  <!--[if !mso]><!-->
                <!-- htmlmin:ignore -->
                `}
            </Raw>
            {props.mobile as any}
            <Raw>
              {`
                <!-- htmlmin:ignore -->
               	  <!--<![endif]-->
                <!-- htmlmin:ignore -->
                `}
            </Raw>
          </Template>
        )}

    </Template>
  );
}