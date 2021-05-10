import { exec } from 'child_process';

export function getGitVersionFromTag(): Promise<string> {
  return wrapExec('git describe --abbrev 0');
}

function wrapExec(command: string): Promise<string> {
  return new Promise((resolve, rejects) => {
    exec(command, (err, stdout, stderr) => {
      if (!!err) rejects(err);
      else if (!!stderr) rejects(new Error(stderr));
      else resolve(stdout);
    });
  });
}
