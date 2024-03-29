## Commit Naming Convention

As for the commit naming convention, _semantic commits_ will be the choice

#### General structure

commit-type[scope]: description

#### Commit types

**feat:** A new feature for the user.

**fix:** Fixes a bug affecting the user.

**perf:** Changes that improve site performance.

**build:** Changes in the build system, deployment tasks, or installation.

**docs:** Changes in the documentation.

**refactor:** Code refactoring such as variable or function name changes.

**style:** Format changes, indentations, spaces, or semicolons, etc.; do not affect the user.

**test:** Adds tests or refactors an existing one.

**deps** Adds a dependency to the project.

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
