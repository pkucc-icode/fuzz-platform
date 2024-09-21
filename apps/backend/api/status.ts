import { readFileContent } from '~/utils/fuzz';

export default eventHandler(async (event) => {
  const { status, name } = getQuery(event);
  setResponseStatus(event, Number(status));
  if (name) {
    const content = await readFileContent(name);
    return useResponseSuccess(content);
  }
  return useResponseError(`${status}`);
});
