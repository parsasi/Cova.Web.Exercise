//In real world to use a library for this

const removeSlashAtTheStart = (path: string) =>
  path.startsWith("/") ? path.slice(1) : path;
const removeSlashAtTheEnd = (path: string) =>
  path.endsWith("/") ? path.slice(0, -1) : path;

export const buildUrl = (...args: string[]) => {
  const copyArgs = [...args];
  if (copyArgs[0]) {
    copyArgs[0] = removeSlashAtTheEnd(copyArgs[0]);
  }
  return copyArgs.reduce((accumulatingUrl: string, currentUrlPart: string) => {
    let noSlashPart = removeSlashAtTheEnd(
      removeSlashAtTheStart(currentUrlPart)
    );
    return accumulatingUrl + "/" + noSlashPart;
  });
};
