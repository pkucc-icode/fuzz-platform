import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import prisma from "~/lib/prisma";

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { name, repoUrl, compiler, compilerSettings, fuzz, fuzzTime, fuzzTarget, fuzzCommands } = await readBody(event);
  const project = await prisma.project.create({
    data: {
      type:"openFuzz",
      name
    },
  })

  return useResponseSuccess(project);
});
