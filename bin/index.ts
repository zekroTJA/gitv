#!/usr/bin/env node

import { getGitVersionFromTag, updateVersion } from '../lib/gitp';

getGitVersionFromTag().then((version) => {
  updateVersion('package-test.json', version).then(() => console.log('ok'));
});
