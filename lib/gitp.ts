import { exec } from 'child_process';
import { readFile, writeFile } from 'fs';

export function getGitVersionFromTag(): Promise<string> {
  return wrapExec('git describe --tags --abbrev=0');
}

export async function updateVersion(
  file: string,
  version: string
): Promise<{}> {
  const data = await readAndParseFile(file);
  data.version = version;
  await stringifyAndWriteFile(file, data);
  return {};
}

function wrapExec(command: string): Promise<string> {
  return new Promise((resolve, rejects) => {
    exec(command, (err: Error | null, stdout: string, stderr: string) => {
      if (!!err) rejects(err);
      else if (!!stderr) rejects(new Error(stderr.trim()));
      else resolve(stdout.trim());
    });
  });
}

function readAndParseFile(file: string): Promise<any> {
  return new Promise((resolve, rejects) => {
    readFile(file, (err: Error | null, data: Buffer) => {
      if (!!err) rejects(err);
      else resolve(JSON.parse(data.toString()));
    });
  });
}

function stringifyAndWriteFile(file: string, content: object): Promise<{}> {
  return new Promise((resolve, rejects) => {
    const data = JSON.stringify(content, null, 2);
    writeFile(file, data, null, () => {
      resolve({});
    });
  });
}
