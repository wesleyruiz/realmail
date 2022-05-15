import { IconFont, ActiveTabKeys, useActiveTab } from 'realmail-editor';
import { Space, Tabs } from '@arco-design/web-react';
import React, { useEffect } from 'react';

export const ResponsiveTabs = ({ desktop, mobile }: { desktop: React.ReactNode; mobile: React.ReactNode; }) => {
  const [mode, setMode] = React.useState('desktop');

  // const { activeTab } = useActiveTab();

  // useEffect(() => {
  //   if (activeTab === ActiveTabKeys.PC) {
  //     setMode('desktop');
  //   } else {
  //     setMode('mobile');
  //   }
  // }, [activeTab]);

  return (
    <Tabs type='card-gutter' activeTab={mode} onChange={setMode}>
      <Tabs.TabPane title={<Space><IconFont iconName='icon-desktop' /><span>Desktop</span></Space>} key="desktop">
        {desktop}
      </Tabs.TabPane>
      <Tabs.TabPane title={<Space><IconFont iconName='icon-mobile' /><span>Mobile</span></Space>} key="mobile">
        {mobile}
      </Tabs.TabPane>
    </Tabs>
  );
};