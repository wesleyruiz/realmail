import {
  ActiveTabKeys,
  EventManager,
  EventType,
  IconFont,
  useActiveTab,
} from 'realmail-editor';
import { Button, Grid, Space } from '@arco-design/web-react';
import React, { useCallback } from 'react';

export const TabHeader: React.FC<{ left: React.ReactNode; right: React.ReactNode; }> = (props) => {
  const { setActiveTab, activeTab } = useActiveTab();

  const onChangeTab = useCallback(
    (tab: ActiveTabKeys) => {
      const canChange = EventManager.exec(EventType.ACTIVE_TAB_CHANGE, {
        currentTab:
          tab === ActiveTabKeys.PC
            ? ActiveTabKeys.MOBILE
            : ActiveTabKeys.PC,
        nextTab: tab,
      });
      if (canChange) {
        setActiveTab(tab);
      }
    },
    [setActiveTab]
  );

  const isMobileActive = activeTab === ActiveTabKeys.MOBILE;
  const grid = '2vw';
  return (
    <>
      <div style={{ height: 48, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0 }}>{props.left}</div>
        <div style={{ textAlign: 'center' }}>
          <Button.Group>
            <Button style={{ paddingLeft: grid, paddingRight: grid }} type={!isMobileActive ? 'outline' : 'secondary'} onClick={() => onChangeTab(ActiveTabKeys.PC)}>
              <Space><IconFont iconName="icon-desktop" /> desktop</Space>
            </Button>
            <Button style={{ paddingLeft: grid, paddingRight: grid }} type={isMobileActive ? 'outline' : 'secondary'} onClick={() => onChangeTab(ActiveTabKeys.MOBILE)}>
              <Space><IconFont iconName="icon-mobile" /> mobile</Space>
            </Button>
          </Button.Group>
        </div>
        <div style={{ position: 'absolute', right: 0 }}>{props.right}</div>
      </div>

    </>
  );
};
