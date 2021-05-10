#!/usr/bin/env node

import { ArgumentParser } from 'argparse';
import { getGitVersionFromTag, updateVersion } from '../lib/gitv';

(async () => {
  const args = getArgs();
  try {
    const version = args.force_version ?? (await getGitVersionFromTag());
    updateVersion(args.file, version);
    console.log(`✔ Update version of '${args.file}' to ${version}`);
  } catch (err) {
    console.error('❌', err);
    process.exit(1);
  }
})();

interface Args {
  file: string;
  force_version: string;
}

function getArgs(): Args {
  const parser = new ArgumentParser({
    description:
      'Get current package version from git tags and set them to package.json.',
  });

  parser.add_argument('-f', '--file', {
    help: 'Location of the package.json file.',
    default: 'package.json',
    type: String,
  });

  parser.add_argument('--force-version', {
    help: 'Force version overwrite',
    type: String,
  });

  return parser.parse_args();
}

// getGitVersionFromTag().then((version) => {
//   updateVersion('package-test.json', version).then(() => console.log('ok'));
// });
