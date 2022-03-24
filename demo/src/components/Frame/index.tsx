import React, { useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Space, Typography, Popover } from '@arco-design/web-react';
import { Stack } from '../Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { githubButtonGenerate } from '@demo/utils/githubButtonGenerate';
import { UserStorage } from '@demo/utils/user-storage';
import { IUser } from '@demo/services/user';
import { IconExport } from '@arco-design/web-react/icon';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface FrameProps {
  title: string;
  breadcrumb?: React.ReactElement;
  primaryAction?: React.ReactElement;
  children: React.ReactElement;
}

export default function Frame({
  children,
  title,
  primaryAction,
  breadcrumb,
}: FrameProps) {

  const [user, setUser] = React.useState<IUser | null>(null);

  useEffect(() => {
    githubButtonGenerate();
    UserStorage.getAccount().then(setUser);
  }, []);

  const onLogout = () => {
    UserStorage.logout();
  };

  if (!user) return null;

  return (
    <Layout>
      <Header style={{ padding: '0 20px', backgroundColor: '#001529' }}>
        <Stack distribution='equalSpacing' alignment='center'>
          <h1 style={{ color: 'white', margin: '15px 0' }}>realmail</h1>

          <div style={{ marginTop: 10 }}>
            <Stack alignment='center'>
              <a
                className='github-button'
                href='https://github.com/arco-design/realmail'
                data-size='large'
                data-icon='octicon-star'
                data-show-count='true'
                aria-label='Star m-Ryan/realmail on GitHub'
                onClick={() => pushEvent({ name: 'Star' })}
                style={{ opacity: 0 }}
              >
                Star
              </a>

              <a
                className='github-button'
                href='https://github.com/arco-design/realmail/fork'
                data-size='large'
                data-show-count='true'
                aria-label='Fork m-Ryan/realmail on GitHub'
                onClick={() => pushEvent({ name: 'Fork' })}
                style={{ opacity: 0 }}
              >
                Fork
              </a>

              <a
                className='github-button'
                href='https://github.com/arco-design/realmail/issues'
                data-size='large'
                data-show-count='true'
                aria-label='Issue m-Ryan/realmail on GitHub'
                onClick={() => pushEvent({ name: 'Issue' })}
                style={{ opacity: 0 }}
              >
                Issue
              </a>
              <Popover
                style={{ padding: 0 }}
                trigger='click'
                content={
                  <Menu style={{ margin: '-12px -16px', textAlign: 'center', width: 120 }}>
                    <Menu.Item key='Logout' onClick={onLogout}><IconExport />Logout</Menu.Item>
                  </Menu>
                }
              >
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar size={30} style={{ backgroundColor: '#14a9f8' }}>{user.nickname.slice(0, 1)}</Avatar>
                  <Stack vertical spacing='none'>
                    <Typography.Text style={{ color: '#ffffff' }}>{user.nickname}</Typography.Text>
                    {/* <Typography.Text style={{ color: '#ffffff' }}>{user.email}</Typography.Text> */}
                  </Stack>
                </Space>
              </Popover>

            </Stack>
          </div>
        </Stack>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key='sub1' title='Templates'>
              <Menu.Item key='1'>Templates</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Stack vertical>
            {breadcrumb && (
              <Breadcrumb>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
            )}

            <Stack distribution='equalSpacing' alignment='center'>
              <Stack.Item>
                <h2>
                  <strong>{title}</strong>
                </h2>
              </Stack.Item>
              <Stack.Item>{primaryAction}</Stack.Item>
            </Stack>

            <Stack.Item>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  backgroundColor: '#fff',
                }}
              >
                {children}
              </Content>
            </Stack.Item>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  );
}
