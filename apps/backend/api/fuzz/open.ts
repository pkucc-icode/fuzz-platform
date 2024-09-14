import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import prisma from '~/lib/prisma';

import { exec, spawn } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);


export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const {
    name,
    repoUrl,
    compiler,
    compilerSettings,
    fuzz,
    fuzzTime,
    fuzzTarget,
    fuzzCommands,
  } = await readBody(event);
  const project = await prisma.project.create({
    data: {
      type: 'openFuzz',
      name,
      repoUrl,
      param: {
        repoUrl,
        compiler: compiler || 'llvm-clang',
        compilerSettings,
        fuzz: fuzz || 'AFL++',
        fuzzTime: fuzzTime || '1day',
        fuzzTarget: fuzzTarget || 'all',
        fuzzCommands: fuzzCommands || [],
      },
    },
  });

  const { id } = project;

  execPromise(`bash run.sh > run-${id}.log 2>&1 &`);

  return useResponseSuccess(project);
});
