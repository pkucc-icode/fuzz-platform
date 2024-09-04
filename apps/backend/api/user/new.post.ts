import prisma from "~/lib/prisma";

export default eventHandler(async (event) => {
  const { password, name, email } = await readBody(event);
  const user = await prisma.user.create({
    data: {
      name,
      password,
      email
    },
  })
  return useResponseSuccess(user);
});
