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

  return (
    <>
      <Grid.Row justify='space-between' align='center' style={{ height: 48 }}>
        <Grid.Col span={4}>
          {props.left}
        </Grid.Col>
        <Grid.Col span={16} style={{ textAlign: 'center' }}>
          <Button.Group>
            <Button style={{ paddingLeft: 50, paddingRight: 50 }} type={!isMobileActive ? 'outline' : 'secondary'} onClick={() => onChangeTab(ActiveTabKeys.PC)}>
              <Space><IconFont iconName="icon-desktop" /> desktop</Space>
            </Button>
            <Button style={{ paddingLeft: 50, paddingRight: 50 }} type={isMobileActive ? 'outline' : 'secondary'} onClick={() => onChangeTab(ActiveTabKeys.MOBILE)}>
              <Space><IconFont iconName="icon-mobile" /> mobile</Space>
            </Button>
          </Button.Group>
        </Grid.Col>
        <Grid.Col span={4} style={{ textAlign: 'right' }}>
          {props.right}
        </Grid.Col>
      </Grid.Row>

    </>
  );
};
