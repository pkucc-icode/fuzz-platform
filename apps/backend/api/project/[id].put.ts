import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { spawnPromise } from '~/utils/fuzz';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');

  const { name, status, result } = await readBody(event);

  if ('RUNNING' === status) {
    spawnPromise('bash', ['run.sh', id], id)
    .then((output: string) => {
      console.log('run.sh执行成功');
    })
    .catch((error: Error) => {
      console.error('命令执行失败:', error);
    });
  }

  const project = await prisma.project.update({
    where: {
        id,
    },
    data: {
        name,
        status,
        result,
    }
  })

  const { res } = project;

  return useResponseSuccess(res);
});
