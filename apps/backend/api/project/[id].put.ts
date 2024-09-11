import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');

  const { name, status } = await readBody(event);

  const project = await prisma.project.update({
    where: {
        id:Number(id)
    },
    data: {
        name,
        status,
    }
  })

  const { res } = project;

  return useResponseSuccess(res);
});
