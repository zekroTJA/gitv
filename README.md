# gitv

CI/CD utility to get a version from git *(`git describe --tags --abbrev=0`)* and put it into the `package.json`.

## How to use

Just put the following step in your pipeline:

```
npx gitv
```