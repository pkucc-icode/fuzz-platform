import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';
import { spawnPromise } from '~/utils/fuzz';
import prisma from '~/lib/prisma';
import fs from 'fs/promises';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const {
    id,
    name,
    repoUrl,
    compiler,
    compilerSettings,
    fuzz,
    fuzzTime,
    fuzzTarget,
    fuzzCommands,
  } = await readBody(event);

  console.log(id);

  if (id) {
    const project = await prisma.project.update({
      where: {
        id
      },
      data: {
        type: 'openFuzz',
        name,
        repoUrl,
        param: {
          repoUrl,
          compiler: compiler || 'llvm-clang',
          compilerSettings: compilerSettings || 'cmake',
          fuzz: fuzz || 'AFL++',
          fuzzTime: fuzzTime || '1day',
          fuzzTarget: fuzzTarget || [],
          fuzzCommands: fuzzCommands || [],
        },
      },
    });

    return useResponseSuccess(project);

  } else {
    const project = await prisma.project.create({
      data: {
        type: 'openFuzz',
        name,
        repoUrl,
        param: {
          repoUrl,
          compiler: compiler || 'llvm-clang',
          compilerSettings: compilerSettings || 'cmake',
          fuzz: fuzz || 'AFL++',
          fuzzTime: fuzzTime || '1day',
          fuzzTarget: fuzzTarget || [],
          fuzzCommands: fuzzCommands || [],
        },
      },
    });
  
    const { id } = project;
  
    const data = {
      "program_name": name,
      "url": repoUrl,
      "source_code_path": "",
      "afl_fuzz_args": {
        "task_id": 1,
        "Default_compiler": {
          "default": compiler || 'llvm-clang',
          "compile_setting": compilerSettings || "cmake",
        },
        "fuzzer": fuzz || 'AFL++',
        "fuzz_time": fuzzTime || '60s',
        "fuzz_target": fuzzTarget || [],
        "CC_module": "",
        "CXX_module": ""
      }
    };
  
    const jsonString = JSON.stringify(data, null, 4); // 第三个参数4用于格式化输出
    await writeFile(project.id, jsonString);
  
    // execPromise(`bash run.sh ${project.id}> sh/run-${id}.log 2>&1`);
    spawnPromise('bash', ['run.sh', id], id)
      .then((output: string) => {
        console.log('run.sh执行成功');
      })
      .catch((error: Error) => {
        console.error('命令执行失败:', error);
      });

      return useResponseSuccess(project);
  }
  
});



async function writeFile(id: number, jsonString: string) {
  try {
      await fs.writeFile(`sh/config-${id}.json`, jsonString);
      console.log('File written successfully');
  } catch (err) {
      console.error('Error writing file:', err);
  }
}