import { html } from 'js-beautify';
import { unescape } from 'he';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlockManager } from '@core/utils';
import { JsonToMjmlOption } from './isProductionMode';
import React, { useContext } from 'react';
import { IBlockData } from '@core/typings';

type EmailRenderProps = {
  mode: 'production' | 'testing';
  context?: IBlockData;
  dataSource?: Record<string, any>;
  displayMode?: 'desktop-mobile' | 'only-desktop' | 'only-mobile';
};

const EmailRenderContext = React.createContext<EmailRenderProps>({} as any);

export const EmailRenderProvider: React.FC<EmailRenderProps> = props => {
  return (
    <EmailRenderContext.Provider value={props}>
      {props.children}
    </EmailRenderContext.Provider>
  );
};

export function JsonToMjml(options: JsonToMjmlOption): string {
  console.time('JsonToMjml');
  const { data, beautify } = options;
  const block = BlockManager.getBlockByType(data.type);
  if (!block) {
    throw new Error(`Block ${data.type} not found`);
  }
  const mjmlString = unescape(
    renderToStaticMarkup(
      <EmailRenderProvider
        dataSource={options.dataSource}
        mode={options.mode}
        context={options.context}
        displayMode={'desktop-mobile'}
      >
        {block.render(options)}
      </EmailRenderProvider>,
    ),
  );
  if (beautify) {
    return html(mjmlString, { indent_size: 2 });
  }
  console.timeEnd('JsonToMjml');
  return mjmlString;
}

export const useEmailRenderContext = () => {
  return useContext(EmailRenderContext);
};
