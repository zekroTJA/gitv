# gitv

CI/CD utility to get a version from git *(`git describe --tags --abbrev=0`)* and put it into the `package.json`.

## How to use

Just put the following step in your pipeline:
```
npx gitv
```

You can also specify another location for your `package.json`.
```
npx gitv -f somewhere/else/package.json
```

Also, if you really want, you can bypass git for version resolution and specify a custom one.
```
npx gitv --force-version 1.1.0
```

You can also get more info using the help. 😉
```
npx gitv --help
```

---

© 2021 Ringo Hoffmann (zekro Development).  
Covered by the MIT License.
