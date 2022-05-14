
import { useMemo } from 'react';
import {
  ActiveTabKeys,
  Tooltip, useActiveTab,
} from 'realmail-editor';
import React from 'react';
import { Button, Drawer, Space } from '@arco-design/web-react';
import { IconEye } from '@arco-design/web-react/icon';
import { TabHeader } from '../TabHeader';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { MobilePreview } from './components/MobilePreview';

export function PreviewEmail() {
  const [visible, setVisible] = React.useState(false);
  const { activeTab } = useActiveTab();

  const onToggleVisible = () => {
    setVisible((v) => !v);
  };

  return useMemo(() => {
    return (
      <Space>
        <Tooltip position="top" content={'Preview'}>
          <IconEye onClick={onToggleVisible} />
        </Tooltip>
        <Drawer
          bodyStyle={{ padding: 0, overflow: 'hidden' }}
          headerStyle={{
            height: '65px',
            padding: 0
          }}
          width="100vw"
          height="100vh"
          title={(
            <div style={{ width: '100vw', }}>
              <TabHeader
                left={(
                  <Space size="large">
                    <div />
                    <span>Preview Mode</span>
                  </Space>
                )}
                right={(
                  <Space size="large">
                    <Button type="primary" onClick={onToggleVisible}>
                      Done
                    </Button>
                    <div />

                  </Space>
                )}
              />
            </div>
          )}
          visible={visible}
          placement="right"
          onCancel={onToggleVisible}
          closable={false}
          footer={null}
        >
          {activeTab === ActiveTabKeys.MOBILE ? <MobilePreview /> : <DesktopEmailPreview />}
        </Drawer>
      </Space>
    );
  }, [activeTab, visible]);
}
