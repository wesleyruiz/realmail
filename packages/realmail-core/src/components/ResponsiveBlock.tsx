import React from 'react';
import { Raw } from './Raw';

import { EmailRenderProvider } from '@core/utils/JsonToMjml';
import { IPage } from '@core/blocks';

export interface ResponsiveBlockProps {
  desktop: React.FC;
  mobile: React.FC;
  mode: 'testing' | 'production';
  dataSource?: { [key: string]: any };
  context?: IPage;
}

export function ResponsiveBlock(props: ResponsiveBlockProps) {
  const { desktop: Desktop, mobile: Mobile } = props;

  return (
    <>
      {/* only visible in desktop */}
      <EmailRenderProvider {...props} displayMode={'only-desktop'}>
        <>
          <Desktop />
        </>
      </EmailRenderProvider>

      {/* only visible in mobile */}
      <Raw>{`<!-- htmlmin:ignore --><!--[if !mso]><!--><!-- htmlmin:ignore -->`}</Raw>
      <EmailRenderProvider {...props} displayMode={'only-mobile'}>
        <>
          <Mobile />
        </>
      </EmailRenderProvider>
      <Raw>{`<!-- htmlmin:ignore --><!--<![endif]--><!-- htmlmin:ignore -->`}</Raw>
    </>
  );
}
