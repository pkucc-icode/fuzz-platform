import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

export default eventHandler((event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  
const tableData = [
    {
        id: 1,
        start_time: '2016-05-03',
        name: 'React',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    },
    {
        id: 2,
        start_time: '2016-05-02',
        name: 'Vue',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    },
    {
        id: 3,
        start_time: '2016-05-04',
        name: 'Test build',
        bug_n: 5,
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    }
]

  return useResponseSuccess(tableData);
});
