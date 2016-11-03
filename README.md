# His RAFT / Interfaith Food Bank
A single page website that I designed for a local nonprofit.

## Build Instructions

**Build Dependencies:** [Node.js/NPM](https://nodejs.org/) and [Grunt](http://gruntjs.com/)
- Project requires the [Bootstrap repo](https://github.com/twbs/bootstrap) installed at the top-level.
- Make sure this project's `bootstrap/scss/_custom.scss` is current and not being overwritten by Bootstrap's repo.
- Production files are stored in the `dist` directory.
- Default `grunt` command will build current project and launch `grunt watch` to jump straight into coding

```
npm install
git clone git@github.com:twbs/bootstrap.git bootstrap
git checkout -- bootstrap/scss/_custom.scss
grunt build
```