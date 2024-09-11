import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');

  const project = await prisma.project.findUnique({
    where: {
        id:Number(id)
    }
  })

  const { result } = project;

  return useResponseSuccess(result);
});
