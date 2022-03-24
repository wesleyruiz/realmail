import { useAppSelector } from '@demo/hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '@demo/hooks/useLoading';
import Frame from '@demo/components/Frame';
import templateList from '@demo/store/templateList';
import { Button, Empty, Space, Typography } from '@arco-design/web-react';
import { CardItem } from './components/CardItem';
import { Stack } from '@demo/components/Stack';
import { Loading } from '@demo/components/loading';
import { history } from '@demo/utils/history';
import { pushEvent } from '@demo/utils/pushEvent';
import templates from '@demo/config/templates.json';

export default function Home() {
  const dispatch = useDispatch();
  const list = useAppSelector('templateList');
  const loading = useLoading(templateList.loadings.fetch);

  useEffect(() => {
    dispatch(templateList.actions.fetch(undefined));
  }, [dispatch]);

  return (
    <Frame
      title='Templates'
      primaryAction={
        <Button
          type='primary'
          onClick={() => {
            pushEvent({ name: 'Create' });
            history.push('/editor');
          }}
        >
          Add
        </Button>
      }
    >
      <>

        <div>
          <Typography.Title heading={3}>
            User template
          </Typography.Title>
          {
            <Loading loading={loading}>
              <Stack>
                {list.map((item) => (
                  <CardItem data={item} key={item.article_id} />
                ))}
              </Stack>
              {
                list.length === 0 && (
                  <div>
                    <Empty description={
                      <Space direction='vertical' size='large'>
                        <Typography.Text style={{ fontSize: 20 }}>No data</Typography.Text>
                        <Button
                          type='primary'
                          onClick={() => {
                            pushEvent({ name: 'Create' });
                            history.push('/editor');
                          }}
                        >
                          Edit your first email
                        </Button>
                      </Space>
                    } />
                  </div>
                )
              }
            </Loading>
          }

        </div>
        <div>
          <Typography.Title heading={3}>
            Default template
          </Typography.Title>
          <Stack>
            {templates.map((item) => (
              <CardItem data={item} key={item.article_id} />
            ))}
          </Stack>

        </div>


      </>
    </Frame>
  );
}
