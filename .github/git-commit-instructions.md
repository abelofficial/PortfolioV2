## Commit Message Standards

- Always use the **Conventional Commits** format.
- Format: `<type>(<optional scope>): <description>`
- **Types allowed**:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `chore`: Maintenance or tool changes (Husky, CI, linting)
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (formatting)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
- **Rules**:
  - Use lowercase for the type and scope.
  - The subject must not end with a period.
  - Keep the header (first line) under 72 characters.
  - If a commit has multiple changes, use the most prominent type.
