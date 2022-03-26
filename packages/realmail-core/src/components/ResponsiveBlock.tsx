import React from 'react';
import { Template } from './Template';
import { Raw } from './Raw';
import { IBlockData } from '@core/typings';

export interface ResponsiveBlockProps {
  desktop: React.ReactElement
  | Array<React.ReactElement | IBlockData>
  | IBlockData;
  mobile: React.ReactElement
  | Array<React.ReactElement | IBlockData>
  | IBlockData;
  display?: 'block' | 'inline-block';

}
export function ResponsiveBlock(props: ResponsiveBlockProps) {
  const { display = 'block' } = props;
  return (
    <Template>
      {/* only visible in desktop */}
      <Template className={display === 'block' ? 'hide-mobile-block' : 'hide-mobile-inline-block'}>
        <Raw>
          {'<!--[if !mso]><!-->'}
        </Raw>
        {props.desktop as any}
        <Raw>
          {' <!--<![endif]-->'}
        </Raw>
      </Template>

      {/* only visible in mobile */}
      <Template className={display === 'block' ? 'hide-desktop-block' : 'hide-desktop-inline-block'}>
        {props.mobile}
      </Template>

    </Template>
  );
}