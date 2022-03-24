
import services from '@demo/services';
import { Tag } from '@demo/services/tag';
import createSliceState from './common/createSliceState';

export default createSliceState({
  name: 'tagList',
  initialState: [] as Tag[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async (state) => {

      const data = await services.Tag.getList({ page: 1, size: 999 });
      return data.list;
    },
  },
});
