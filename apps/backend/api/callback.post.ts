import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);

  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });

  return useResponseSuccess(project);
});
