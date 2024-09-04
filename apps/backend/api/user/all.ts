import prisma from "~/lib/prisma";

export default eventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return useResponseSuccess(users);
});
