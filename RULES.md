## Commit Naming Convention
As for the commit naming convention, _semantic commits_ will be the choice

#### General structure 

commit-type[scope]: description

#### Commit types 

__feat:__ A new feature for the user.

__fix:__ Fixes a bug affecting the user.

__perf:__ Changes that improve site performance.

__build:__ Changes in the build system, deployment tasks, or installation.

__docs:__ Changes in the documentation.

__refactor:__ Code refactoring such as variable or function name changes.

__style:__ Format changes, indentations, spaces, or semicolons, etc.; do not affect the user.

__test:__ Adds tests or refactors an existing one.

#### Scopes

The scopes avaliable will be _frontend_, _backend_ and _general_ where general means is something about the codebase that affects both frontend and backend


#### Example

feat(backend): add filter for cars


## Branch Naming Convention:
### Feature Branches:

Format: feature/brief-description

Example: feature/user-management-module


### Bug Fix Branches:

Format: bugfix/brief-description

Example: bugfix/fix-login-validation

### Release Branches:

Format: release/version-number

Example: release/v1.0

### Hotfix Branches:

Format: hotfix/brief-description

Example: hotfix/fix-database-connection
