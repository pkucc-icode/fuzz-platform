import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import prisma from '~/lib/prisma';

import { exec, spawn } from 'child_process';
import fs from 'fs/promises';
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

  const data = {
    "program_name": project.name,
    "url": project.repoUrl,
    "source_code_path": "",
    "afl_fuzz_args": {
      "task_id": 1,
      "Default_compiler": {
        "default": project.param.compiler,
        "compile_setting": "cmake",
      },
      "fuzzer": project.param.fuzz,
      "fuzz_time": "10s",
      "fuzz_target": [
        "pdftotext",
        "pdftohtml"
      ],
      "CC_module": "",
      "CXX_module": ""
    }
  };

  const jsonString = JSON.stringify(data, null, 4); // 第三个参数4用于格式化输出
  await writeFile(project.id, jsonString);

  execPromise(`bash run.sh ${project.id}> sh/run-${id}.log 2>&1 &`);

  return useResponseSuccess(project);
});



async function writeFile(id: number, jsonString: string) {
  try {
      await fs.writeFile(`sh/config-${id}.json`, jsonString);
      console.log('File written successfully');
  } catch (err) {
      console.error('Error writing file:', err);
  }
}