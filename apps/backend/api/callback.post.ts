import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { id, status, result } = await readBody(event);

  const { code_coverage, fuzzing_task_count, total_bugs_found, bugs_found } = result[0];
  const { bitmap_cvg } =  code_coverage;

  // 先删除该项目已有的 bugs
  await prisma.bug.deleteMany({
    where: {
      projectId: id,
    },
  });

  if (bugs_found) {
    await Promise.all(
      bugs_found.map((bug: Record<string, any>) =>
        prisma.bug.create({
          data: {
            name: bug.bug_id,
            type: bug.bug_type,
            risk: bug.risk_level,
            desc: bug.bug_description,
            firstTime: bug.first_discovery_time,
            total: bug.total_discovery_count,
            codeText: bug.risk_code_display_file,
            report: bug.asan_report_file,
            crash: bug.crash_file_path,
            projectId: id,
          },
        })
      )
    );
  }

  const project = await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      status,
      result,
      coverage: bitmap_cvg,
      taskCount: fuzzing_task_count,
      bugs: total_bugs_found
    },
  });


  return useResponseSuccess(project);
});
